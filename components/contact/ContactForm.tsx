"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, Loader2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { contactFormCopy } from "@/data/contact";

/*
 * IMPORTANT: form logic is identical to the previous implementation —
 * same zod schema, same react-hook-form wiring, same POST to
 * /api/contact (Resend), same success and error handling.
 * Only the visual shell was restyled to the light design system.
 */

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;
      if (!res.ok || !payload?.ok) {
        throw new Error(
          payload?.error ?? "Something went wrong. Please try again.",
        );
      }
      setSent(true);
      reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow={contactFormCopy.eyebrow}
          title={contactFormCopy.title}
          subtitle={contactFormCopy.subtitle}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {/* Info */}
          <div className="space-y-6 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="card-light p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal/55">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-sm font-medium text-charcoal transition hover:text-forest"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="md:col-span-3"
          >
            <div className="card-light p-6 md:p-8" id="submit">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-forest" />
                    <h3 className="font-display text-2xl font-bold">
                      Message sent
                    </h3>
                    <p className="max-w-sm text-pretty text-sm text-charcoal/70">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 1–2 business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="btn-outline mt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="First name"
                        name="firstName"
                        placeholder="Your first name"
                        register={register}
                        error={errors.firstName?.message}
                      />
                      <Field
                        label="Last name"
                        name="lastName"
                        placeholder="Your last name"
                        register={register}
                        error={errors.lastName?.message}
                      />
                    </div>
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      register={register}
                      error={errors.email?.message}
                    />
                    <Field
                      label="Message"
                      name="message"
                      textarea
                      placeholder="Tell us about your story…"
                      register={register}
                      error={errors.message?.message}
                    />

                    {errorMessage && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-forest w-full justify-center disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
}

/** Reference-style field: label above, light bordered input. */
function Field({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
  register,
  error,
}: FieldProps) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-charcoal"
      >
        {label}
      </label>
      <Tag
        id={name}
        type={textarea ? undefined : type}
        placeholder={placeholder}
        {...register(name)}
        rows={textarea ? 5 : undefined}
        className="w-full rounded-lg border border-mist bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-forest focus:ring-2 focus:ring-forest/15"
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
