"use server";

import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/contact-schema";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
  values?: { name?: string; email?: string; message?: string };
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const parsed = validateContact(values);
  if (!parsed.success) {
    return { status: "error", errors: parsed.errors, values };
  }

  try {
    await getDb().insert(contactMessages).values(parsed.data);
  } catch (err) {
    console.error("Failed to save contact message", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again or email me directly.",
      values,
    };
  }

  // The message is already saved, so an email failure shouldn't fail the form.
  try {
    await sendEmailNotification(parsed.data);
  } catch (err) {
    console.error("Failed to send contact email", err);
  }

  return { status: "success", message: "Thanks! Your message has been sent — I'll get back to you soon." };
}

async function sendEmailNotification({ name, email, message }: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY or CONTACT_TO_EMAIL not set; skipping email notification");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: emailHtml({ name, email, message }),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function emailHtml({ name, email, message }: ContactInput) {
  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const n = escapeHtml(name);
  const e = escapeHtml(email);
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f4f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
      <tr><td style="background:#0b0b0f;padding:20px 24px;">
        <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5eead4;">Portfolio contact</p>
        <p style="margin:6px 0 0;font-size:18px;font-weight:600;color:#ececf1;">New message to ${n}</p>
      </td></tr>
      <tr><td style="padding:24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.7;">
          <tr><td style="color:#71717a;padding-right:16px;">Name</td><td style="font-weight:600;">${n}</td></tr>
          <tr><td style="color:#71717a;padding-right:16px;">Email</td><td><a href="mailto:${e}" style="color:#0d9488;">${e}</a></td></tr>
          <tr><td style="color:#71717a;padding-right:16px;">Sent</td><td>${sentAt} IST</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f4f4f7;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
        <p style="margin:20px 0 0;font-size:13px;color:#71717a;">Hit reply to answer ${n} directly.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}
