"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PageShell, { PAGE_GUTTER } from "./PageShell";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/studio";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD = "w-full bg-transparent border-b border-navy/30 py-3 text-base focus:outline-none focus:border-navy transition-colors";
const LABEL = "block text-xs tracking-[0.14em] uppercase";

// A plain enquiry form. Send does not post anywhere: once the form is valid it
// is replaced by two ways to send the message, WhatsApp or email, each opening
// with the message already written.
export default function ContactPage() {
  const { c } = useCopy();
  const { t } = useLanguage();
  const k = c.contactPage;
  const [values, setValues] = useState({ name: "", email: "", phone: "", type: k.types[0], message: "" });
  const [errors, setErrors] = useState({});
  const [choosing, setChoosing] = useState(false);
  const chooseRef = useRef(null);
  const formRef = useRef(null);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = k.required;
    if (!EMAIL_RE.test(values.email.trim())) next.email = values.email.trim() ? k.invalidEmail : k.required;
    if (!values.message.trim()) next.message = k.required;
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
    `${k.name}: ${values.name.trim()}`,
    `${k.email}: ${values.email.trim()}`,
    values.phone.trim() && `${k.phone}: ${values.phone.trim()}`,
    `${k.type}: ${values.type}`,
  ]
    .filter(Boolean)
    .join("\n");
  const text = `${k.subject}\n\n${details}\n\n${values.message.trim()}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const emailHref = `mailto:${t.contact.emailAddress}?subject=${encodeURIComponent(`${k.subject}: ${values.name.trim()}`)}&body=${encodeURIComponent(text)}`;

  return (
    <PageShell active="contact">
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-24 md:pb-32`}>
        <div className="pb-6 border-b border-navy/15">
          <h1 className="text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{k.title}</h1>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-14 md:gap-6">
          <div className="md:col-span-7">
            {!choosing ? (
              <form ref={formRef} onSubmit={submit} noValidate className="space-y-9">
                <p className="text-base md:text-lg leading-relaxed max-w-[40ch]">{k.lead}</p>

                <div className="grid sm:grid-cols-2 gap-9 sm:gap-6">
                  <Field id="name" label={k.name} error={errors.name}>
                    <input id="name" name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={FIELD} />
                  </Field>
                  <Field id="email" label={k.email} error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={FIELD} />
                  </Field>
                </div>

                <Field id="phone" label={k.phone}>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} className={FIELD} />
                </Field>

                {/* Project type as plain words; the chosen one is underlined */}
                <fieldset>
                  <legend className={LABEL}>{k.type}</legend>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {k.types.map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input type="radio" name="type" value={type} checked={values.type === type} onChange={set("type")} className="peer sr-only" />
                        <span className="underline-offset-[9px] decoration-1 peer-checked:underline peer-focus-visible:underline hover:underline">{type}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field id="message" label={k.message} error={errors.message}>
                  <textarea id="message" name="message" rows={5} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={`${FIELD} resize-y`} />
                </Field>

                <button type="submit" className="group inline-flex items-center gap-3 text-sm cursor-pointer">
                  <span className="h-px w-8 bg-current transition-[width] duration-500 group-hover:w-12" />
                  {k.send}
                </button>
              </form>
            ) : (
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
            )}
          </div>

          {/* Direct details */}
          <aside className="md:col-span-4 md:col-start-9 space-y-8">
            <div>
              <p className={LABEL}>{k.directLabel}</p>
              <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 inline-block text-lg underline-offset-[6px] decoration-1 hover:underline">
                {t.contact.emailAddress}
              </a>
            </div>
            <div>
              <p className={LABEL}>{t.nav.instagram}</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-lg underline-offset-[6px] decoration-1 hover:underline">
                @studioajid
              </a>
            </div>
            <div className="pt-8 border-t border-navy/15">
              <p>{c.footer.cities}</p>
              <p className="mt-2 text-xs tracking-[0.14em] uppercase">{c.home2.studioNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
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
