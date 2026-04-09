 "use client";

import { useState, useEffect, useRef } from "react";

const beforeAfterCases = [
  {
    id: 1,
    category: "Harmonização Facial",
    before: "/before-1.png",
    after: "/after-1.jpeg",
    description: "Contorno facial e preenchimento",
  },
  {
    id: 2,
    category: "Preenchimento Labial",
    before: "/before-2.png",
    after: "/after-2.jpeg",
    description: "Volume e definição labial",
  },
  {
    id: 3,
    category: "Botox",
    before: "/before-3.png",
    after: "/after-3.png",
    description: "Suavização de linhas de expressão",
  },
  {
    id: 4,
    category: "Harmonização Facial",
    before: "/before-4.png",
    after: "/after-4.png",
    description: "Rejuvenescimento completo",
  },
];

const services = [
  {
    icon: "✦",
    title: "Harmonização Facial",
    description:
      "Técnica avançada que equilibra as proporções do rosto, realçando sua beleza natural com resultados harmônicos e elegantes.",
  },
  {
    icon: "◈",
    title: "Preenchimento Labial",
    description:
      "Volume e definição labial com ácido hialurônico, proporcionando lábios naturais, simétricos e com o contorno perfeito.",
  },
  {
    icon: "◇",
    title: "Botox — Toxina Botulínica",
    description:
      "Aplicação precisa de toxina botulínica para suavizar linhas de expressão e promover rejuvenescimento com naturalidade.",
  },
  {
    icon: "❋",
    title: "Fios de PDO",
    description:
      "Lifting sem bisturi com fios bioestimuladores que promovem a sustentação e renovação do colágeno da pele.",
  },
];

