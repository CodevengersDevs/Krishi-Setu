import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, string>;

type I18nShape = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const en: Dict = {
  brand: "Krishi Setu",
  nav_how: "How it works",
  nav_faq: "FAQ",
  nav_open: "Open Dashboard",
  toggle_en: "EN",
  toggle_hi: "हिं",

  home_title: "Clear, practical crop guidance",
  home_sub: "Simple inputs. Straightforward recommendations. Built to help you decide what to plant and how to manage it this season.",
  home_open: "Open Recommendation Dashboard",
  home_examples: "See example results",
  home_stat1: "500+ farmers using it",
  home_stat2: "12 regions covered",
  home_stat3: "Avg. +18% yield",
  how_title: "How it works",
  how_1_t: "Tell us about your field",
  how_1_d: "Soil type, water source, farm size, and experience level. Takes under a minute.",
  how_2_t: "We match what fits",
  how_2_d: "We compare your inputs with local conditions and common practices.",
  how_3_t: "Get 3–6 crop options",
  how_3_d: "Each option includes expected yield, costs, and time to harvest.",
  how_4_t: "Follow the action list",
  how_4_d: "Simple steps for seed, nutrients, and irrigation, tailored to your context.",
  see_title: "What you’ll see",
  see_a: "Low water risk",
  see_b: "Season window: 110–120d",
  see_c: "Costs: $150–260/acre",
  why_title: "Why farmers use it",
  why_a: "Faster decisions",
  why_b: "Clear next steps",
  why_c: "No jargon",
  why_d: "Saves inputs",
  cta_title: "Try it on your field",
  cta_sub: "Open the dashboard and get recommendations in minutes.",

  dash_title: "Recommendation Dashboard",
  dash_sub: "Provide your farm context to get crop and action recommendations. This is a demo with mock outputs.",
  form_title: "Input Form",
  soil: "Soil Type",
  water: "Water Source",
  coast: "Proximity to Coastline",
  size: "Land Holding Size (acres)",
  experience: "Experience Level",
  get_reco: "Get Recommendations",
  reset: "Reset",
  form_hint: "Choose closest match: clay, sandy loam, silt, peat, chalk, loam.",
  suggested: "6 suggested crops",
  salinity: "Low salinity risk",
  water_index: "Adequate water index",
  rec_title: "Recommended Crops & Actions",
  rec_sub: "Mock results based on your inputs. Use cards for clarity and a mini chart for seasonality.",
  see_actions: "See actions",
  yield: "Expected yield",
  cost: "Cost/acre",
  time: "Time to harvest",
  empty_state: "Fill the form and click “Get Recommendations” to see mock outputs here.",

  faq_title: "FAQs & Farmer Support",
  faq_sub: "Quick answers to common questions. This is a lightweight placeholder; we can expand it to match your full design next.",
  faq_q1: "How do I get crop recommendations without a soil test?",
  faq_q2: "Which regions are supported?",
  faq_q3: "Can I use my own seed and fertilizer brands?",
  faq_q4: "Do you work offline?",
  submit_q: "Submit a question",
  your_name: "Your name",
  email: "Email",
  your_q: "Type your question...",
  send_q: "Send question (demo)",
  footer_stats_a: "2.5M acres analyzed",
  footer_stats_b: "-12% input cost",
  footer_stats_c: "5 min to first result",
};

