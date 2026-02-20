"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  periodEs: string;
  current: boolean;
  description: string;
  descriptionEs: string;
  responsibilities: string[];
  responsibilitiesEs: string[];
  achievements: string[];
  achievementsEs: string[];
  tags: string[];
}

export default function Experience() {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expanded, setExpanded] = useState<string | null>("glocation");

  useEffect(() => {
    fetch("/jsons/experience.json")
      .then((r) => r.json())
      .then(setJobs);
  }, []);

  return (
    <section id="experience" className="py-28 px-6 bg-surface/40">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-accent-2 tracking-widest uppercase">
            {t("sectionLabels.experience")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
          {t("experience.title")}
        </h2>
        <p className="text-muted mb-12">{t("experience.subtitle")}</p>

        <div className="flex flex-col gap-4">
          {jobs.map((job, i) => {
            const isOpen = expanded === job.id;
            return (
              <div
                key={job.id}
                className={clsx(
                  "rounded-xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-accent/30 bg-surface glow-accent"
                    : "border-border bg-surface/60 hover:border-border/80"
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Header */}
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                >
                  <div className="flex items-start gap-5">
                    {/* Timeline dot */}
                    <div className="mt-1 flex-shrink-0">
                      <div
                        className={clsx(
                          "w-3 h-3 rounded-full border-2 transition-colors",
                          isOpen ? "bg-accent border-accent" : "bg-transparent border-muted"
                        )}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-xl text-text">
                          {job.role}
                        </h3>
                        {job.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono">
                            current
                          </span>
                        )}
                      </div>
                      <p className="text-accent-2 font-medium text-sm mt-0.5">{job.company}</p>
                      <p className="text-muted text-xs font-mono mt-1">
                        {locale === "es" ? job.periodEs : job.period}
                      </p>
                    </div>
                  </div>

                  <div className={clsx("text-muted transition-colors", isOpen && "text-accent")}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 pb-6 pl-14 border-t border-border/40">
                    <p className="text-muted text-sm leading-relaxed mt-4 mb-6">
                      {locale === "es" ? job.descriptionEs : job.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
                          {t("experience.responsibilities")}
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {(locale === "es" ? job.responsibilitiesEs : job.responsibilities).map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                              <span className="text-border mt-1.5">—</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                          {t("experience.achievements")}
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {(locale === "es" ? job.achievementsEs : job.achievements).map((a, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted">
                              <CheckCircle2 size={13} className="text-accent mt-0.5 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {job.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
