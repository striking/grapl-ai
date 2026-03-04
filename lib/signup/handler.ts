import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://spwkdgmnedaqlkzpambv.supabase.co";

// Prefer service role on the server to avoid requiring permissive RLS for public inserts.
// Falls back to anon key if service role is not configured.
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

function safeString(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function normalizeEmail(value: unknown): string | null {
  const email = safeString(value, 320)?.toLowerCase();
  if (!email) return null;
  // Lightweight validation (full RFC compliance is not needed here)
  if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    return null;
  }
  return email;
}

function normalizeSource(value: unknown): string {
  const normalized = safeString(value, 128)?.toLowerCase();
  if (!normalized) return "waitlist";
  return normalized.replace(/[^a-z0-9._:-]/g, "-").slice(0, 128);
}

function isMissingColumnError(errorText: string): boolean {
  return /column .* does not exist/i.test(errorText);
}

async function lookupProductId(
  productSlug: string,
  headers: Record<string, string>
): Promise<number | null> {
  const productRes = await fetch(
    `${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(
      productSlug
    )}&select=id&limit=1`,
    { headers }
  );

  if (!productRes.ok) {
    console.warn("Supabase product lookup failed:", await productRes.text());
    return null;
  }

  const products = (await productRes.json()) as Array<{ id: number }>;
  return products.length > 0 ? products[0].id : null;
}

async function insertLead(
  payload: Record<string, unknown>,
  headers: Record<string, string>
) {
  return fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=minimal",
      // If a unique constraint exists on email, this keeps the UX smooth.
      "Resolution-Prefer": "merge-duplicates",
    },
    body: JSON.stringify(payload),
  });
}

export async function handleSignupCapture(request: Request) {
  if (!SUPABASE_KEY) {
    console.error(
      "Supabase key not configured (SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY)"
    );
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
  }

  const supabaseHeaders = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = normalizeEmail(body?.email);
    const projectSlug = safeString(body?.project ?? body?.product, 64);
    const source = normalizeSource(body?.source);
    const sourceDetail = safeString(body?.sourceDetail, 256);
    const referrer = safeString(body?.referrer, 1024);
    const pageUrl = safeString(body?.pageUrl, 2048);
    const landingPath = safeString(body?.landingPath, 512);
    const utmSource = safeString(body?.utmSource, 128);
    const utmMedium = safeString(body?.utmMedium, 128);
    const utmCampaign = safeString(body?.utmCampaign, 256);

    if (!email) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    let productId: number | null = null;
    if (projectSlug) {
      productId = await lookupProductId(projectSlug, supabaseHeaders);
    }

    const baseLeadPayload: Record<string, unknown> = {
      email,
      product_id: productId,
      source,
      referrer: referrer || pageUrl || null,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
    };

    const enrichedLeadPayload: Record<string, unknown> = {
      ...baseLeadPayload,
      project_slug: projectSlug || null,
      page_url: pageUrl || null,
      landing_path: landingPath || null,
      source_detail: sourceDetail || null,
    };

    let leadRes = await insertLead(enrichedLeadPayload, supabaseHeaders);

    if (!leadRes.ok) {
      const leadInsertError = await leadRes.text();

      if (isMissingColumnError(leadInsertError)) {
        leadRes = await insertLead(baseLeadPayload, supabaseHeaders);
      } else {
        console.error("Supabase insert failed:", leadInsertError);
      }
    }

    if (!leadRes.ok) {
      const errText = await leadRes.text();
      console.error("Supabase insert failed:", errText);

      // Treat “already exists” as success if a unique constraint is enforced.
      if (leadRes.status === 409) {
        return NextResponse.json({ success: true, message: "You're on the list!" });
      }

      return NextResponse.json({ error: "Failed to save" }, { status: 502 });
    }

    return NextResponse.json(
      { success: true, message: "You're on the list!" },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Signup capture error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
