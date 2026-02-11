import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://spwkdgmnedaqlkzpambv.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabaseHeaders = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export async function POST(request: Request) {
  if (!SUPABASE_ANON_KEY) {
    console.error('SUPABASE_ANON_KEY not configured');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { email, product, referrer, utmSource, utmMedium, utmCampaign } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Look up product_id from slug (optional — leads work without it)
    let productId: number | null = null;
    if (product) {
      const productRes = await fetch(
        `${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(product)}&select=id&limit=1`,
        { headers: supabaseHeaders }
      );
      if (productRes.ok) {
        const products = await productRes.json();
        if (products.length > 0) {
          productId = products[0].id;
        }
      }
    }

    // Insert lead
    const leadRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: { ...supabaseHeaders, 'Prefer': 'return=representation' },
      body: JSON.stringify({
        email,
        product_id: productId,
        source: 'waitlist',
        referrer: referrer || null,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
      }),
    });

    if (!leadRes.ok) {
      const err = await leadRes.text();
      console.error('Supabase insert failed:', err);
      return NextResponse.json({ error: 'Failed to save' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "You're on the list!" });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
