"use client";

import { useLanguage } from "@/context/LanguageContext";
import { pageCopy } from "@/data/pageCopy";

// Page copy for the current language, plus `pick` for bilingual data fields
export function useCopy() {
  const { language, isRTL } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  return {
    c: pageCopy[lang],
    pick: (field) => (field && typeof field === "object" ? field[lang] ?? field.en : field),
    lang,
    isRTL,
  };
}
