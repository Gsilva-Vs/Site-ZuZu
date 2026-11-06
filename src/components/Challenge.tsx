import {
  ArrowUpRight,
  Ban,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  FileSearch,
  GlassWater,
  Heart,
  Leaf,
  NotebookPen,
  Replace,
  RotateCcw,
  Scale,
  Trophy,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const days = [
  {
    title: 'Entenda os rótulos',
    text: 'Descubra onde o açúcar se esconde e aprenda a identificar os nomes que ele usa.',
    icon: FileSearch,
    link: { label: 'Como identificar açúcar escondido', href: '#dicas' },
  },
  {
    title: 'Reduza alimentos açucarados',
    text: 'Identifique o que pode ser diminuído e comece a fazer escolhas mais conscientes.',
    icon: Ban,
  },
  {
    title: 'Faça trocas inteligentes',
    text: 'Descubra alternativas mais saudáveis e saborosas para o seu dia a dia.',
    icon: Replace,
    link: { label: 'Ver trocas inteligentes', href: '#conceitos' },
  },
  {
    title: 'Beba mais água',
    text: 'Priorize a água como sua principal bebida. Seu corpo agradece!',
    icon: GlassWater,
  },
  {
    title: 'Compare produtos semelhantes',
    text: 'Escolha o que tem menos açúcar e faça decisões mais conscientes no mercado.',
    icon: Scale,
  },
  {
    title: 'Prepare uma receita sem açúcar',
    text: 'Coloque a mão na massa e descubra novos sabores saudáveis!',
    icon: ChefHat,
    link: { label: 'Escolher uma receita', href: '#receitas' },
  },
  {
    title: 'Reflita sobre sua evolução',
    text: 'Valorize suas conquistas, perceba os benefícios e pense nos próximos passos.',
    icon: NotebookPen,
    note: 'Você consegue!',
  },
];

const pillars = [
  { label: 'Mais Saúde', icon: Leaf },
  { label: 'Mais Energia', icon: Dumbbell },
  { label: 'Mais Qualidade de Vida', icon: Heart },
];

const STORAGE_KEY = 'zuzu-challenge';
const TOTAL = days.length;

// Geometria da trilha: os 7 pontos se alternam em cima/embaixo e a linha os une em curvas suaves.
const W = 1000;
const H = 300;
const xs = days.map((_, i) => 80 + (i * 840) / (TOTAL - 1));
const ys = days.map((_, i) => (i % 2 === 0 ? 110 : 190));
// Um trecho de curva entre cada par de dias consecutivos.
const segments = xs.slice(1).map((x, i) => {
  const mid = (xs[i] + x) / 2;
  return `M ${xs[i]} ${ys[i]} C ${mid} ${ys[i]}, ${mid} ${ys[i + 1]}, ${x} ${ys[i + 1]}`;
});

function readDone(): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= TOTAL);
  } catch {
    return [];
  }
}

