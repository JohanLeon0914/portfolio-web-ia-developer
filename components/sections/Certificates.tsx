"use client";

import { useI18n } from "@/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useRef } from "react";
import { Award, Clock, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === "left" ? -300 : 300;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const slider = carouselRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const scrollWidth = slider.scrollWidth;
      const clientWidth = slider.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const currentPosition = Math.round((scrollLeft / maxScroll) * 100);
      setScrollPosition(currentPosition);
    };

    slider.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, [filtered]);

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

        {/* Carousel */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-2 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={(e) => {
              const slider = carouselRef.current;
              if (!slider) return;
              
              const startX = e.pageX - slider.offsetLeft;
              const scrollLeft = slider.scrollLeft;
              
              const handleMouseMove = (e: MouseEvent) => {
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                slider.classList.remove('active:cursor-grabbing');
                slider.classList.add('cursor-grab');
              };
              
              slider.classList.add('active:cursor-grabbing');
              slider.classList.remove('cursor-grab');
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            {/* Navigation buttons - positioned at card height */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center z-10 pointer-events-none">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2 rounded-full border border-border bg-surface/90 backdrop-blur-sm hover:border-accent hover:text-accent transition-all pointer-events-auto"
                aria-label="Previous certificates"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            
            <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center z-10 pointer-events-none">
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2 rounded-full border border-border bg-surface/90 backdrop-blur-sm hover:border-accent hover:text-accent transition-all pointer-events-auto"
                aria-label="Next certificates"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            {filtered.map((cert, i) => (
              <a
                key={cert.id}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl border border-border bg-surface card-hover flex flex-col gap-3 flex-shrink-0 w-80"
                style={{ 
                  animationDelay: `${i * 0.05}s`,
                  minWidth: '320px'
                }}
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
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-300 ease-out"
                  style={{ width: `${scrollPosition}%` }}
                />
              </div>
              </div>
            </div>
          </div>

      </div>
    </section>
  );
}
