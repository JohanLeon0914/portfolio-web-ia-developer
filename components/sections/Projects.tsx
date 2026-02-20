"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  landingUrl?: string;
  appUrl?: string;
  featured: boolean;
  role: string;
  highlights: string[];
}

export default function Projects() {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/jsons/projects.json")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  return (
    <section id="projects" className="py-28 px-6">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-accent-3 tracking-widest uppercase">
            03 / projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
          {t("projects.title")}
        </h2>
        <p className="text-muted mb-12">{t("projects.subtitle")}</p>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className={clsx(
                "relative rounded-2xl border bg-surface overflow-hidden card-hover",
                project.featured ? "border-accent/20" : "border-border"
              )}
            >
              {project.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
              )}

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    {project.featured && (
                      <span className="inline-block text-xs font-mono text-accent-3 mb-2 uppercase tracking-widest">
                        ★ featured
                      </span>
                    )}
                    <h3 className="font-display font-bold text-3xl text-text">
                      {project.title}
                    </h3>
                    <p className="text-accent text-sm font-medium mt-1">{project.tagline}</p>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 flex-shrink-0">
                    {project.landingUrl && (
                      <a
                        href={project.landingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted text-xs font-medium hover:text-text hover:border-text/30 transition-all"
                      >
                        <ExternalLink size={12} />
                        {t("projects.viewLanding")}
                      </a>
                    )}
                    {project.appUrl && (
                      <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-medium hover:bg-accent/20 transition-all"
                      >
                        <ArrowUpRight size={12} />
                        {t("projects.viewApp")}
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted leading-relaxed mb-8 max-w-2xl">
                  {project.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Role & highlights */}
                  <div>
                    <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                      {t("projects.highlights")}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 size={13} className="text-accent mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
                      {t("projects.builtWith")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-border/40">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                        {t("projects.role")}
                      </p>
                      <p className="text-sm text-text font-medium">{project.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
