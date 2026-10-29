import { Clock, Heart, Search, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { revealDelay } from '../useReveal';

type Recipe = {
  id: number;
  title: string;
  category: string;
  time: string;
  servings: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
};

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Doce de banana sem açúcar',
    category: 'Sobremesa',
    time: '45 min',
    servings: '8 porções',
    image: '/receitas/doce-de-banana-sem-acucar.jpeg',
    description: 'Feito só com a doçura da própria banana, um doce cremoso e leve, com apenas um ingrediente.',
    ingredients: ['6 bananas-nanicas maduras (ou outro tipo de sua preferência)'],
    steps: [
      'Separe as bananas. Você pode usar nanica, prata, maçã ou uma mistura delas, mas escolha bananas bem maduras.',
      'Descasque as bananas e corte todas em rodelas de 1 cm.',
      'Em uma panela (de fundo grosso, se possível), coloque as bananas e leve ao fogo médio. Tampe por cerca de 3 minutos, até começarem a soltar um pouco de água.',
      'Mexa rapidamente e, se algo tiver grudado e caramelizado no fundo, raspe com uma colher de pau. Tampe de novo e cozinhe por mais uns 10 minutos, abrindo a panela de vez em quando para raspar o fundo e não queimar.',
      'Continue cozinhando com a panela tampada, mexendo a cada 5 minutos ou quando começar a caramelizar no fundo: é essa caramelização que dá a doçura e o sabor ideais ao doce.',
      'Quando o doce reduzir bem e escurecer, raspe o fundo e cozinhe por mais alguns minutos, até ficar amarronzado e com textura cremosa.',
      'Sirva puro ou com pães, torradas, creme de leite ou queijo branco.',
    ],
  },
  {
    id: 2,
    title: 'Bolo gelado de abacaxi sem farinha e sem açúcar',
    category: 'Sobremesa',
    time: '30 min',
    servings: '5 porções',
    image: '/receitas/bolo-gelado-de-abacaxi-sem-farinha-e-sem-acucar.jpeg',
    description: 'Bolo leve e refrescante, com abacaxi, coco e cobertura cremosa, servido gelado.',
    ingredients: [
      'Massa: 1/2 abacaxi picado e fervido',
      'Massa: 3 ovos',
      'Massa: 1 pote de iogurte natural (170 gramas)',
      'Massa: 3 colheres de leite em pó',
      'Massa: 3 colheres de sopa de xilitol',
      'Massa: 50 gramas de coco ralado seco',
      'Massa: 1 colher de chá de fermento químico em pó (fermento para bolo)',
      'Cobertura: 1/2 abacaxi picado e fervido',
      'Cobertura: 1 lata de creme de leite',
      'Cobertura: 2 colheres de sopa de xilitol',
    ],
    steps: [
      'Massa: reúna todos os ingredientes da massa.',
      'Massa: ferva o abacaxi por 3 a 5 minutos e reserve.',
      'Massa: em uma tigela, bata os ovos e acrescente o iogurte natural, o leite em pó e o xilitol.',
      'Massa: finalize com o coco, o abacaxi e o fermento. Misture.',
      'Massa: coloque em uma forma untada e leve ao forno preaquecido a 180°C até dourar.',
      'Cobertura: reúna todos os ingredientes da cobertura.',
      'Cobertura: misture o abacaxi fervido com o creme de leite e o xilitol.',
      'Cobertura: mexa até obter um creme.',
      'Cobertura: espalhe sobre o topo do bolo e leve à geladeira por cerca de 2 horas.',
      'Agora é só servir.',
    ],
  },
  {
    id: 3,
    title: 'Bolo de chocolate sem açúcar e sem farinha',
    category: 'Café da manhã',
    time: '45 min',
    servings: '6 fatias',
    image: '/receitas/bolo-de-chocolate-sem-acucar-e-sem-farinha-0.webp',
    description: 'Bolo macio e úmido, adoçado naturalmente pelas bananas, feito com aveia e cacau.',
    ingredients: [
      '3 ovos',
      '1/4 xícara de chá de óleo (100 ml)',
      '3 bananas maduras (nanica ou prata)',
      '2 xícaras de aveia em flocos (160 gramas)',
      '2 colheres de sopa de cacau em pó (20 gramas)',
      '1 colher de sopa de fermento químico em pó (15 gramas)',
    ],
    steps: [
      'Separe os ingredientes, descasque as bananas, preaqueça o forno a 200 ºC e unte uma assadeira redonda de 16 cm.',
      'No liquidificador, coloque os ovos e o óleo e bata por cerca de 3 minutos.',
      'Adicione as bananas, a aveia em flocos e o cacau em pó e bata até obter uma mistura homogênea.',
      'Acrescente o fermento químico e misture delicadamente com uma colher ou espátula até incorporar.',
      'Despeje a massa na assadeira e leve ao forno por cerca de 30 minutos a 200 ºC, ou até passar no teste do palito.',
      'Retire do forno, deixe amornar e sirva.',
    ],
  },
  {
    id: 4,
    title: 'Mousse de abacate com amendoim',
    category: 'Sobremesa',
    time: '5 min',
    servings: '1 porção',
    image: '/receitas/mousse-de-abacate-com-amendoim-01.jpg',
    description: 'Sobremesa saudável, leve e rápida, de abacate, pasta de amendoim e iogurte.',
    ingredients: [
      '100 gramas de abacate',
      '1 colher de sopa de pasta de amendoim sem açúcar',
      '1 iogurte natural',
      '1 paçoca diet para decorar',
    ],
    steps: [
      'Coloque todos os ingredientes em um processador e bata até dar o ponto de mousse.',
      'Transfira para uma taça.',
      'Macere a paçoca e salpique por cima.',
      'Agora é só servir.',
    ],
  },
  {
    id: 5,
    title: 'Doce de leite sem açúcar',
    category: 'Sobremesa',
    time: '15 min',
    servings: '325 gramas',
    image: '/receitas/doce-de-leite-sem-acucar-0.webp',
    description: 'Doce de leite cremoso e prático, feito com apenas dois ingredientes.',
    ingredients: [
      '1 xícara de chá de leite em pó (85 gramas)',
      '1 xícara de chá de água (240 ml)',
    ],
    steps: [
      'Separe os ingredientes e organize a bancada.',
      'Em uma panela, coloque o leite em pó sem lactose e leve ao fogo baixo.',
      'Mexa constantemente por cerca de 5 minutos, até o leite em pó ficar levemente dourado.',
      'Transfira o leite em pó dourado para um liquidificador.',
      'Acrescente a água aos poucos e bata até obter um creme homogêneo. Ajuste a quantidade de água, se necessário, até atingir a textura desejada.',
      'Sirva em seguida ou leve à geladeira para ficar mais firme.',
    ],
  },
  {
    id: 6,
    title: 'Docinho funcional de damasco',
    category: 'Sobremesa',
    time: '5 min',
    servings: '12 unidades',
    image: '/receitas/docinho-funcional-de-damasco.jpg',
    description: 'Docinho fácil e saudável, de damasco, castanha-de-caju e coco, pronto em minutos.',
    ingredients: [
      '100 gramas de damasco desidratado',
      '50 gramas de castanha-de-caju',
      '50 gramas de coco ralado seco sem açúcar',
      '5 gramas de óleo de coco',
    ],
    steps: [
      'Coloque todos os ingredientes no processador e bata até formar uma massa.',
      'Pegue pequenas porções, molde em formato de bolinhas e passe no coco ralado.',
      'Agora é só servir.',
    ],
  },
  {
    id: 7,
    title: 'Creme de avelã sem açúcar',
    category: 'Lanche',
    time: '45 min',
    servings: '180 gramas',
    image: '/receitas/creme-de-avela-sem-acucar-0-rotated.jpg',
    description: 'Creme intenso de avelãs torradas e cacau, sem leite e sem açúcar, para pães, frutas e torradas.',
    ingredients: [
      '1 xícara de chá de avelã (160 gramas)',
      '1/4 de xícara de chá de chocolate sem açúcar (20 gramas)',
      '1/4 de xícara de chá de cacau (20 gramas)',
      '1 colher de chá de adoçante',
    ],
    steps: [
      'Separe todos os ingredientes sobre a bancada.',
      'Preaqueça o forno a 180 °C e disponha as avelãs em uma assadeira, em uma só camada.',
      'Deixe no forno por 15 minutos para torrar levemente, mexendo na metade do tempo para dourar por igual. Reserve e deixe esfriar em temperatura ambiente.',
      'Transfira as avelãs para o processador (ou liquidificador potente) e bata até virar uma farofa grossa. Se a avelã tiver casca, esfregue-a em um pano para tirar o excesso antes de bater.',
      'Vá raspando as laterais com uma espátula para trazer a mistura ao centro e continue batendo até formar uma pasta cremosa, semelhante à manteiga de avelã.',
      'Acrescente o chocolate derretido, o cacau em pó e o adoçante. Bata novamente até ficar homogêneo, provando e ajustando o dulçor, se necessário. Transfira o creme para um pote limpo com tampa.',
      'Feche e leve à geladeira para firmar antes de servir. Perfeito para comer com torradas ou pão.',
    ],
  },
  {
    id: 8,
    title: 'Canjica doce sem leite condensado',
    category: 'Sobremesa',
    time: '80 min',
    servings: '5 porções',
    image: '/receitas/canjica-doce-sem-leite-condensado-0.webp',
    description: 'Canjica cremosa e encorpada, com leite de coco, canela e cravo, sem leite condensado e sem açúcar.',
    ingredients: [
      '1 xícara de chá de canjica de milho (200 gramas)',
      '6 xícaras de chá de água (1,4 litros)',
      '1 e 1/2 xícara de chá de leite de coco (300 ml)',
      '1/2 xícara de chá de creme de leite (100 gramas)',
      '1 unidade de canela em pau',
      '10 unidades de cravo-da-índia',
      '3 colheres de sopa de adoçante xilitol',
      '50 gramas de castanha-de-caju inteira',
    ],
    steps: [
      'Organize a bancada, separe todos os ingredientes e escolha uma panela de pressão em bom estado. Pique a castanha-de-caju com uma faca e reserve.',
      'Coloque a canjica de milho e a água na panela de pressão, tampe e leve ao fogo alto até iniciar a pressão.',
      'Assim que pegar pressão, abaixe o fogo e cozinhe por 1 hora, mantendo o fogo baixo para evitar que o líquido seque. Desligue o fogo, aguarde a pressão sair naturalmente e abra a panela com cuidado. Se houver excesso de líquido, descarte parte da água, mantendo apenas o suficiente para uma base cremosa.',
      'Acrescente o leite de coco, o creme de leite, a canela em pau, o cravo-da-índia e o adoçante.',
      'Misture bem, leve novamente ao fogo médio e cozinhe por 15 minutos, mexendo ocasionalmente, até encorpar.',
      'Desligue o fogo e sirva ainda quente, finalizando com a castanha-de-caju picada.',
    ],
  },
];

