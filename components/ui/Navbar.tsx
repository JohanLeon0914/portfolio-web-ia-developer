"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { Menu, X, Download } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.certificates", href: "#certificates" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Find active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-accent">J</span>
            <span className="text-text">L</span>
            <span className="text-muted">.</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ key, href }) => {
              const sectionId = href.slice(1);
              return (
                <li key={key}>
                  <a
                    href={href}
                    className={clsx(
                      "px-3 py-1.5 rounded text-sm font-body transition-colors animated-underline",
                      activeSection === sectionId
                        ? "text-accent"
                        : "text-muted hover:text-text"
                    )}
                  >
                    {t(key)}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Lang Toggle */}
            <button
              onClick={toggleLocale}
              className="font-mono text-xs px-3 py-1.5 rounded border border-border text-muted hover:text-accent hover:border-accent/40 transition-all"
              aria-label="Toggle language"
            >
              {locale === "en" ? "ES" : "EN"}
            </button>

            {/* Download CV */}
            <a
              href="/cv/Johan_Alberto_Leon_Desarrollador_Web_EN.pdf"
              download
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded border border-accent/30 text-accent text-sm font-medium hover:bg-accent/10 transition-all btn-shine"
            >
              <Download size={13} />
              {t("nav.downloadCV")}
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-muted hover:text-text transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col pt-20 px-6 pb-10 md:hidden">
          <ul className="flex flex-col gap-1 mt-4">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="block py-3 px-4 text-lg font-display font-medium text-muted hover:text-accent transition-colors border-b border-border"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/cv/Johan_Alberto_Leon_Desarrollador_Web_EN.pdf"
            download
            className="mt-6 flex items-center justify-center gap-2 py-3 rounded-lg border border-accent/30 text-accent font-medium hover:bg-accent/10 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            <Download size={16} />
            {t("nav.downloadCV")}
          </a>
        </div>
      )}
    </>
  );
}
