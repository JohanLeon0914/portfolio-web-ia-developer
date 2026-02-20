"use client";

import { useI18n } from "@/i18n";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";

export default function Hero() {
  const { t, locale } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Radial glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #6EE7B7 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #818CF8 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-mono mb-8"
          style={{ animation: "fadeIn 0.5s ease forwards" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          {t("hero.available")}
        </div>

        {/* Greeting */}
        <p
          className="text-muted font-body text-lg mb-2"
          style={{ animation: "slideUp 0.6s ease 0.1s both" }}
        >
          {t("hero.greeting")}
        </p>

        {/* Name */}
        <h1
          className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 leading-none"
          style={{ animation: "slideUp 0.6s ease 0.2s both" }}
        >
          <span className="text-text">Johan</span>
          <br />
          <span className="gradient-text">León</span>
        </h1>

        {/* Role */}
        <p
          className="font-display text-xl md:text-2xl font-medium text-muted mt-4 mb-8"
          style={{ animation: "slideUp 0.6s ease 0.3s both" }}
        >
          Full Stack Web Developer
          <span className="mx-3 text-border">·</span>
          <span className="text-accent-2 font-mono text-base md:text-lg">Google Cloud + AI</span>
        </p>

        {/* Bio */}
        <p
          className="max-w-xl mx-auto text-muted text-base md:text-lg leading-relaxed mb-12"
          style={{ animation: "slideUp 0.6s ease 0.4s both" }}
        >
          {locale === "en"
            ? "Building enterprise applications with cloud-based solutions, AI integration and clean, scalable code."
            : "Construyendo aplicaciones empresariales con soluciones cloud, integración de IA y código limpio y escalable."}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ animation: "slideUp 0.6s ease 0.5s both" }}
        >
          <a
            href="#projects"
            className="btn-shine inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-accent text-bg font-display font-semibold text-sm hover:bg-accent/90 transition-all"
          >
            <Sparkles size={15} />
            {t("hero.cta")}
          </a>
          <a
            href="#contact"
            className="btn-shine inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-border text-text font-display font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all"
          >
            {t("hero.ctaContact")}
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-6"
          style={{ animation: "slideUp 0.6s ease 0.6s both" }}
        >
          <a
            href="https://github.com/JohanLeon0914"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/johan-alberto-leon-18b688229/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent-2 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:johanleon991@gmail.com"
            className="text-muted hover:text-accent-3 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
