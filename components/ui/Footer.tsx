"use client";

import { useI18n } from "@/i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
        <p>
          {t("footer.made")}{" "}
          <span className="text-accent font-semibold">Johan León</span>
        </p>
        <p>
          © {year} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
