"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface Skill {
  name: string;
  level: number;
}
interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  cloud: Skill[];
  tools: Skill[];
}

export default function Skills() {
  const { t } = useI18n();
  const { ref, visible } = useScrollReveal();
  const [skills, setSkills] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch("/jsons/skills.json")
      .then((r) => r.json())
      .then(setSkills);
  }, []);

  const categories = skills
    ? [
        { label: t("skills.frontend"), data: skills.frontend, color: "accent" },
        { label: t("skills.backend"), data: skills.backend, color: "accent-2" },
        { label: t("skills.cloud"), data: skills.cloud, color: "accent-3" },
        { label: t("skills.tools"), data: skills.tools, color: "accent" },
      ]
    : [];

  return (
    <section id="skills" className="py-28 px-6 bg-surface/40">
      <div
        ref={ref}
        className={clsx("max-w-5xl mx-auto section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-accent-3 tracking-widest uppercase">
            {t("sectionLabels.skills")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">
          {t("skills.title")}
        </h2>
        <p className="text-muted mb-12">{t("skills.subtitle")}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map(({ label, data, color }) => (
            <div
              key={label}
              className="p-6 rounded-xl border border-border bg-surface card-hover"
            >
              <h3
                className={clsx(
                  "font-display font-semibold text-sm uppercase tracking-wider mb-6",
                  color === "accent" && "text-accent",
                  color === "accent-2" && "text-accent-2",
                  color === "accent-3" && "text-accent-3"
                )}
              >
                {label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.map((skill) => (
                  <span
                    key={skill.name}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105",
                      color === "accent" && "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20",
                      color === "accent-2" && "bg-accent-2/10 border-accent-2/30 text-accent-2 hover:bg-accent-2/20",
                      color === "accent-3" && "bg-accent-3/10 border-accent-3/30 text-accent-3 hover:bg-accent-3/20"
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
