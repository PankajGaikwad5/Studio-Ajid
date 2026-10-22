"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X, Layers, MapPin, Maximize2, Calendar, Building2 } from "lucide-react";

export default function ProjectsSection({ onOpenInquiry, currentFilter = "all", onFilterChange }) {
  const { t, isRTL } = useLanguage();
  const [internalFilter, setInternalFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const activeFilter = currentFilter !== "all" ? currentFilter : internalFilter;
  const setActiveFilter = onFilterChange || setInternalFilter;

  const projects = t.works.projects;

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.type.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#0c0c0e] text-[#edece6] border-t border-white/[0.06]"
    >
      {/* Invisible anchor markers for direct navigation */}
      <div id="residential" className="absolute -top-12 left-0" />
      <div id="hospitality" className="absolute -top-12 left-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.works.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              {t.works.title}
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light mt-2 max-w-xl">
              {t.works.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: t.works.filterAll },
              { id: "residential", label: t.works.filterResidential },
              { id: "hospitality", label: t.works.filterHospitality || "Hospitality" },
              { id: "cultural", label: t.works.filterCultural },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === filter.id
                    ? "bg-[#ede3d6] text-black font-semibold shadow-lg shadow-white/10"
                    : "glass-pill text-white/70 hover:text-white hover:border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer flex flex-col glass-panel rounded-3xl overflow-hidden hover:border-[#c5a880]/40 transition-all duration-500"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18181b]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 z-10 glass-pill px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider text-white font-medium">
                  {project.category}
                </div>

                {/* Hover Inspect Icon */}
                <div className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-[#c5a880]" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#c5a880] mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                      {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white group-hover:text-[#c5a880] transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    {project.scale}
                  </span>
                  <span className="text-[#c5a880] uppercase tracking-wider font-medium text-[11px] group-hover:underline">
                    {t.works.viewProject} →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 glass-pill p-2.5 rounded-full text-white/80 hover:text-white hover:border-[#c5a880] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-white/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full text-xs uppercase tracking-wider">
                {selectedProject.category}
              </div>
            </div>

            {/* Modal Title & Meta */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c5a880] mb-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedProject.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedProject.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {selectedProject.scale}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light mb-6">
                {selectedProject.description}
              </p>
            </div>

            {/* Materials Palette */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] mb-2 font-medium">
                <Layers className="w-4 h-4" />
                <span>{t.works.materialsLabel}</span>
              </div>
              <p className="text-sm text-white/90 font-light">
                {selectedProject.materials}
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full glass-pill text-xs uppercase tracking-wider text-white/70 hover:text-white"
              >
                {t.works.closeModal}
              </button>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onOpenInquiry) onOpenInquiry();
                  else {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Inquire About Similar Monolith</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
