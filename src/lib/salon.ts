import hero from "@/assets/cf-hero.jpg";
import terapiaCapilar from "@/assets/svc-terapia-capilar.jpg";
import oleoterapia from "@/assets/svc-oleoterapia.jpg";
import penteado from "@/assets/svc-penteado.jpg";
import diaDaNoiva from "@/assets/svc-dia-da-noiva.jpg";
import debutante from "@/assets/svc-debutante.jpg";
import maquiagem from "@/assets/svc-maquiagem.jpg";
import pedicure from "@/assets/svc-pedicure.jpg";
import producao from "@/assets/svc-producao.jpg";

// Single source of truth for the salon's details.
// Name, specialties, secondary profile and address: Instagram bio (@crisfujarra).
// Address cross-checked with the Google business profile (R. São Paulo, 910 — Sala 302,
// Joinville/SC). Hours shown on Google: Tue–Thu 13:30–18, Fri 9–18, Sat 9–17.
export const SALON = {
  name: "Cris Fujarra",
  tagline: "Estúdio de Beleza",
  city: "Joinville · SC",
  address: "Rua São Paulo, 910 — Sala 302 · Prédio Smart Tower",
  whatsapp: "5547988210962",
  whatsappLabel: "(47) 98821-0962",
  instagram: "https://www.instagram.com/crisfujarra/",
  instagramHandle: "@crisfujarra",
  heroImg: hero,
};

const IG = "https://www.instagram.com/crisfujarra";
const SAMARA = "https://www.instagram.com/samarapessoamakeup";

export type Category = "Cabelos" | "Tratamentos" | "Noivas & Festa" | "Unhas";

export type Service = {
  id: string;
  title: string;
  category: Category;
  copy: string;
  cta: string;
  img: string;
  pros: string[];
  source: string;
  alt: string;
};

// No team members besides Cris are named in public sources, so the professional
// step is skipped and requests go to the studio as a whole.
const PRO: string[] = [];

export const SERVICES: Service[] = [
  { id: "terapia-capilar", title: "Terapia capilar", category: "Tratamentos", copy: "Tratamento personalizado a partir da avaliação do couro cabeludo e da fibra capilar, com técnicas e produtos específicos para cada necessidade.", cta: "Solicitar avaliação", img: terapiaCapilar, alt: "Aplicação de tratamento capilar no estúdio Cris Fujarra", pros: PRO, source: `${IG}/reel/DeKTk0ltvSa/` },
  { id: "oleoterapia", title: "Cuidado do couro cabeludo", category: "Tratamentos", copy: "Protocolos individualizados — como a óleoterapia — pensados para o conforto, a hidratação e a saúde do couro cabeludo.", cta: "Solicitar avaliação", img: oleoterapia, alt: "Aplicação de óleo no couro cabeludo durante tratamento", pros: PRO, source: `${IG}/reel/Dd9UV_CtUZM/` },
  { id: "penteados", title: "Penteados", category: "Cabelos", copy: "Penteados para noivas, debutantes, madrinhas e convidadas, com acabamento impecável para o grande dia.", cta: "Solicitar penteado", img: penteado, alt: "Clientes com penteados e trajes de festa feitos pelo estúdio", pros: PRO, source: `${IG}/reel/DdjwgtaJN_9/` },
  { id: "dia-da-noiva", title: "Dia da noiva", category: "Noivas & Festa", copy: "Beleza completa para o casamento: cabelo, maquiagem e produção pensados em cada detalhe, do primeiro contato ao grande dia.", cta: "Solicitar dia da noiva", img: diaDaNoiva, alt: "Noiva produzida pela equipe Cris Fujarra no dia do casamento", pros: PRO, source: `${IG}/reel/DdjxTRfJAkr/` },
  { id: "debutante", title: "Debutantes & 15 anos", category: "Noivas & Festa", copy: "Penteado e produção à altura da festa, para a debutante viver a noite que sempre sonhou com elegância.", cta: "Solicitar produção", img: debutante, alt: "Debutante com penteado e tiara produzida pelo estúdio", pros: PRO, source: `${SAMARA}/p/DdZ_C9QFP7O/` },
  { id: "maquiagem", title: "Maquiagem", category: "Noivas & Festa", copy: "Maquiagem para festas, formaturas e casamentos — incluindo um cuidado especial com o noivo no grande dia.", cta: "Solicitar maquiagem", img: maquiagem, alt: "Maquiadora aplicando maquiagem em noiva", pros: PRO, source: `${IG}/reel/DdZBUbwN0xV/` },
  { id: "pedicure", title: "Pedicure", category: "Unhas", copy: "Cuidado completo para os pés, com acabamento impecável e aquele toque especial que faz toda a diferença.", cta: "Solicitar pedicure", img: pedicure, alt: "Pedicure com acabamento impecável no estúdio", pros: PRO, source: `${IG}/reel/Dd4LHZ6t0tS/` },
  { id: "producao-eventos", title: "Produção para eventos", category: "Noivas & Festa", copy: "Produção de beleza onde o evento acontecer: cabelo e maquiagem para festas, formaturas e cerimônias.", cta: "Solicitar produção", img: producao, alt: "Finalização de penteado em cliente com vestido de festa", pros: PRO, source: `${IG}/reel/DeSdvDktCeg/` },
];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Noivas & Festa", "Cabelos", "Tratamentos", "Unhas"];
export const MARQUEE_ITEMS = ["DIA DA NOIVA", "MAQUIAGEM", "PENTeados", "TERAPIA CAPILAR", "DEBUTANTES", "PEDICURE", "PRODUÇÃO", "CASAMENTOS"];
// Opening hours are verified on the Google profile but not shown verbatim; the
// booking flow only collects generic period preferences.
export const PERIODS = ["Manhã", "Tarde", "Fim da tarde"];
export const NO_PREF = "Sem preferência";

export function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function todayLocal(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function buildWhatsAppUrl(o: { service: string; pro: string; date: string; period: string; notes: string }) {
  const lines = [
    `Olá, Cris Fujarra! Gostaria de solicitar um horário:`,
    ``,
    `• Serviço: ${o.service}`,
    ...(o.pro && o.pro !== NO_PREF ? [`• Profissional: ${o.pro}`] : []),
    `• Data preferida: ${fmtDate(o.date)}`,
    `• Período preferido: ${o.period || "A combinar"}`,
    ...(o.notes.trim() ? [`• Observação: ${o.notes.trim()}`] : []),
    ``,
    `Aguardo a confirmação da disponibilidade.`,
  ];
  return `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
