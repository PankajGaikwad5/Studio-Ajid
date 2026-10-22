"use client";
// The previous default home page (before v15 became the default), kept for comparison

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NavGrid from "@/components/NavGrid";
import SiteFooter from "@/components/SiteFooter";
import { useRouter } from "next/navigation";

export default function V16Page() {
  const router = useRouter();

  const handleNavigate = (targetId) => {
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Portfolio and collection have their own pages
    if (["residential", "hospitality", "gallery"].includes(targetId)) {
      router.push(`/${targetId}`);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy text-beige">
      {/* Column Navbar stuck to middle-left of the screen */}
      <Navbar onNavigate={handleNavigate} />

      <main className="flex-1">
        <Hero />
        <NavGrid onNavigate={handleNavigate} />
      </main>

      <SiteFooter />
    </div>
  );
}
