import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-link` + (isActive ? " active" : "")}>{children}</Link>
  );
}

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-badge">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 22a1 1 0 0 1-1-1v-6.28A7.002 7.002 0 0 1 4 8a1 1 0 0 1 1-1c3.866 0 7 3.134 7 7V21a1 1 0 0 1-1 1Zm7-16c-4.418 0-8 3.582-8 8a1 1 0 0 0 2 0 6 6 0 0 1 6-6 1 1 0 1 0 0-2Z"/></svg>
          </span>
          <span>{t("brand")}</span>
        </Link>
        <nav className="nav">
          <a href="/#how-it-works" className="nav-link">{t("nav_how")}</a>
          <NavLink to="/faq">{t("nav_faq")}</NavLink>
          <button onClick={()=>setLang(lang === "en" ? "hi" : "en")} className="btn btn-soft" aria-label="Toggle language">
            {lang === "en" ? t("toggle_hi") : t("toggle_en")}
          </button>
          <Link to="/dashboard" className="btn btn-primary">{t("nav_open")}</Link>
        </nav>
      </div>
    </header>
  );
}
