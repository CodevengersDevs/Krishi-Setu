import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { useI18n } from "@/i18n";

export default function Index() {
  const { t } = useI18n();
  const steps = [
    { tKey: "how_1_t", dKey: "how_1_d", icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 4h16v4H4zM4 10h16v10H4z" opacity=".15"/><path d="M20 3H4a1 1 0 0 0-1 1v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1Zm-1 7H5V5h14v5Z"/></svg>
    )},
    { tKey: "how_2_t", dKey: "how_2_d", icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15-4-4 1.41-1.41L13 13.17l3.59-3.58L18 11Z"/></svg>
    )},
    { tKey: "how_3_t", dKey: "how_3_d", icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 13h4v8H3zm7-6h4v14h-4zM17 9h4v12h-4z"/></svg>
    )},
    { tKey: "how_4_t", dKey: "how_4_d", icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 11l3 3L22 4l-2-2-8 8-3-3-9 9 2 2z"/></svg>
    )},
  ];

  return (
    <Layout>
      <section className="section hero">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">{t("home_title")}</h1>
            <p className="hero-sub">{t("home_sub")}</p>
            <div className="mt-6 flex gap-8 wrap">
              <Link to="/dashboard" className="btn btn-primary">{t("home_open")}</Link>
              <a href="#how-it-works" className="nav-link">{t("home_examples")}</a>
            </div>
            <div className="hero-stats">
              <span>{t("home_stat1")}</span>
              <span>{t("home_stat2")}</span>
              <span>{t("home_stat3")}</span>
            </div>
          </div>
          <div>
            <div className="media"><div className="media-ratio" /></div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <h2 style={{fontWeight:700, fontSize:24}}>{t("how_title")}</h2>
          <div className="mt-8 cards">
            {steps.map((s, idx) => (
              <div key={idx} className="card">
                <div className="card-icon">{s.icon}</div>
                <h3 style={{marginTop:16, fontWeight:600}}>{t(s.tKey)}</h3>
                <p className="hint" style={{marginTop:8}}>{t(s.dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="card">
            <h3 style={{fontWeight:600}}>{t("see_title")}</h3>
            <div className="mt-6 flex gap-8 wrap">
              <span className="badge">{t("see_a")}</span>
              <span className="badge">{t("see_b")}</span>
              <span className="badge">{t("see_c")}</span>
            </div>
          </div>
          <div className="card">
            <h3 style={{fontWeight:600}}>{t("why_title")}</h3>
            <div className="mt-6 two-col" style={{gridTemplateColumns:'1fr 1fr'}}>
              {["why_a","why_b","why_c","why_d"].map(k => (
                <div key={k} className="badge">{t(k)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-12">
        <div className="cta">
          <div className="max">
            <h3>{t("cta_title")}</h3>
            <p>{t("cta_sub")}</p>
          </div>
          <Link to="/dashboard" className="btn btn-primary cta-action">{t("home_open")}</Link>
        </div>
      </section>
    </Layout>
  );
}