const testimonials = [
  {
    name: "Ana Carolina M.",
    text: "O Dr. Toledo transformou minha autoestima. O resultado do preenchimento labial ficou absolutamente natural, exatamente o que eu queria.",
    rating: 5,
  },
  {
    name: "Fernanda R.",
    text: "Profissional impecável. A harmonização facial que fiz ficou perfeita, muito sutil e elegante. Recomendo a todos!",
    rating: 5,
  },
  {
    name: "Juliana S.",
    text: "36 anos de experiência que se refletem em cada detalhe do atendimento. Me senti segura do início ao fim.",
    rating: 5,
  },
  {
    name: "Mariana L.",
    text: "O botox ficou incrível! Resultado natural, sem aquele aspecto congelado. Saí com uma aparência muito mais jovem e descansada.",
    rating: 5,
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updateSlider(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 cursor-col-resize overflow-hidden rounded-2xl select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      <div className="absolute inset-0 bg-stone-100">
        <img src={after} alt="Depois" className="w-full h-full object-cover" draggable={false} />
        <span className="absolute bottom-3 right-3 bg-[#b8860b] text-white text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
          Depois
        </span>
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <div className="absolute inset-0 bg-stone-200" style={{ width: `${100 / (sliderPos / 100)}%` }}>
          <img
            src={before}
            alt="Antes"
            className="w-full h-full object-cover"
            style={{ width: `${10000 / sliderPos}%`, maxWidth: "none" }}
            draggable={false}
          />
        </div>
        <span className="absolute bottom-3 left-3 bg-white/90 text-stone-600 text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
          Antes
        </span>
      </div>

      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${sliderPos}%` }}>
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-stone-200"
          onMouseDown={onMouseDown}
          onTouchStart={() => {}}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4L2 9L6 14" stroke="#b8860b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4L16 9L12 14" stroke="#b8860b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function DrToledoPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters = ["Todos", "Harmonização Facial", "Preenchimento Labial", "Botox"];
  const filtered =
    activeFilter === "Todos"
      ? beforeAfterCases
      : beforeAfterCases.filter((c) => c.category === activeFilter);

  return (
    <main className="bg-[#faf8f5] text-[#1a1a1a] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Jost', sans-serif; background: #faf8f5; }
        .font-display { font-family: 'Cormorant Garamond', serif; }

        .gold      { color: #b8860b; }
        .gold-bg   { background-color: #b8860b; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.9s ease forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(184,134,11,0.10); }

        .line-gold::after {
          content: '';
          display: block;
          width: 44px;
          height: 2px;
          background: #b8860b;
          margin: 12px auto 0;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <p className="font-display text-xl tracking-widest gold">Dr. Toledo</p>
            <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mt-0.5">Harmonização Orofacial</p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm tracking-widest text-stone-500 uppercase">
            {["Sobre", "Serviços", "Resultados", "Depoimentos", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#b8860b] transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/5517997743065?text=Olá%20Dr.%20Toledo,%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 border border-[#b8860b] text-[#b8860b] text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-[#b8860b] hover:text-white transition-all duration-300 font-medium"
          >
            Agendar Consulta
          </a>

          <button className="md:hidden text-stone-600" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-6 flex flex-col gap-5 shadow-md">
            {["Sobre", "Serviços", "Resultados", "Depoimentos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-stone-500 text-sm tracking-widest uppercase hover:text-[#b8860b] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="https://wa.me/5517997743065"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#b8860b] text-[#b8860b] text-xs tracking-widest uppercase px-5 py-3 rounded-full text-center mt-2"
            >
              Agendar Consulta
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#faf8f5]">
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#b8860b]/10 pointer-events-none" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#b8860b]/8 pointer-events-none" />
        <div className="absolute left-[-60px] bottom-[-60px] w-64 h-64 rounded-full bg-[#f5edda]/60 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-24 pb-28">
          <div>
            <p className="text-xs tracking-[0.4em] text-[#b8860b]/70 uppercase mb-6 animate-fadeUp">
              São José do Rio Preto · SP
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-none text-[#1a1a1a] mb-6 animate-fadeUp delay-100">
              A arte de<br />
              <em className="text-[#b8860b] not-italic">revelar</em><br />
              sua beleza
            </h1>
            <p className="text-stone-500 text-base leading-relaxed max-w-md mb-10 animate-fadeUp delay-200 font-light">
              36 anos transformando vidas através da Harmonização Orofacial.
              Mestre em Ortodontia, especialista em estética facial com resultados
              naturais e sofisticados.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeUp delay-300">
              <a
                href="https://wa.me/5517997743065?text=Olá%20Dr.%20Toledo,%20gostaria%20de%20agendar%20uma%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-bg text-white text-sm tracking-widest uppercase px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                Agendar Consulta
              </a>
              <a
                href="#resultados"
                className="border border-stone-300 text-stone-500 text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-300"
              >
                Ver Resultados
              </a>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end animate-fadeUp delay-300">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl border border-[#b8860b]/15 z-0" />
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl border border-[#b8860b]/20 z-0" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-[#f5edda] z-0" />

              <img
                src="/dr-toledo.jpeg"
                alt="Dr. Toledo"
                className="relative z-10 w-72 md:w-80 lg:w-96 h-auto rounded-2xl object-cover shadow-xl"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  const p = t.parentElement;
                  if (p) {
                    const d = document.createElement("div");
                    d.className = "relative z-10 w-72 md:w-80 lg:w-96 h-[480px] rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200 flex items-end p-8";
                    d.innerHTML = `<div><p style="font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:#555">Dr. Toledo</p><p style="font-size:0.65rem;letter-spacing:0.2em;color:#b8860b;text-transform:uppercase;margin-top:4px">Harmonização Orofacial</p></div>`;
                    p.appendChild(d);
                  }
                }}
              />

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-[#b8860b]/25 rounded-full px-6 py-3 z-20 whitespace-nowrap shadow-md">
                <p className="text-xs tracking-widest text-[#b8860b] uppercase font-medium">
                  36 anos de experiência
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-stone-200 bg-white/80 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-stone-200">
            {[
              { num: "36+", label: "Anos de Odontologia" },
              { num: "5.000+", label: "Procedimentos Realizados" },
              { num: "★ 5.0", label: "Avaliação dos Pacientes" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="font-display text-2xl text-[#b8860b]">{s.num}</p>
                <p className="text-[10px] tracking-widest text-stone-400 uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÍDEO DA CLÍNICA ── */}
      {/*
        Coloque o vídeo em: /public/videos/clinica.mp4
        Formatos suportados: .mp4 (recomendado), .webm
        Resolução ideal: 1920x1080 (16:9)
      */}
      <section className="relative w-full overflow-hidden bg-[#f3ede3]" style={{ maxHeight: "85vh" }}>
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <video
            className="w-full h-full object-cover"
            src="/clinica.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Overlay gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Texto sobre o vídeo */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-6xl mx-auto px-6 pb-10 md:pb-14">
              <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-2">Nossa Clínica</p>
              <h2
                className="font-display text-3xl md:text-5xl text-white leading-tight"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
              >
                Um espaço criado para{" "}
                <em className="not-italic" style={{ color: "#f5d98a" }}>você</em>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl bg-stone-100 overflow-hidden">
              <img
                src="/dr-toledo-2.png"
                alt="Dr. Toledo no consultório"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-stone-100 shadow-md">
                <p className="font-display italic text-lg text-stone-600 leading-relaxed">
                  "Beleza não é transformação — é revelação. Meu trabalho é
                  ajudar cada paciente a encontrar a melhor versão de si."
                </p>
                <p className="text-xs text-[#b8860b] tracking-widest uppercase mt-3">— Dr. Toledo</p>
              </div>
            </div>

            <div className="absolute -right-6 top-12 bg-white border border-stone-100 rounded-2xl p-5 max-w-[180px] shadow-lg">
              <div className="w-8 h-8 rounded-full gold-bg flex items-center justify-center mb-3">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <p className="text-xs text-stone-700 font-medium">Mestre em Ortodontia</p>
              <p className="text-[10px] text-stone-400 mt-1">Especialista Harmonização Facial</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.4em] text-[#b8860b]/70 uppercase mb-4">Sobre o Dr. Toledo</p>
            <h2 className="font-display text-5xl leading-tight mb-6 text-[#1a1a1a]">
              Á mais de Três décadas dedicadas à{" "}
              <em className="text-[#b8860b] not-italic">excelência</em>{" "}
              em estética facial
            </h2>
            <div className="space-y-4 text-stone-500 text-[15px] leading-relaxed font-light">
              <p>
                Com mais de 36 anos de trajetória na odontologia, o Dr. Toledo
                consolidou-se como referência em harmonização orofacial em
                São José do Rio Preto e região. Mestre em Ortodontia, dedicou
                os últimos anos à especialização em estética facial avançada.
              </p>
              <p>
                Cada procedimento é conduzido com precisão técnica e sensibilidade
                artística, respeitando as características únicas de cada paciente
                para resultados naturais, elegantes e duradouros.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "◈", label: "Mestre em Ortodontia" },
                { icon: "✦", label: "Especialista em Harmonização Facial" },
                { icon: "◇", label: "Preenchimento com Ácido Hialurônico" },
                { icon: "✧", label: "Aplicador Certificado de Botox" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-[#faf8f5] rounded-xl p-4 border border-stone-100">
                  <span className="gold text-lg mt-0.5">{item.icon}</span>
                  <span className="text-[13px] text-stone-500 leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="serviços" className="py-28 bg-[#f3ede3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#e8d9bc]/50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#e8d9bc]/40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#b8860b]/70 uppercase mb-4">O Que Oferecemos</p>
            <h2 className="font-display text-5xl text-[#1a1a1a] line-gold">Nossos Procedimentos</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="hover-lift group bg-white rounded-2xl p-7 border border-stone-100 shadow-sm cursor-default">
                <div className="text-3xl gold mb-5 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a] mb-3">{s.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <section id="resultados" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-[#b8860b]/70 uppercase mb-4">Transformações Reais</p>
            <h2 className="font-display text-5xl text-[#1a1a1a] line-gold mb-4">Antes & Depois</h2>
            <p className="text-stone-400 text-sm mt-8 max-w-md mx-auto font-light">
              Arraste o divisor para comparar os resultados. Cada transformação é única e personalizada.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeFilter === f
                    ? "gold-bg text-white border-[#b8860b] font-semibold shadow-sm"
                    : "border-stone-200 text-stone-400 hover:border-[#b8860b]/50 hover:text-[#b8860b]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="hover-lift bg-[#faf8f5] border border-stone-100 rounded-2xl p-4 shadow-sm">
                <BeforeAfterSlider before={c.before} after={c.after} />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">{c.category}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{c.description}</p>
                  </div>
                  <span className="text-xs text-[#b8860b] border border-[#b8860b]/30 rounded-full px-3 py-1 bg-[#f5edda]">
                    Real
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section id="depoimentos" className="py-28 bg-[#f3ede3]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#b8860b]/70 uppercase mb-4">O Que Dizem</p>
            <h2 className="font-display text-5xl text-[#1a1a1a] line-gold">Depoimentos</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="hover-lift bg-white border border-stone-100 rounded-2xl p-7 shadow-sm">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-[#b8860b] text-sm">★</span>
                  ))}
                </div>
                <p className="font-display italic text-lg text-stone-600 leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gold-bg flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{t.name[0]}</span>
                  </div>
                  <p className="text-sm text-stone-500">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1209 0%, #2e1f06 50%, #1a1209 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.10),transparent_70%)]" />
        <div className="relative text-center max-w-2xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c]/70 uppercase mb-4">Dê o Primeiro Passo</p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
            Agende sua <em className="text-[#c9a84c] not-italic">consulta</em>
          </h2>
          <p className="text-white/55 font-light mb-10 text-base leading-relaxed">
            Uma avaliação personalizada e sem compromisso. Descubra o tratamento
            ideal para realçar sua beleza natural.
          </p>
          <a
            href="https://wa.me/5517997743065?text=Olá%20Dr.%20Toledo,%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c9a84c] text-[#1a1209] font-semibold text-sm tracking-widest uppercase px-10 py-5 rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 16.685c-.24.678-.989 1.368-1.637 1.532-.462.118-1.061.213-3.086-.662-2.598-1.117-4.278-3.712-4.407-3.884-.129-.173-1.065-1.42-1.065-2.711 0-1.291.68-1.927.919-2.183.24-.256.524-.32.699-.32.175 0 .35.001.503.009.183.008.432-.069.676.517.25.6.85 2.076.924 2.226.074.149.124.324.025.524-.099.199-.149.324-.298.497-.149.174-.314.387-.447.52-.149.149-.305.31-.131.608.173.298.769 1.272 1.651 2.061 1.133 1.01 2.089 1.322 2.386 1.471.297.148.471.124.644-.075.173-.199.742-.866.94-1.163.198-.298.396-.249.669-.15.272.1 1.733.818 2.03.967.298.149.497.224.571.348.074.124.074.718-.166 1.396z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl gold mb-1">Dr. Toledo</p>
            <p className="text-xs tracking-widest text-stone-300 uppercase mb-5">Harmonização Orofacial</p>
            <p className="text-stone-400 text-sm leading-relaxed font-light max-w-xs">
              Mestre em Ortodontia e especialista em Harmonização Facial,
              atendendo em São José do Rio Preto — SP há mais de 36 anos.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-stone-300 uppercase mb-5">Localização</p>
            <p className="text-stone-500 text-sm font-light leading-relaxed">
              São José do Rio Preto — SP<br />
              <span className="text-stone-300">Brasil</span>
            </p>
            <a
              href="https://maps.app.goo.gl/1UFYeGQJv4BU44iC6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#b8860b] mt-3 hover:underline"
            >
              Ver no mapa →
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-stone-300 uppercase mb-5">Contato</p>
            <div className="space-y-3">
              <a
                href="https://wa.me/5517997743065"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-500 text-sm hover:text-[#b8860b] transition-colors"
              >
                <span className="gold">○</span> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/drtoledoharmonizacao?igsh=Y2Rwcm81MnJhaDhj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-500 text-sm hover:text-[#b8860b] transition-colors"
              >
                <span className="gold">○</span> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 bg-[#faf8f5] border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-300 tracking-widest">
            © {new Date().getFullYear()} Dr. Toledo — Harmonização Orofacial
          </p>
          <p className="text-[11px] text-stone-300">
            São José do Rio Preto · SP · Brasil
          </p>
        </div>
      </footer>
    </main>
  );
}
