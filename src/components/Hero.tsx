import { ArrowRight, CheckCircle2, Leaf, Sparkles } from 'lucide-react';

const metrics = [
  { value: '24', label: 'receitas base' },
  { value: '0', label: 'açúcar adicionado' },
  { value: '15 min', label: 'preparos rápidos' },
];

function Hero() {
  return (
    <section id="inicio" className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/65 px-4 py-2 text-sm font-bold text-zuzu-olive shadow-soft backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-zuzu-gold" />
            Receitas, escolhas e rotina sem açúcar adicionado
          </div>

          <h1 className="font-display text-5xl font-black leading-[0.98] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            Zuzu Zero
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
            Um espaço moderno para transformar sobremesas, cafés da manhã e pratos do dia a dia em versões leves, bonitas e cheias de sabor, sem depender de açúcar refinado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#receitas"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-stone-950 px-6 py-4 font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-zuzu-olive"
            >
              Ver receitas zero
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#conceitos"
              className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-white/70 px-6 py-4 font-extrabold text-stone-800 shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
            >
              Entender o conceito
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/70 bg-white/60 p-4 shadow-soft backdrop-blur-xl">
                <p className="text-2xl font-black text-stone-950">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-5 top-12 z-10 hidden max-w-[13rem] rounded-lg border border-white/70 bg-white/80 p-4 shadow-glass backdrop-blur-xl sm:block">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-zuzu-olive" />
              <p className="text-sm font-black text-stone-900">Doce natural</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Frutas, especiarias e textura no lugar do excesso de açúcar.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-white/70 bg-white/55 p-3 shadow-glass backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
              alt="Mesa com tigelas coloridas, frutas, grãos e alimentos naturais"
              className="h-[26rem] w-full rounded-lg object-cover sm:h-[34rem]"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/60 bg-white/75 p-4 shadow-soft backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zuzu-yellow">
                  <Leaf className="h-5 w-5 text-zuzu-olive" />
                </span>
                <div>
                  <p className="font-black text-stone-950">Leve no visual, forte no sabor</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    Uma curadoria para quem quer comer melhor sem deixar a comida sem graça.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
