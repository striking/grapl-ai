"use client";

import { useState } from "react";

interface SignupCaptureFormProps {
  project: string;
  source?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

function queryValue(params: URLSearchParams, ...keys: string[]): string | null {
  for (const key of keys) {
    const value = params.get(key);
    if (value) return value;
  }
  return null;
}

export function SignupCaptureForm({
  project,
  source = "waitlist",
  submitLabel = "Join Waitlist",
  successTitle = "You're on the list!",
  successMessage = "We'll notify you when new tools launch.",
}: SignupCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const trackedSource =
        queryValue(urlParams, "source", "src", "utm_source") || source;

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          project,
          source: trackedSource,
          sourceDetail: source,
          referrer: document.referrer || undefined,
          pageUrl: window.location.href,
          landingPath: window.location.pathname,
          utmSource: urlParams.get("utm_source") || undefined,
          utmMedium: urlParams.get("utm_medium") || undefined,
          utmCampaign: urlParams.get("utm_campaign") || undefined,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Signup capture failed:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center motion-safe:animate-[fade-up_0.5s_ease-out]">
        <p className="font-medium text-emerald-300">{successTitle}</p>
        <p className="mt-1 text-sm text-gray-400">{successMessage}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
          <p className="font-medium text-red-300">Something went wrong</p>
          <p className="mt-1 text-sm text-gray-400">
            Please try again or contact support.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-gray-400 underline hover:text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
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
        {status === "loading" ? "Joining..." : submitLabel}
      </button>
    </form>
  );
}
