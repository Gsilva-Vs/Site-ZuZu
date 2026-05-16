import { Apple, BadgeCheck, FlaskConical, Info, Scale, ShoppingBasket } from 'lucide-react';

const pantry = [
  'cacau 100%',
  'aveia em flocos',
  'canela e baunilha',
  'chia e linhaça',
  'castanhas naturais',
  'iogurte sem açúcar',
  'frutas maduras',
  'chás e ervas frescas',
];

const sugarTypes = [
  {
    icon: Apple,
    title: 'Açúcar natural dos alimentos',
    text: 'Frutas, leite e alguns vegetais têm açúcares próprios. Quando vêm junto de fibras, água e nutrientes, eles se comportam de forma diferente do açúcar isolado.',
  },
  {
    icon: FlaskConical,
    title: 'Açúcar adicionado',
    text: 'É o açúcar colocado na receita ou no produto industrializado. Pode aparecer como sacarose, xarope, melado, glucose, dextrose ou maltodextrina.',
  },
  {
    icon: Scale,
    title: 'Adoçantes',
    text: 'Stevia, eritritol e xilitol podem ajudar em algumas receitas, mas devem ser usados com equilíbrio para não manter o paladar sempre dependente do muito doce.',
  },
];

const labelTips = [
  'Leia a lista de ingredientes antes da tabela nutricional.',
  'Observe palavras terminadas em “ose”, como glucose, frutose e dextrose.',
  'Prefira receitas onde o sabor venha de fruta, cacau, especiarias e textura.',
  'Produtos “zero” também podem ter excesso de aditivos, então compare opções.',
];

function ZeroGuide() {
  return (
    <>
      <section id="guia" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-white/70 bg-white/60 shadow-glass backdrop-blur-xl">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[24rem]">
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=80"
                  alt="Pessoa preparando ingredientes naturais em uma bancada clara"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/80 p-5 shadow-soft backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <ShoppingBasket className="h-6 w-6 text-zuzu-olive" />
                    <p className="font-black text-stone-950">Despensa Zero</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-650">
                    Tenha bases simples em casa para improvisar sem cair no açúcar escondido.
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Guia Zero</p>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-stone-950">
                  Uma lista de compras que deixa a semana mais fácil.
                </h2>
                <p className="mt-4 text-lg leading-8 text-stone-650">
                  A base do estilo Zuzu Zero é comprar melhor antes de cozinhar. Com poucos itens versáteis, você monta café, lanche, sobremesa e refeição principal.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {pantry.map((item) => (
                    <div key={item} className="rounded-lg bg-zuzu-yellow/35 p-3 text-sm font-black text-stone-800">
                      <BadgeCheck className="mb-2 h-4 w-4 text-zuzu-olive" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dicas" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-glass backdrop-blur-xl md:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-zuzu-yellow">
                    <Info className="h-6 w-6 text-zuzu-olive" />
                  </span>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Açúcares e adoçantes</p>
                </div>
                <h2 className="mt-5 font-display text-4xl font-black tracking-tight text-stone-950">
                  Entenda o doce antes de escolher o que vai para o prato.
                </h2>
                <p className="mt-4 text-lg leading-8 text-stone-650">
                  Esta seção é explicativa: ela ajuda a diferenciar açúcar natural, açúcar adicionado e adoçantes, sem formulário ou promessa milagrosa.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {sugarTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="rounded-lg bg-white/70 p-5">
                    <Icon className="h-7 w-7 text-zuzu-olive" />
                    <h3 className="mt-4 text-xl font-black text-stone-950">{item.title}</h3>
                    <p className="mt-3 leading-7 text-stone-650">{item.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-lg bg-stone-950 p-5 text-white md:p-6">
              <h3 className="text-2xl font-black">Como identificar açúcar escondido</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {labelTips.map((tip) => (
                  <div key={tip} className="flex gap-3 rounded-lg bg-white/10 p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-zuzu-yellow" />
                    <p className="leading-7 text-stone-100">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ZeroGuide;
