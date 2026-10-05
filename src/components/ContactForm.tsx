"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { sendContactMessage, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  // A new state object comes back on every submit, so this fires once per submission.
  // On success no values are returned, so the form resets to empty fields.
  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    else if (state.status === "error") toast.error(state.message ?? "Please fix the highlighted fields.");
  }, [state]);

  return (
    <form action={formAction} className="space-y-4 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={state.errors?.name?.[0]}>
          <input
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            placeholder="Your name"
            className={inputClass}
          />
        </Field>
        <Field label="Email" error={state.errors?.email?.[0]}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            placeholder="you@company.com"
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Message" error={state.errors?.message?.[0]}>
        <textarea
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          placeholder="Tell me about the role or project…"
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Honeypot field, hidden from people */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
