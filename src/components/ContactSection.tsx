// src/components/ContactSection.tsx

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// 🔧 change this to your real email
const CONTACT_EMAIL = "team.caresenseai@gmail.com";

export const ContactSection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    // Build a simple mailto link (no backend needed)
    const subject = encodeURIComponent(
      reason
        ? `[CareSense AI] ${reason} · ${fullName}`
        : `[CareSense AI] New contact from ${fullName}`
    );
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    toast.success("Opening your email app…", {
      description:
        "If nothing opens, you can copy our email address and reach out manually.",
    });

    // Trigger email client
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/10 bg-slate-950 py-16 md:py-20"
    >
      {/* soft glows */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-20 left-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:gap-12">
        {/* Left: Copy + quick contact info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Get in touch with CareSense AI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
            Have feedback, partnership ideas, or clinical questions? Send a
            message and we&apos;ll get back to you as soon as we can.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5">
                <Mail className="h-4 w-4 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Email
                </p>
                <p className="font-medium">{CONTACT_EMAIL}</p>
              </div>
            </div>

            {/* Optional phone / WhatsApp text – edit or remove if you want */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5">
                <Phone className="h-4 w-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Phone / WhatsApp (India)
                </p>
                <p className="font-medium text-slate-200">
                  +91 · 7667068671
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5">
                <MessageCircle className="h-4 w-4 text-cyan-200" />
              </div>
              <p className="text-xs text-slate-400">
                We do not provide personal medical advice over email. For urgent
                symptoms, please contact local emergency services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                Full name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="rounded-2xl border-white/15 bg-slate-950/60 text-sm text-slate-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                Email address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-2xl border-white/15 bg-slate-950/60 text-sm text-slate-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                Reason for contact (optional)
              </label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Feedback, partnership, clinical interest…"
                className="rounded-2xl border-white/15 bg-slate-950/60 text-sm text-slate-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                Message
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share as much context as you’d like. Please avoid personal identifiers or sensitive details."
                rows={5}
                className="min-h-[140px] resize-none rounded-2xl border-white/15 bg-slate-950/60 text-sm text-slate-100"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-primary to-emerald-primary py-3 text-sm font-semibold shadow-xl hover:shadow-2xl md:py-3.5 md:text-base"
          >
            Send message
          </Button>

          <p className="mt-3 text-[0.7rem] text-slate-500 md:text-xs">
            By sending a message, you agree not to share emergency situations or
            highly sensitive medical data. CareSense AI is not a substitute for
            in-person medical care.
          </p>
        </motion.form>
      </div>
    </section>
  );
};