const categories = ['Todas', 'Café da manhã', 'Sobremesa', 'Lanche', 'Almoço', 'Bebidas'];

function Recipes() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'Todas') {
      return recipes;
    }

    return recipes.filter((recipe) => recipe.category === activeCategory);
  }, [activeCategory]);

  const toggleLike = (id: number) => {
    setLikedRecipes((current) =>
      current.includes(id) ? current.filter((recipeId) => recipeId !== id) : [...current, id],
    );
  };

  return (
    <section id="receitas" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">Receitas testáveis</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
              Zero açúcar, zero cara de dieta sem graça.
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-650">
              Selecione uma categoria e abra o preparo completo. As receitas usam frutas, especiarias, gorduras boas e fibras para construir sabor.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/70 bg-white/60 px-4 py-3 shadow-soft backdrop-blur-xl">
            <Search className="h-5 w-5 text-zuzu-olive" />
            <span className="text-sm font-bold text-stone-600">{filteredRecipes.length} receitas encontradas</span>
          </div>
        </div>

        <div data-reveal className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-extrabold transition duration-200 active:scale-95 ${
                activeCategory === category
                  ? 'bg-stone-950 text-white shadow-soft'
                  : 'border border-white/70 bg-white/65 text-stone-700 hover:bg-zuzu-yellow/45'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe, index) => {
            const liked = likedRecipes.includes(recipe.id);

            return (
              <article
                key={recipe.id}
                data-reveal
                style={revealDelay(index)}
                className="group overflow-hidden rounded-lg border border-white/70 bg-white/60 shadow-glass backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-zuzu-gold/60 hover:bg-white/75 hover:shadow-[0_30px_80px_rgba(90,73,34,0.22)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-lg bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zuzu-olive backdrop-blur-xl">
                    {recipe.category}
                  </div>
                  <button
                    type="button"
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-white/70 bg-white/80 text-stone-700 backdrop-blur-xl transition duration-200 hover:scale-105 hover:bg-white active:scale-90"
                    onClick={() => toggleLike(recipe.id)}
                    aria-label={liked ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'animate-heart fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-black tracking-tight text-stone-950">{recipe.title}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-stone-600">{recipe.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-stone-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-zuzu-olive" />
                      {recipe.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-zuzu-olive" />
                      {recipe.servings}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full rounded-lg bg-zuzu-yellow px-5 py-3 font-black text-stone-950 transition duration-300 hover:-translate-y-0.5 hover:bg-zuzu-gold hover:shadow-soft active:translate-y-0 active:scale-[0.98]"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    Ver preparo
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedRecipe && (
        <div className="animate-overlay fixed inset-0 z-[80] grid place-items-center bg-stone-950/45 px-4 py-8 backdrop-blur-sm">
          <div className="animate-modal max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/70 bg-zuzu-cream p-5 shadow-glass">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">{selectedRecipe.category}</p>
                <h3 className="mt-2 font-display text-3xl font-black text-stone-950">{selectedRecipe.title}</h3>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-stone-200 bg-white text-stone-800 transition duration-200 hover:rotate-90 hover:bg-stone-100 active:scale-90"
                onClick={() => setSelectedRecipe(null)}
                aria-label="Fechar receita"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="h-72 w-full rounded-lg object-cover"
              />
              <div>
                <h4 className="font-black text-stone-950">Ingredientes</h4>
                <ul className="mt-3 space-y-2 text-stone-650">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={ingredient} style={revealDelay(index)} className="animate-rise rounded-lg bg-white/70 px-3 py-2">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-black text-stone-950">Modo de preparo</h4>
              <ol className="mt-3 space-y-3 text-stone-650">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={step} style={revealDelay(index)} className="animate-rise flex gap-3 rounded-lg bg-white/70 p-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-zuzu-yellow text-sm font-black text-stone-950">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Recipes;
