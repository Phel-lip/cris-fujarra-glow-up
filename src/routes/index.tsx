import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ArrowRight, MapPin, Instagram, ChevronDown, Menu, X, ExternalLink, MessageCircle } from "lucide-react";
import { SALON, MARQUEE_ITEMS } from "@/lib/salon";
import { BookingModal } from "@/components/BookingModal";
import { ServicesSection } from "@/components/ServicesSection";
import before from "@/assets/hair-before.png";
import after from "@/assets/hair-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cris Fujarra Estúdio de Beleza — Joinville/SC | Dia da noiva, cabelos e maquiagem" },
      { name: "description", content: "Estúdio de Beleza Cris Fujarra em Joinville/SC: dia da noiva, debutantes, penteados, maquiagem, terapia capilar e unhas. Solicite seu horário pelo WhatsApp." },
      { property: "og:title", content: "Cris Fujarra Estúdio de Beleza — Joinville/SC" },
      { property: "og:description", content: "Dia da noiva, penteados, maquiagem, terapia capilar e unhas. Veja trabalhos reais do estúdio e solicite seu horário." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["Serviços", "#servicos"], ["Resultados", "#antes-depois"], ["Avaliações", "#avaliacoes"], ["Dúvidas", "#faq"]];

function Index() {
  const [modal, setModal] = useState<{ open: boolean; service: string | null }>({ open: false, service: null });
  const book = (service: string | null = null) => setModal({ open: true, service });
  const close = useCallback(() => setModal({ open: false, service: null }), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header onBook={() => book()} />
      <Hero onBook={() => book()} />
      <ServiceMarquee />
      <ServicesSection onBook={book} />
      <BeforeAfter />
      <Reviews />
      <Faq />
      <Footer />
      {modal.open && <BookingModal open initialService={modal.service} onClose={close} />}
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label={SALON.name}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold font-display text-base tracking-tight text-gold">CF</span>
      <span className="leading-none">
        <span className="block font-script text-3xl text-primary">Cris Fujarra</span>
        <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">estúdio de beleza</span>
      </span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onBook} className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:px-5">Solicitar horário</button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="grid border-t px-5 py-2 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sand blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> {SALON.city}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            A beleza do seu grande dia, <em className="text-brand">do jeito que você sonhou.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Penteados, maquiagem, dia da noiva e terapia capilar em um estúdio exclusivo em Joinville — cuidado personalizado da avaliação ao grande dia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBook} className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
              Solicitar horário <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#servicos" className="rounded-full border bg-card px-7 py-3.5 font-medium transition hover:border-primary">Ver serviços</a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><Instagram className="h-4 w-4 text-primary" /> {SALON.instagramHandle}</p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-brand opacity-90" />
          <img src={SALON.heroImg} alt="Debutante com penteado e tiara produzidos pelo estúdio Cris Fujarra" className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover object-top shadow-soft" />
        </div>
      </div>
    </section>
  );
}

function ServiceMarquee() {
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-cocoa py-3.5 text-cocoa-foreground md:py-[18px]" aria-label="Serviços do estúdio">
      <div className="marquee-track flex w-max font-display text-xl uppercase tracking-[0.14em] sm:text-2xl">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="flex shrink-0 items-center gap-7">
                <span>{item}</span>
                <span className="text-gold" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section id="antes-depois" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <SectionTitle eyebrow="Antes e depois" title={<>Fios com mais brilho, <em className="text-brand">maciez e movimento.</em></>} sub="Um exemplo de transformação e o que as clientes falam depois — a prova que ajuda quem chega a decidir mais rápido." />
        <figure>
          <div className="relative aspect-square w-full select-none overflow-hidden rounded-3xl shadow-soft">
            <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
            <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-soft">⇆</div>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-cocoa/80 px-3 py-1 text-xs text-cocoa-foreground">Antes</span>
            <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Depois</span>
            <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0" />
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted-foreground">Exemplo de transformação</figcaption>
        </figure>
      </div>
    </section>
  );
}