const hi: Dict = {
  brand: "एग्रोगाइड",
  nav_how: "कैसे काम करता है",
  nav_faq: "सहायता",
  nav_open: "डैशबोर्ड खोलें",
  toggle_en: "EN",
  toggle_hi: "हिं",

  home_title: "स्पष्ट, व्यावहारिक फ़सल मार्गदर्शन",
  home_sub: "सरल इनपुट। सीधे सुझाव। इस मौसम में क्या बोना है और कैसे प्रबंधन करना है, यह तय करने में मदद के लिए।",
  home_open: "सिफ़ारिश डैशबोर्ड खोलें",
  home_examples: "नमूना परिणाम देखें",
  home_stat1: "500+ किसान उपयोग कर रहे हैं",
  home_stat2: "12 क्षेत्र कवर",
  home_stat3: "औसत +18% उपज",
  how_title: "कैसे काम करता है",
  how_1_t: "अपने खेत के बारे में बताएं",
  how_1_d: "मिट्टी प्रकार, जल स्रोत, फ़ार्म आकार और अनुभव स्तर। एक मिनट से कम समय।",
  how_2_t: "जो उपयुक्त है उससे मिलान",
  how_2_d: "हम आपके इनपुट का स्थानीय परिस्थितियों और सामान्य प्रथाओं से मिलान करते हैं।",
  how_3_t: "3–6 फ़सल विकल्प प्राप्त करें",
  how_3_d: "हर विकल्प में अपेक्षित उपज, लागत और कटाई का समय शामिल है।",
  how_4_t: "कार्य सूची का पालन करें",
  how_4_d: "बीज, पोषक तत्व और सिंचाई के सरल कदम—आपके संदर्भ के अनुसार।",
  see_title: "आप क्या देखेंगे",
  see_a: "कम जल जोखिम",
  see_b: "सीज़न विंडो: 110–120 दिन",
  see_c: "लागत: $150–260/एकड़",
  why_title: "किसान क्यों उपयोग करते हैं",
  why_a: "तेज़ निर्णय",
  why_b: "स्पष्ट अगले कदम",
  why_c: "बिना जार्गन",
  why_d: "इनपुट की बचत",
  cta_title: "अपने खेत पर आज़माएँ",
  cta_sub: "डैशबोर्ड खोलें और मिनटों में सिफ़ारिशें प्��ाप्त करें।",

  dash_title: "सिफ़ारिश डैशबोर्ड",
  dash_sub: "अपने खेत का संदर्भ दें और फ़सल/कार्य सिफ़ारिशें पाएं। यह डेमो है जिसमें नकली आउटपुट हैं।",
  form_title: "इनपुट फ़ॉर्म",
  soil: "मिट्टी प्रकार",
  water: "जल स्रोत",
  coast: "समुद्र तट के नज़दीक",
  size: "जमीन का आकार (एकड़)",
  experience: "अनुभव स्तर",
  get_reco: "सिफ़ारिशें प्राप्त करें",
  reset: "रीसेट",
  form_hint: "सबसे नज़दीकी मिलान चुनें: क्ले, सैंडी लोम, सिल्ट, पीट, चॉक, लोम।",
  suggested: "6 सुझाई गई फ़सलें",
  salinity: "कम लवणता जोखिम",
  water_index: "पर्याप्त जल सूचकांक",
  rec_title: "अनुशंसित फ़सलें और कार्रवाइयाँ",
  rec_sub: "आपके इनपुट पर आधारित न���ली परिणाम। स्पष्टता के लिए कार्ड उपयोग करें।",
  see_actions: "कार्रवाइयाँ देखें",
  yield: "अपेक्षित उपज",
  cost: "लागत/एकड़",
  time: "कटाई तक समय",
  empty_state: "फॉर्म भरें और “सिफ़ारिशें प्राप्त करें” पर क्लिक करें—परिणाम यहाँ दिखेंगे।",

  faq_title: "सामान्य प्रश्न और सहायता",
  faq_sub: "आम सवालों के त्वरित उत्तर। यह हल्का प्लेसहोल्डर है; हम बाद में पूरा करेंगे।",
  faq_q1: "बिना मृदा परीक्षण के सिफ़ारिशें कैसे मिलें?",
  faq_q2: "कौन से क्षेत्र समर्थित हैं?",
  faq_q3: "क्या मैं अपने ब्रांड के बीज/उर्वरक उपयोग कर सकता/सकती हूँ?",
  faq_q4: "क्या आप ऑफ़लाइन काम करते हैं?",
  submit_q: "सवाल भेजें",
  your_name: "आपका नाम",
  email: "ईमेल",
  your_q: "अपना सवाल लिखें...",
  send_q: "सवाल भेजें (डेमो)",
  footer_stats_a: "2.5M एकड़ विश्लेषित",
  footer_stats_b: "-12% इनपुट लागत",
  footer_stats_c: "पहला परिणाम 5 मिनट में",
};

const I18nContext = createContext<I18nShape>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const dict = lang === "hi" ? hi : en;
  const t = useMemo(() => (key: string) => dict[key] ?? key, [dict]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }
