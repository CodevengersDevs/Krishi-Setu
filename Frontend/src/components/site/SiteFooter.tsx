import { useI18n } from "@/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2025 {t("brand")}</p>
        <div className="flex gap-8 wrap">
          <span>{t("footer_stats_a")}</span>
          <span>{t("footer_stats_b")}</span>
          <span>{t("footer_stats_c")}</span>
        </div>
      </div>
    </footer>
  );
}