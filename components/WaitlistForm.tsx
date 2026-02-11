"use client";

import { useState } from "react";

// Waitlist API endpoint - deployed Google Apps Script web app
// To update: Deploy new version from Google Apps Script and update this URL
const WAITLIST_API_URL = "/api/waitlist";

interface WaitlistSubmission {
  email: string;
  product: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

async function submitToWaitlist(data: WaitlistSubmission): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(WAITLIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Get UTM params from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = document.referrer || "";
      
      await submitToWaitlist({
        email,
        product: "grapl-ai",
        referrer,
        utmSource: urlParams.get("utm_source") || undefined,
        utmMedium: urlParams.get("utm_medium") || undefined,
        utmCampaign: urlParams.get("utm_campaign") || undefined,
      });
      
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Waitlist submission failed:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center motion-safe:animate-[fade-up_0.5s_ease-out]">
        <p className="font-medium text-emerald-300">You're on the list! 🎉</p>
        <p className="mt-1 text-sm text-gray-400">We'll notify you when new tools launch.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
          <p className="font-medium text-red-300">Something went wrong</p>
          <p className="mt-1 text-sm text-gray-400">Please try again or contact support.</p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-gray-400 hover:text-white underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
        aria-label="Email address"
        className="flex-1 rounded-xl border border-gray-800 bg-gray-900/70 px-4 py-3 text-white placeholder-gray-500 shadow-inner shadow-black/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
