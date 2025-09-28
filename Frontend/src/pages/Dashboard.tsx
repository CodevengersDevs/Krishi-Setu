import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { useI18n } from "@/i18n";

const soilTypes = ["Sandy loam","Clay","Loam","Silt loam","Peat"];

export default function Dashboard() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    soil: soilTypes[0],
    water: "Borewell",
    coast: "Yes",
    size: "2.5",
    experience: "Intermediate",
  });
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setForm({ soil: soilTypes[0], water: "Borewell", coast: "Yes", size: "2.5", experience: "Intermediate" });
    setSubmitted(false);
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 style={{fontSize:28, fontWeight:700}}>{t("dash_title")}</h1>
          <p className="hero-sub" style={{maxWidth:720}}>{t("dash_sub")}</p>

          <div className="mt-8" style={{display:'grid', gridTemplateColumns:'1fr', gap:24} as React.CSSProperties}>
            <div className="two-col" style={{gridTemplateColumns:'380px 1fr'}}>
              {/* Left form */}
              <div className="card">
                <h2 style={{fontWeight:600}}>{t("form_title")}</h2>
                <div className="mt-6" style={{display:'grid', gap:16}}>
                  <div>
                    <label className="label">{t("soil")}</label>
                    <select value={form.soil} onChange={(e)=>setForm({...form, soil:e.target.value})} className="select mt-6">
                      {soilTypes.map(s=> <option key={s}>{s}</option>)}
                    </select>
                    <p className="hint">{t("form_hint")}</p>
                  </div>
                  <div>
                    <label className="label">{t("water")}</label>
                    <input value={form.water} onChange={(e)=>setForm({...form, water:e.target.value})} className="input" />
                  </div>
                  <div className="two-col" style={{gap:16}}>
                    <div>
                      <label className="label">{t("coast")}</label>
                      <select value={form.coast} onChange={(e)=>setForm({...form, coast:e.target.value})} className="select">
                        {['Yes','No'].map(v=> <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label">{t("size")}</label>
                      <input value={form.size} onChange={(e)=>setForm({...form, size:e.target.value})} className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="label">{t("experience")}</label>
                    <select value={form.experience} onChange={(e)=>setForm({...form, experience:e.target.value})} className="select">
                      {['Beginner','Intermediate','Advanced'].map(v=> <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-8">
                    <button onClick={()=>setSubmitted(true)} className="btn btn-primary">{t("get_reco")}</button>
                    <button onClick={reset} className="btn btn-soft">{t("reset")}</button>
                  </div>
                  <div className="hero-stats">
                    <span>{t("suggested")}</span>
                    <span>{t("salinity")}</span>
                    <span>{t("water_index")}</span>
                  </div>
                </div>
              </div>

              {/* Right results */}
              <div className="flex" style={{flexDirection:'column', gap:16}}>
                <div className="card" style={{background: `hsl(var(--secondary))`}}>
                  <h2 style={{fontWeight:600}}>{t("rec_title")}</h2>
                  <p className="hint">{t("rec_sub")}</p>
                </div>

                {(submitted ? [
                  {name:'Groundnut (Peanut)', yield:'2.1 t/ha', cost:'$220', time:'110–120d', note:t("see_a") + "."},
                  {name:'Green Gram (Moong)', yield:'1.0 t/ha', cost:'$150', time:'60–70d', note:t("why_d") + "."},
                  {name:'Maize', yield:'3.8 t/ha', cost:'$260', time:'100–120d', note:t("water_index") + "."}
                ] : []).map((c)=> (
                  <article key={c.name} className="card">
                    <div className="flex" style={{alignItems:'start', justifyContent:'space-between', gap:16}}>
                      <div>
                        <h3 style={{fontWeight:600}}>{c.name}</h3>
                        <p className="hint" style={{marginTop:4}}>{c.note}</p>
                      </div>
                      <button className="nav-link" style={{color:'hsl(var(--primary))'}}>{t("see_actions")}</button>
                    </div>
                    <div className="mt-6 two-col" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
                      <div>
                        <div className="hint">{t("yield")}</div>
                        <div style={{fontWeight:600}}>{c.yield}</div>
                      </div>
                      <div>
                        <div className="hint">{t("cost")}</div>
                        <div style={{fontWeight:600}}>{c.cost}</div>
                      </div>
                      <div>
                        <div className="hint">{t("time")}</div>
                        <div style={{fontWeight:600}}>{c.time}</div>
                      </div>
                    </div>
                  </article>
                ))}

                {!submitted && (
                  <div className="card text-center" style={{textAlign:'center', background:'hsla(0,0%,100%,0.6)'}}>
                    {t("empty_state")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
