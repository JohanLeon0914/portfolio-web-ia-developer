"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface Project {
  id: string;
  title: string;
  titleEs: string;
  tagline: string;
  taglineEs: string;
  description: string;
  descriptionEs: string;
  longDescription: string;
  longDescriptionEs: string;
  tags: string[];
  landingUrl?: string;
  appUrl?: string;
  githubUrl?: string;
  featured: boolean;
  role: string;
  roleEs: string;
  highlights: string[];
  highlightsEs: string[];
}

export default function Projects() {
  const { t, locale } = useI18n();
  const { ref, visible } = useScrollReveal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    fetch("/jsons/projects.json")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const currentProject = projects[activeProject];
  const hasMultipleProjects = projects.length > 1;

  const goToPreviousProject = () => {
    setActiveProject((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  };

  const goToNextProject = () => {
    setActiveProject((current) =>
      current === projects.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section id="projects" className="py-28 px-6">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-accent-3 tracking-widest uppercase">
            {t("sectionLabels.projects")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
          {t("projects.title")}
        </h2>
        <p className="text-muted mb-12">{t("projects.subtitle")}</p>

        {currentProject && (
          <div>
            <div className="relative">
              {hasMultipleProjects && (
                <button
                  type="button"
                  onClick={goToPreviousProject}
                  aria-label={locale === "es" ? "Proyecto anterior" : "Previous project"}
                  className="absolute left-0 top-1/2 z-10 hidden h-14 w-14 -translate-x-[85%] -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-bg/95 text-white shadow-lg backdrop-blur hover:border-accent hover:text-accent transition-all md:flex"
                >
                  <ChevronLeft size={26} />
                </button>
              )}

              <article
                key={currentProject.id}
                className={clsx(
                  "relative min-w-0 flex-1 rounded-2xl border bg-surface overflow-hidden card-hover",
                  currentProject.featured ? "border-accent/20" : "border-border"
                )}
              >
                {currentProject.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
                )}

                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      {currentProject.featured && (
                        <span className="inline-block text-xs font-mono text-accent-3 mb-2 uppercase tracking-widest">
                          * featured
                        </span>
                      )}
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-text">
                        {locale === "es" ? currentProject.titleEs : currentProject.title}
                      </h3>
                      <p className="text-accent text-sm font-medium mt-1">
                        {locale === "es" ? currentProject.taglineEs : currentProject.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 flex-shrink-0 mt-4 md:mt-0">
                      {currentProject.landingUrl && (
                        <a
                          href={currentProject.landingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-muted text-xs font-medium hover:text-text hover:border-text/30 transition-all whitespace-nowrap"
                        >
                          <ExternalLink size={12} />
                          {t("projects.viewLanding")}
                        </a>
                      )}
                      {currentProject.appUrl && (
                        <a
                          href={currentProject.appUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-medium hover:bg-accent/20 transition-all whitespace-nowrap"
                        >
                          <ArrowUpRight size={12} />
                          {t("projects.viewApp")}
                        </a>
                      )}
                      {currentProject.githubUrl && (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-muted text-xs font-medium hover:text-text hover:border-text/30 transition-all whitespace-nowrap"
                        >
                          <Github size={12} />
                          {t("projects.viewCode")}
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted leading-relaxed mb-6 md:mb-8 max-w-none md:max-w-2xl">
                    {locale === "es" ? currentProject.descriptionEs : currentProject.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                        {t("projects.highlights")}
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {(locale === "es"
                          ? currentProject.highlightsEs
                          : currentProject.highlights
                        ).map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2
                              size={13}
                              className="text-accent mt-0.5 flex-shrink-0"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
                        {t("projects.builtWith")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-5 border-t border-border/40">
                        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                          {t("projects.role")}
                        </p>
                        <p className="text-sm text-text font-medium">
                          {locale === "es" ? currentProject.roleEs : currentProject.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {hasMultipleProjects && (
                <button
                  type="button"
                  onClick={goToNextProject}
                  aria-label={locale === "es" ? "Proyecto siguiente" : "Next project"}
                  className="absolute right-0 top-1/2 z-10 hidden h-14 w-14 translate-x-[85%] -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-bg/95 text-white shadow-lg backdrop-blur hover:border-accent hover:text-accent transition-all md:flex"
                >
                  <ChevronRight size={26} />
                </button>
              )}
            </div>

            {hasMultipleProjects && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousProject}
                  aria-label={locale === "es" ? "Proyecto anterior" : "Previous project"}
                  className="flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-white/80 text-white hover:border-accent hover:text-accent transition-all"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="flex items-center gap-2">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveProject(index)}
                      aria-label={
                        locale === "es"
                          ? `Ver proyecto ${index + 1}: ${project.titleEs}`
                          : `View project ${index + 1}: ${project.title}`
                      }
                      aria-current={activeProject === index ? "true" : undefined}
                      className={clsx(
                        "h-3 rounded-full border transition-all",
                        activeProject === index
                          ? "w-9 border-accent bg-accent"
                          : "w-3 border-white/80 bg-transparent hover:bg-white/40"
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goToNextProject}
                  aria-label={locale === "es" ? "Proyecto siguiente" : "Next project"}
                  className="flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-white/80 text-white hover:border-accent hover:text-accent transition-all"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
