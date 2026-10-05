"use client";

import { useActionState, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };
const fields: ContactField[] = ["name", "email", "message"];

const inputClass =
  "w-full rounded-xl border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  // Errors from validating in the browser before submitting.
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  // Fields edited since the last server response; their server errors are hidden.
  const [edited, setEdited] = useState<{ for: ContactState; fields: ContactField[] }>({ for: state, fields: [] });
  const editedFields = edited.for === state ? edited.fields : [];

  // A new state object comes back on every submit, so this fires once per server response.
  // On success no values are returned, so the form resets to empty fields.
  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    else if (state.status === "error") toast.error(state.message ?? "Please fix the highlighted fields.");
  }, [state]);

  function errorFor(field: ContactField) {
    if (clientErrors[field]) return clientErrors[field][0];
    return editedFields.includes(field) ? undefined : state.errors?.[field]?.[0];
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const result = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    if (!result.success) {
      // Stops React from running the server action.
      e.preventDefault();
      setClientErrors(result.errors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setClientErrors({});
  }

  function handleInput(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as ContactField;
    if (!fields.includes(name)) return;
    setClientErrors((prev) => ({ ...prev, [name]: undefined }));
    if (!editedFields.includes(name)) setEdited({ for: state, fields: [...editedFields, name] });
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} onInput={handleInput} className="space-y-4 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errorFor("name")}>
          <input
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            placeholder="Your name"
            aria-invalid={!!errorFor("name")}
            className={`${inputClass} ${borderFor(errorFor("name"))}`}
          />
        </Field>
        <Field label="Email" error={errorFor("email")}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            placeholder="you@company.com"
            aria-invalid={!!errorFor("email")}
            className={`${inputClass} ${borderFor(errorFor("email"))}`}
          />
        </Field>
      </div>
      <Field label="Message" error={errorFor("message")}>
        <textarea
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          placeholder="Tell me about the role or project…"
          aria-invalid={!!errorFor("message")}
          className={`${inputClass} ${borderFor(errorFor("message"))} resize-y`}
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

function borderFor(error?: string) {
  return error ? "border-red-400/70 focus:border-red-400" : "border-border focus:border-accent";
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
