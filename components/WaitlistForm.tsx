"use client";

import { SignupCaptureForm } from "@/components/SignupCaptureForm";

interface WaitlistFormProps {
  product?: string; // Product slug — matches Supabase products.slug
  source?: string;
}

export function WaitlistForm({ product = "grapl-ai", source = "waitlist" }: WaitlistFormProps) {
  return (
    <SignupCaptureForm
      project={product}
      source={source}
      submitLabel="Join Waitlist"
      successTitle="You're on the list! 🎉"
      successMessage="We'll notify you when new tools launch."
    />
  );
}
