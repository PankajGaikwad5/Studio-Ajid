"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { WHATSAPP_NUMBER } from "@/data/studio";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD = "w-full bg-transparent border-b border-navy/30 py-3 text-base focus:outline-none focus:border-navy transition-colors";
export const LABEL = "block text-xs tracking-[0.14em] uppercase";

// A plain enquiry form, used by the contact page and the product pages. Send
// does not post anywhere: once the form is valid it is replaced by two ways to
// send the message, WhatsApp or email, each opening with it already written.
// `choice` is a labelled set of plain-word options (project type, buy or ask);
// `context` adds lines to the message, such as the piece being asked about.
export default function EnquiryForm({ lead, subject, choice, context = [], messageRequired = true, idPrefix = "enquiry" }) {
  const { c } = useCopy();
  const { t } = useLanguage();
  const k = c.contactPage;
  const [values, setValues] = useState({ name: "", email: "", phone: "", choice: choice.options[0], message: "" });
  const [errors, setErrors] = useState({});
  const [choosing, setChoosing] = useState(false);
  const chooseRef = useRef(null);
  const formRef = useRef(null);
  const id = (name) => `${idPrefix}-${name}`;

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = k.required;
    if (!EMAIL_RE.test(values.email.trim())) next.email = values.email.trim() ? k.invalidEmail : k.required;
    if (messageRequired && !values.message.trim()) next.message = k.required;
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setChoosing(true);
    requestAnimationFrame(() => chooseRef.current?.focus());
  };

  // The message as it will arrive, the same for both ways of sending
  const details = [
    ...context,
    `${choice.label}: ${values.choice}`,
    `${k.name}: ${values.name.trim()}`,
    `${k.email}: ${values.email.trim()}`,
    values.phone.trim() && `${k.phone}: ${values.phone.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  const text = [subject, details, values.message.trim()].filter(Boolean).join("\n\n");
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const emailHref = `mailto:${t.contact.emailAddress}?subject=${encodeURIComponent(`${subject}: ${values.name.trim()}`)}&body=${encodeURIComponent(text)}`;

  if (choosing) {
    return (
      <div>
        <h2 ref={chooseRef} tabIndex={-1} className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] focus:outline-none">
          {k.chooseTitle}
        </h2>
        <p className="mt-3">{k.chooseNote}</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-px bg-navy/15 border border-navy/15">
          <Choice href={whatsappHref} title={k.whatsapp} note={k.whatsappNote} external />
          <Choice href={emailHref} title={k.emailOption} note={k.emailNote} />
        </div>
        <button type="button" onClick={() => setChoosing(false)} className="mt-8 text-sm underline underline-offset-[6px] decoration-navy/30 hover:decoration-navy cursor-pointer">
          {k.back}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-9">
      {lead && <p className="text-base md:text-lg leading-relaxed max-w-[40ch]">{lead}</p>}

      {/* The choice as plain words; the chosen one is underlined */}
      <fieldset>
        <legend className={LABEL}>{choice.label}</legend>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {choice.options.map((option) => (
            <label key={option} className="cursor-pointer">
              <input type="radio" name="choice" value={option} checked={values.choice === option} onChange={set("choice")} className="peer sr-only" />
              <span className="underline-offset-[9px] decoration-1 peer-checked:underline peer-focus-visible:underline hover:underline">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-9 sm:gap-6">
        <Field id={id("name")} label={k.name} error={errors.name}>
          <input id={id("name")} name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id("name")}-error` : undefined} className={FIELD} />
        </Field>
        <Field id={id("email")} label={k.email} error={errors.email}>
          <input id={id("email")} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id("email")}-error` : undefined} className={FIELD} />
        </Field>
      </div>

      <Field id={id("phone")} label={k.phone}>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} className={FIELD} />
      </Field>

      <Field id={id("message")} label={messageRequired ? k.message : k.messageOptional} error={errors.message}>
        <textarea id={id("message")} name="message" rows={5} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id("message")}-error` : undefined} className={`${FIELD} resize-y`} />
      </Field>

      <button type="submit" className="group inline-flex items-center gap-3 text-sm cursor-pointer">
        <span className="h-px w-8 bg-current transition-[width] duration-500 group-hover:w-12" />
        {k.send}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({ href, title, note, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-start justify-between gap-6 bg-beige p-6 md:p-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-navy"
    >
      <span>
        <span className="block text-2xl md:text-3xl">{title}</span>
        <span className="mt-2 block text-sm">{note}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.25}
        className="mt-1 w-6 h-6 shrink-0 rtl:-scale-x-100 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
      />
    </a>
  );
}
