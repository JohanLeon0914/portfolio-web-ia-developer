"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GraduationCap, MapPin, Code2 } from "lucide-react";
import clsx from "clsx";

export default function About() {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();

  const bio = locale === "en"
    ? "Web Developer with experience in full stack development and cloud-based solutions. I have worked on enterprise applications using Google Cloud, database management, and artificial intelligence models for data extraction and process automation. Interested in software architecture, AI, and cloud computing."
    : "Desarrollador Web con experiencia en desarrollo full stack y soluciones basadas en la nube. He trabajado en aplicaciones empresariales usando Google Cloud, gestión de bases de datos y modelos de inteligencia artificial para extracción de datos y automatización de procesos. Interesado en arquitectura de software, IA y computación en la nube.";

  return (
    <section id="about" className="py-28 px-6">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            {t("sectionLabels.about")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-muted leading-relaxed text-base mb-6">{bio}</p>

            {/* Info cards */}
            <div className="flex flex-col gap-3 mt-8">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={15} className="text-accent flex-shrink-0" />
                <span className="text-muted">Colombia</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Code2 size={15} className="text-accent-2 flex-shrink-0" />
                <span className="text-muted">
                  {locale === "en" ? "Open to remote opportunities" : "Abierto a oportunidades remotas"}
                </span>
              </div>
            </div>
          </div>

          {/* Education & Stats */}
          <div className="flex flex-col gap-5">
            {/* Education card */}
            <div className="p-6 rounded-xl border border-border bg-surface card-hover">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <GraduationCap size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted mb-1 uppercase tracking-wider">
                    {t("about.education")}
                  </p>
                  <p className="font-display font-semibold text-text text-base">
                    {locale === "en" ? "Systems Engineering" : "Ingeniería de Sistemas"}
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    {locale === "en"
                      ? "Francisco de Paula Santander University"
                      : "Universidad Francisco de Paula Santander, Cúcuta"}
                  </p>
                  <p className="text-xs text-muted mt-1 font-mono">July 2018 — 2026</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: locale === "en" ? "Years exp." : "Años exp.", value: "3+" },
                { label: locale === "en" ? "Projects" : "Proyectos", value: "10+" },
                { label: locale === "en" ? "Certificates" : "Certificados", value: "10+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-border bg-surface text-center card-hover"
                >
                  <p className="font-display font-extrabold text-2xl gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
