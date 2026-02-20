"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export default function Contact() {
  const { t } = useI18n();
  const { ref, visible } = useScrollReveal();

  const links = [
    {
      icon: Mail,
      label: t("contact.email"),
      href: "mailto:johanleon991@gmail.com",
      value: "johanleon991@gmail.com",
      color: "text-accent-3",
      bg: "bg-accent-3/10 border-accent-3/20 hover:bg-accent-3/20",
    },
    {
      icon: Linkedin,
      label: t("contact.linkedin"),
      href: "https://www.linkedin.com/in/johan-alberto-leon-18b688229/",
      value: "linkedin.com/in/johan-alberto-leon-18b688229/",
      color: "text-accent-2",
      bg: "bg-accent-2/10 border-accent-2/20 hover:bg-accent-2/20",
    },
    {
      icon: Github,
      label: t("contact.github"),
      href: "https://github.com/JohanLeon0914",
      value: "github.com/JohanLeon0914",
      color: "text-accent",
      bg: "bg-accent/10 border-accent/20 hover:bg-accent/20",
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 bg-surface/40">
      <div
        ref={ref}
        className={clsx("max-w-3xl mx-auto text-center section-reveal", visible && "visible")}
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-xs text-accent-2 tracking-widest uppercase">
            {t("sectionLabels.contact")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-bold text-text mb-4 leading-tight">
          {t("contact.title")}
        </h2>
        <p className="text-muted text-lg mb-14">{t("contact.subtitle")}</p>

        {/* Contact cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map(({ icon: Icon, label, href, value, color, bg }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={clsx(
                "group flex items-center gap-3 p-5 rounded-xl border transition-all card-hover flex-1 sm:max-w-[220px]",
                bg
              )}
            >
              <div className={clsx("p-2 rounded-lg bg-bg/50", color)}>
                <Icon size={18} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs text-muted font-mono">{label}</p>
                <p className={clsx("text-sm font-medium truncate", color)}>{value}</p>
              </div>
              <ArrowUpRight size={14} className={clsx("ml-auto opacity-0 group-hover:opacity-100 transition-opacity", color)} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
