import { Layout } from "@/components/site/Layout";
import { useI18n } from "@/i18n";

export default function FAQ() {
  const { t } = useI18n();
  const qs = [t("faq_q1"), t("faq_q2"), t("faq_q3"), t("faq_q4")];
  return (
    <Layout>
      <section className="section">
        <div className="container two-col" style={{gridTemplateColumns:'2fr 1fr'}}>
          <div>
            <h1 style={{fontSize:28, fontWeight:700}}>{t("faq_title")}</h1>
            <p className="hero-sub">{t("faq_sub")}</p>
            <div className="mt-8" style={{display:'grid', gap:16}}>
              {qs.map(q=> (
                <div key={q} className="card">
                  <h3 style={{fontWeight:600}}>{q}</h3>
                  <p className="hint" style={{marginTop:8}}>{t("faq_sub")}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="card" style={{background:"hsl(var(--secondary))"}}>
            <h3 style={{fontWeight:600}}>{t("submit_q")}</h3>
            <form className="mt-6" style={{display:'grid', gap:12}}>
              <input placeholder={t("your_name")} className="input" />
              <input placeholder={t("email")} className="input" />
              <textarea placeholder={t("your_q")} className="textarea" style={{height:120}} />
              <button type="button" className="btn btn-primary">{t("send_q")}</button>
            </form>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
