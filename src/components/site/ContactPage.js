"use client";

import PageShell, { PAGE_GUTTER } from "./PageShell";
import EnquiryForm, { LABEL } from "./EnquiryForm";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL } from "@/data/studio";

// The enquiry form (Send offers WhatsApp or email) beside the direct details
export default function ContactPage() {
  const { c } = useCopy();
  const { t } = useLanguage();
  const k = c.contactPage;

  return (
    <PageShell active="contact">
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-24 md:pb-32`}>
        <div className="pb-6 border-b border-navy/15">
          <h1 className="text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{k.title}</h1>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-14 md:gap-6">
          <div className="md:col-span-7">
            <EnquiryForm lead={k.lead} subject={k.subject} choice={{ label: k.type, options: k.types }} idPrefix="contact" />
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
