"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import { Award, Clock, ExternalLink } from "lucide-react";
import clsx from "clsx";

interface Certificate {
  id: string;
  title: string;
  titleEn: string;
  platform: string;
  date: string;
  dateFormatted: string;
  dateFormattedEs: string;
  hours: number | null;
  categories: string[];
  file: string;
  code: string | null;
}

const CATEGORIES = ["All", "Machine Learning", "Data Science", "Programming", "Mathematics"];

export default function Certificates() {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/jsons/certificates.json")
      .then((r) => r.json())
      .then((data: Certificate[]) => {
        setCerts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      });
  }, []);

  const filtered =
    filter === "All" ? certs : certs.filter((c) => c.categories.includes(filter));

  const categoryColors: Record<string, string> = {
    "Machine Learning": "text-accent border-accent/30 bg-accent/5",
    "Data Science": "text-accent-2 border-accent-2/30 bg-accent-2/5",
    "Programming": "text-accent-3 border-accent-3/30 bg-accent-3/5",
    "Mathematics": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  };

  return (
    <section id="certificates" className="py-28 px-6">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-yellow-400 tracking-widest uppercase">
            {t("sectionLabels.certificates")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
          {t("certificates.title")}
        </h2>
        <p className="text-muted mb-10">{t("certificates.subtitle")}</p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const label =
              cat === "All"
                ? t("certificates.all")
                : locale === "es"
                ? t(`certificates.categories.${cat}`)
                : cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-mono border transition-all",
                  filter === cat
                    ? "bg-accent text-bg border-accent font-semibold"
                    : "border-border text-muted hover:border-muted hover:text-text"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cert, i) => (
            <a
              key={cert.id}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-border bg-surface card-hover flex flex-col gap-3"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-lg bg-border/50">
                  <Award size={16} className="text-accent" />
                </div>
                <div className="flex flex-wrap gap-1 justify-end flex-1">
                  {cert.categories.map((cat) => (
                    <span
                      key={cat}
                      className={clsx(
                        "text-xs px-1.5 py-0.5 rounded-full border font-mono whitespace-nowrap",
                        categoryColors[cat] || "text-muted border-border"
                      )}
                    >
                      {locale === "es" ? t(`certificates.categories.${cat}`) : cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display font-semibold text-sm text-text leading-snug group-hover:text-accent transition-colors">
                  {locale === "en" ? cert.titleEn : cert.title}
                </h3>
                <p className="text-xs text-accent-2 mt-1 font-medium">{cert.platform}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="font-mono">
                    {locale === "en" ? cert.dateFormatted : cert.dateFormattedEs}
                  </span>
                  {cert.hours && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {cert.hours}h
                    </span>
                  )}
                </div>
                <ExternalLink size={12} className="text-muted group-hover:text-accent transition-colors" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