const FAQ = [
  ["Quais serviços o estúdio oferece?", "Cris Fujarra é cabeleireira, maquiadora e terapeuta capilar: penteados, maquiagem, dia da noiva e debutantes, terapia capilar com avaliação do couro cabeludo, além de pedicure. Cada serviço está detalhado nos cards acima."],
  ["O que é a terapia capilar?", "É um tratamento personalizado, feito a partir da avaliação do couro cabeludo e da fibra capilar, com técnicas e produtos específicos para cada necessidade — como queda, oleosidade, inflamação e enfraquecimento dos fios. A avaliação é agendada pelo WhatsApp."],
  ["Como funciona o dia da noiva?", "Cris e a equipe cuidam da beleza completa da noiva, das madrinhas e da família — incluindo a maquiagem do noivo. Os detalhes, o cronograma e os valores são combinados com antecedência, com a calma que o grande dia merece."],
  ["Como solicito um horário?", "Você escolhe o serviço e, se quiser, uma data, um período e uma observação. No final, o WhatsApp abre com a mensagem pronta — o envio é feito por você, e o estúdio confirma a disponibilidade com você por lá."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="divide-y rounded-3xl border bg-card">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p id={`faq-answer-${i}`} className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Real, public Google reviews of Cris Fujarra (4.9 of 5, 64 reviews on the profile).
const REVIEWS = [
  { text: "A Cris me atendeu já fazem dois anos… e como noiva posso dizer, foi minha melhor escolha. Teve uma sensibilidade gigante, uma equipe excelente e estava o tempo todo de bom humor. Obrigada por ter participado de um momento tão lindo na minha vida!", origin: "Adrielle Ariosi Iwai" },
  { text: "Cris é uma profissional excelente, com um dom maravilhoso em embelezar ainda mais as mulheres, possui um espaço lindo e muito aconchegante.", origin: "Jéssica Alves" },
];

function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-20 bg-cocoa py-16 text-cocoa-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Avaliações</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">O que as clientes <em>contam.</em></h2>
          <p className="mt-3 text-sm opacity-75">Avaliações públicas do perfil do Google do estúdio.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.origin} className="rounded-3xl border border-cocoa-foreground/20 bg-cocoa-foreground/5 p-6">
              <span className="inline-block rounded-full border border-gold/50 px-3 py-1 text-[11px] uppercase tracking-wider text-gold">Google</span>
              <blockquote className="mt-5 text-sm leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-wider opacity-60">{r.origin}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs opacity-60">Nota 4,9 de 5 · 64 avaliações no perfil do Google do estúdio.</p>
        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-gold/40 bg-cocoa-foreground/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl leading-snug">Atendida pelo estúdio?</p>
            <p className="mt-1 text-sm opacity-75">Deixe sua avaliação no Google — leva menos de um minuto e ajuda outras clientes a encontrarem a Cris.</p>
          </div>
          <a href={SALON.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-cocoa transition hover:opacity-90">
            Avaliar no Google <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-cocoa text-cocoa-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-script text-4xl text-gold">Cris Fujarra</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] opacity-75">Estúdio de Beleza</p>
        </div>
        <p className="flex gap-3 text-sm"><MapPin className="h-4 w-4 shrink-0 text-gold" />{SALON.address}<br />{SALON.city}</p>
        <nav className="grid gap-2 text-sm">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-gold">{l}</a>)}</nav>
        <div className="grid gap-3 text-sm">
          <a href={`https://wa.me/${SALON.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold"><MessageCircle className="h-4 w-4 shrink-0 text-gold" />WhatsApp {SALON.whatsappLabel}</a>
          <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold"><Instagram className="h-4 w-4 shrink-0 text-gold" />{SALON.instagramHandle} <ExternalLink className="h-3 w-3" /></a>
        </div>
      </div>
      <p className="border-t border-cocoa-foreground/15 py-5 text-center text-xs opacity-70">© {SALON.name} · {SALON.tagline}</p>
    </footer>
  );
}
