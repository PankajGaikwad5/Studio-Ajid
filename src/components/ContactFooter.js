"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Clock, MapPin, ArrowUp, Send, CheckCircle2, Copy, Check } from "lucide-react";

export default function ContactFooter({ formOpen, setFormOpen }) {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: t.contact.form.projectTypes[0],
    location: "",
    message: "",
  });

  // Live clocks for Riyadh, Dubai, and London
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const riyadh = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const dubai = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const london = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      setCurrentTime({ Riyadh: riyadh, Dubai: dubai, London: london });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("inquiries@studioajid.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#070709] text-[#edece6] border-t border-white/[0.08] overflow-hidden">
      
      {/* Upper Inquiries Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-20">
        
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-6">
          <Mail className="w-3.5 h-3.5" />
          <span>{t.contact.sectionTag}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-white leading-tight mb-6">
              {t.contact.headline}
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-xl leading-relaxed mb-8">
              {t.contact.subheadline}
            </p>

            {/* Direct Email Pill */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="glass-panel px-5 py-3 rounded-full flex items-center gap-3 text-sm font-mono text-white/90 hover:text-white hover:border-[#c5a880]/50 transition-all cursor-pointer group"
              >
                <span>{t.contact.emailAddress}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-[#c5a880]" />
                ) : (
                  <Copy className="w-4 h-4 text-white/40 group-hover:text-[#c5a880] transition-colors" />
                )}
              </button>

              <button
                onClick={() => setFormOpen(true)}
                className="bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-white transition-all duration-300 cursor-pointer shadow-lg shadow-[#c5a880]/20"
              >
                {t.contact.ctaButton}
              </button>
            </div>
          </div>

          {/* Studios & Live Clocks */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {t.contact.studios.map((studio) => (
              <div
                key={studio.city}
                className="glass-panel p-5 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3 text-[#c5a880]" />
                    <span>{studio.city}</span>
                    <span className="text-[10px] text-white/40 font-normal">({studio.label})</span>
                  </div>
                  <div className="text-[11px] text-white/50 font-light">
                    {studio.address}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#c5a880]">
                    <Clock className="w-3 h-3 text-[#c5a880]" />
                    <span>{currentTime[studio.city] || "--:--:--"}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">
                    LOCAL TIME
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Commission Form Drawer / Section */}
        {formOpen && (
          <div className="mb-20 glass-panel p-8 md:p-12 rounded-3xl border border-[#c5a880]/30 animate-in fade-in duration-400">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-display font-semibold text-white">
                  {t.contact.form.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                  {t.contact.form.subtitle}
                </p>
              </div>
              <button
                onClick={() => setFormOpen(false)}
                className="text-xs uppercase tracking-widest text-white/50 hover:text-white glass-pill px-3 py-1.5 rounded-full cursor-pointer"
              >
                Close
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle2 className="w-12 h-12 text-[#c5a880] mb-4 animate-bounce" />
                <h4 className="text-2xl font-display font-semibold text-white mb-2">
                  {t.contact.form.successTitle}
                </h4>
                <p className="text-sm text-white/70 max-w-md font-light">
                  {t.contact.form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                    {t.contact.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                    {t.contact.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                    {t.contact.form.projectTypeLabel}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                  >
                    {t.contact.form.projectTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                    {t.contact.form.locationLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={t.contact.form.locationPlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-2">
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-white transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{submitting ? t.contact.form.submitting : t.contact.form.submitButton}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Bottom Sub-footer */}
        <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 tracking-wider">
          <div>{t.footer.rights}</div>
          <div className="font-mono text-[11px] text-white/30">{t.footer.builtWith}</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#c5a880] transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
