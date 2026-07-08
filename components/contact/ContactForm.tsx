"use client";
import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

type FormErrors = { name?: string; email?: string; message?: string };

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FormErrors = {};
    const name = form.name.trim();
    if (!name) errs.name = "Name is required";
    else if (name.length > 100) errs.name = "Name must be 100 characters or fewer";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email address";
    else if (form.email.length > 254) errs.email = "Email address is too long";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.length > 2000) errs.message = "Message must be 2000 characters or fewer";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setState("sending");
    // v2: wire up Resend API route here
    // For now, open mailto as fallback
    const safeName = form.name.replace(/[\r\n]/g, " ");
    const safeMessage = form.message.replace(/[\r\n]/g, " ");
    const subject = encodeURIComponent(`Enquiry from ${safeName} via Aurevon`);
    const body = encodeURIComponent(safeMessage);
    window.location.href = `mailto:aurevonlabs@gmail.com?subject=${subject}&body=${body}`;
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col gap-3 py-8">
        <div className="w-8 h-px bg-gold" />
        <p className="text-text text-sm">Message sent.</p>
        <p className="text-muted text-xs">
          We&apos;ll reply within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-muted text-xs uppercase tracking-widest">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={handleChange}
          className="bg-surface border border-border px-4 py-3 text-text text-sm placeholder-muted/40 focus:outline-none focus:border-gold transition-colors duration-200 rounded-sm"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-muted text-xs uppercase tracking-widest">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          value={form.email}
          onChange={handleChange}
          className="bg-surface border border-border px-4 py-3 text-text text-sm placeholder-muted/40 focus:outline-none focus:border-gold transition-colors duration-200 rounded-sm"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-muted text-xs uppercase tracking-widest">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          value={form.message}
          onChange={handleChange}
          className="bg-surface border border-border px-4 py-3 text-text text-sm placeholder-muted/40 focus:outline-none focus:border-gold transition-colors duration-200 rounded-sm resize-none"
          placeholder="Your enquiry..."
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="py-3 bg-gold text-bg text-sm font-medium tracking-widest uppercase hover:bg-gold-muted transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
