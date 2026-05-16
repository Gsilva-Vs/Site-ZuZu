import { Apple, BookOpen, Gauge, ShieldCheck } from 'lucide-react';

const concepts = [
  {
    icon: BookOpen,
    title: 'O que significa zero açúcar?',
    text: 'A ideia é retirar açúcares adicionados da rotina e priorizar alimentos que já trazem sabor naturalmente, como frutas inteiras, cacau, especiarias e castanhas.',
  },
  {
    icon: Gauge,
    title: 'Mais estabilidade no dia',
    text: 'Refeições com fibras, proteínas e gorduras boas ajudam a reduzir picos de fome e deixam a energia mais constante entre uma refeição e outra.',
  },
  {
    icon: Apple,
    title: 'Doce não precisa sumir',
    text: 'Sobremesas podem continuar no cardápio quando a doçura vem de ingredientes reais e a receita respeita textura, aroma e equilíbrio.',
  },
  {
    icon: ShieldCheck,
    title: 'Sem radicalismo',
    text: 'Zuzu Zero não promete milagre. A proposta é facilitar escolhas melhores, com prazer, leitura de rótulos e receitas que funcionam de verdade.',
  },
];

const swaps = [
  ['Açúcar refinado', 'banana madura, tâmaras ou maçã cozida'],
  ['Refrigerante', 'chá gelado com frutas e hortelã'],
  ['Chocolate ao leite', 'cacau 100% com creme de castanhas'],
  ['Granola comum', 'mix de sementes, coco e nozes tostadas'],
];

function Concepts() {
  return (
    <section id="conceitos" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Conceitos</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
              Uma alimentação zero mais simples de entender.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-650">
              O site foi pensado para ficar limpo e direto: primeiro você aprende a lógica, depois escolhe uma receita e monta sua rotina sem excesso de informação.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {concepts.map((concept) => {
              const Icon = concept.icon;

              return (
                <article key={concept.title} className="rounded-lg border border-white/70 bg-white/60 p-6 shadow-glass backdrop-blur-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-zuzu-yellow/80">
                    <Icon className="h-6 w-6 text-zuzu-olive" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-stone-950">{concept.title}</h3>
                  <p className="mt-3 leading-7 text-stone-650">{concept.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-white/70 bg-white/60 p-5 shadow-glass backdrop-blur-xl md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Trocas inteligentes</p>
              <h3 className="mt-2 font-display text-3xl font-black text-stone-950">Pequenas mudanças que limpam o cardápio.</h3>
            </div>
            <a href="#guia" className="rounded-lg bg-stone-950 px-5 py-3 text-center font-black text-white transition hover:bg-zuzu-olive">
              Montar despensa
            </a>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {swaps.map(([from, to]) => (
              <div key={from} className="grid gap-2 rounded-lg bg-white/70 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
                <span className="font-bold text-stone-500 line-through decoration-rose-400 decoration-2">{from}</span>
                <span className="font-black text-stone-900">{to}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Concepts;