function Challenge() {
  const [done, setDone] = useState<number[]>(readDone);
  const [active, setActive] = useState(() => {
    const first = days.findIndex((_, i) => !readDone().includes(i + 1));
    return first === -1 ? 0 : first;
  });
  const trailRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // Sem armazenamento: o progresso vale apenas nesta visita.
    }
  }, [done]);

  const day = days[active];
  const Icon = day.icon;
  const isDone = done.includes(active + 1);
  const finished = done.length === TOTAL;

  const select = (index: number) => {
    setActive(index);
    const trail = trailRef.current;
    if (trail && trail.scrollWidth > trail.clientWidth) {
      nodeRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const toggleDone = () => {
    const number = active + 1;
    setDone((current) => (current.includes(number) ? current.filter((n) => n !== number) : [...current, number]));
  };

  return (
    <section id="desafio" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          data-reveal
          className="relative overflow-hidden rounded-lg border border-line/70 bg-surface/60 p-6 shadow-glass backdrop-blur-xl md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--tint)/0.35),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--tint)/0.25),transparent_70%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Agora é com você</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                Desafio Zuzu: 7 dias sem açúcar
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Você já viu como o doce pode ser leve, bonito e cheio de sabor. Agora é hora de levar essa leveza para
                a rotina: um passo por dia, sem pressão e sem radicalismo.
              </p>
              <p className="mt-3 font-display text-2xl font-black leading-snug text-ink">
                Transforme seus hábitos um passo por dia!
              </p>
            </div>

            <div className="rounded-lg border border-line/70 bg-tile/70 p-5">
              <div className="flex items-end justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-zuzu-olive sm:tracking-[0.18em]">Seu progresso</p>
                <p className="shrink-0 whitespace-nowrap text-sm font-bold text-muted">
                  <span className="text-2xl font-black text-ink">{done.length}</span> de {TOTAL} dias
                </p>
              </div>
              <div
                className="mt-3 h-2.5 overflow-hidden rounded-full bg-line/60"
                role="progressbar"
                aria-label="Progresso do Desafio Zuzu"
                aria-valuemin={0}
                aria-valuemax={TOTAL}
                aria-valuenow={done.length}
              >
                <div
                  className="h-full rounded-full bg-accent-strong transition-[width] duration-700 ease-out"
                  style={{ width: `${(done.length / TOTAL) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                Marque cada dia ao concluir. Seu progresso fica salvo neste aparelho.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pillars.map(({ label, icon: PillarIcon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-tint/30 px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-ink-soft"
                  >
                    <PillarIcon className="h-3.5 w-3.5 text-zuzu-olive" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trilha dos 7 dias */}
          <div ref={trailRef} className="relative -mx-2 mt-6 overflow-x-auto px-2 py-14">
            <div className="relative mx-auto aspect-[1000/300] min-w-[640px]">
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                {segments.map((d, i) => (
                  <g key={d}>
                    <path
                      d={d}
                      fill="none"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="2 10"
                      style={{ stroke: 'rgb(var(--line))' }}
                    />
                    {/* O trecho se "desenha" quando os dois dias que ele liga estão concluídos. */}
                    <path
                      d={d}
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={done.includes(i + 1) && done.includes(i + 2) ? 0 : 1}
                      className="transition-[stroke-dashoffset] duration-700 ease-out"
                      style={{ stroke: 'rgb(var(--accent-strong))' }}
                    />
                  </g>
                ))}
              </svg>

              {days.map((item, i) => {
                const upper = i % 2 === 0;
                const selected = i === active;
                const completed = done.includes(i + 1);
                const position = { left: `${(xs[i] / W) * 100}%`, top: `${(ys[i] / H) * 100}%` };

                return (
                  <div key={item.title}>
                    <button
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => select(i)}
                      aria-label={`Dia ${i + 1}: ${item.title}${completed ? ' (concluído)' : ''}`}
                      aria-current={selected ? 'step' : undefined}
                      style={position}
                      className={`absolute z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-base font-black transition duration-300 active:scale-95 sm:h-14 sm:w-14 sm:text-lg ${
                        selected
                          ? 'scale-110 border-btn bg-btn text-btn-fg shadow-soft ring-4 ring-tint/40'
                          : completed
                            ? 'border-accent-strong bg-accent text-accent-fg hover:scale-105'
                            : 'border-line bg-surface text-ink-soft hover:scale-105 hover:border-accent-strong hover:bg-tint/35'
                      }`}
                    >
                      {completed ? <Check className="h-5 w-5 sm:h-6 sm:w-6" /> : i + 1}
                    </button>
                    <span
                      style={position}
                      className={`pointer-events-none absolute z-0 w-28 -translate-x-1/2 text-center sm:w-36 ${
                        upper ? '-translate-y-full pb-9 sm:pb-11' : 'pt-9 sm:pt-11'
                      }`}
                    >
                      <span className="block text-[0.6rem] font-black uppercase tracking-[0.2em] text-zuzu-olive">
                        Dia {i + 1}
                      </span>
                      <span
                        className={`mt-0.5 block text-[0.7rem] font-bold leading-4 transition-colors duration-300 sm:text-xs ${
                          selected ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {item.title}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dia selecionado */}
          <div
            key={active}
            aria-live="polite"
            className="animate-rise relative grid items-center gap-6 rounded-lg border border-line/70 bg-tile/70 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-8"
          >
            <div className="flex items-center gap-5 md:flex-col md:gap-3">
              <span className="grid h-24 w-24 place-items-center rounded-lg bg-chip md:h-32 md:w-32">
                <Icon className="h-11 w-11 text-zuzu-olive md:h-14 md:w-14" />
              </span>
              <span className="font-display text-6xl font-black leading-none text-tint md:text-7xl">
                {String(active + 1).padStart(2, '0')}
              </span>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">
                Dia {active + 1} de {TOTAL}
              </p>
              <h3 className="mt-2 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">{day.title}</h3>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{day.text}</p>
              {day.note && (
                <p className="mt-3 inline-flex rounded-lg bg-tint/30 px-3 py-1.5 text-sm font-black text-ink">
                  {day.note}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={toggleDone}
                  aria-pressed={isDone}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-extrabold shadow-soft transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
                    isDone ? 'bg-accent text-accent-fg hover:bg-accent-strong' : 'bg-btn text-btn-fg hover:bg-btn-hover'
                  }`}
                >
                  <Check className="h-5 w-5" />
                  {isDone ? 'Dia concluído' : 'Marcar como concluído'}
                </button>

                {day.link && (
                  <a
                    href={day.link.href}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/70 px-4 py-3 text-sm font-extrabold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-surface active:scale-[0.97]"
                  >
                    {day.link.label}
                    <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}

                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    onClick={() => select(active - 1)}
                    disabled={active === 0}
                    aria-label="Dia anterior"
                    className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface/70 text-ink transition duration-200 hover:bg-tint/35 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => select(active + 1)}
                    disabled={active === TOTAL - 1}
                    aria-label="Próximo dia"
                    className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface/70 text-ink transition duration-200 hover:bg-tint/35 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {finished && (
            <div className="animate-modal mt-5 flex flex-col items-center gap-4 rounded-lg bg-accent p-6 text-center text-accent-fg sm:flex-row sm:text-left">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-surface/60">
                <Trophy className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="font-display text-2xl font-black">Você completou o Desafio Zuzu!</p>
                <p className="mt-1 font-bold">Disciplina hoje, mais saúde amanhã!</p>
              </div>
              <div className="flex gap-2">
                <a
                  href="#receitas"
                  className="rounded-lg bg-btn px-5 py-3 text-sm font-extrabold text-btn-fg transition duration-300 hover:-translate-y-0.5 hover:bg-btn-hover active:scale-[0.97]"
                >
                  Ver receitas
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setDone([]);
                    select(0);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent-fg/30 px-4 py-3 text-sm font-extrabold transition duration-300 hover:bg-surface/40 active:scale-[0.97]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Recomeçar
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col items-center justify-between gap-2 rounded-lg bg-panel px-6 py-5 text-center text-white sm:flex-row sm:text-left">
            <p className="font-display text-xl font-black">Disciplina hoje, mais saúde amanhã!</p>
            <p className="text-sm font-bold text-stone-100">Pequenas mudanças geram grandes resultados.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Challenge;
