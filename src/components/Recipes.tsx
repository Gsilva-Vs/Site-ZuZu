import { Clock, Heart, Search, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';

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
    title: 'Panquecas de banana e aveia',
    category: 'Café da manhã',
    time: '18 min',
    servings: '2 porções',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
    description: 'Massa macia, naturalmente doce e pronta para receber frutas frescas ou iogurte.',
    ingredients: ['banana madura', 'ovos', 'aveia em flocos', 'canela', 'fermento químico'],
    steps: ['Bata banana, ovos e aveia até formar uma massa cremosa.', 'Misture canela e fermento delicadamente.', 'Doure em frigideira antiaderente por 2 minutos de cada lado.'],
  },
  {
    id: 2,
    title: 'Mousse de cacau com abacate',
    category: 'Sobremesa',
    time: '10 min',
    servings: '4 taças',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    description: 'Cremoso, intenso e sem açúcar refinado, com textura de confeitaria.',
    ingredients: ['abacate maduro', 'cacau 100%', 'leite vegetal', 'tâmaras hidratadas', 'baunilha'],
    steps: ['Bata todos os ingredientes até ficar brilhante.', 'Ajuste a textura com mais leite vegetal, se necessário.', 'Leve para gelar por 40 minutos antes de servir.'],
  },
  {
    id: 3,
    title: 'Bowl cítrico de iogurte',
    category: 'Lanche',
    time: '8 min',
    servings: '1 bowl',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80',
    description: 'Iogurte natural, frutas e sementes para um lanche leve com boa saciedade.',
    ingredients: ['iogurte natural sem açúcar', 'morango', 'kiwi', 'sementes de chia', 'castanhas'],
    steps: ['Espalhe o iogurte em uma tigela baixa.', 'Distribua frutas cortadas e sementes.', 'Finalize com castanhas tostadas para crocância.'],
  },
  {
    id: 4,
    title: 'Salada morna de grãos',
    category: 'Almoço',
    time: '25 min',
    servings: '3 porções',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    description: 'Uma base colorida de proteína vegetal, folhas e molho de limão siciliano.',
    ingredients: ['quinoa cozida', 'grão-de-bico', 'folhas verdes', 'abóbora assada', 'limão'],
    steps: ['Aqueça quinoa e grão-de-bico com azeite.', 'Misture folhas, abóbora e molho de limão.', 'Sirva morna com ervas frescas.'],
  },
  {
    id: 5,
    title: 'Trufas de coco e castanha',
    category: 'Sobremesa',
    time: '20 min',
    servings: '12 unidades',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=80',
    description: 'Docinhos de geladeira para matar a vontade de doce com ingredientes integrais.',
    ingredients: ['coco ralado sem açúcar', 'castanha-de-caju', 'tâmaras', 'cacau 100%', 'óleo de coco'],
    steps: ['Processe castanhas e tâmaras até virar pasta.', 'Misture coco e óleo de coco.', 'Modele bolinhas e passe no cacau.'],
  },
  {
    id: 6,
    title: 'Chá gelado de frutas e hortelã',
    category: 'Bebidas',
    time: '12 min',
    servings: '1 jarra',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80',
    description: 'Uma bebida aromática, refrescante e naturalmente perfumada.',
    ingredients: ['chá verde suave', 'limão', 'frutas vermelhas', 'hortelã', 'gelo'],
    steps: ['Prepare o chá e deixe esfriar.', 'Adicione frutas, limão e hortelã.', 'Sirva com bastante gelo.'],
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
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
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

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-extrabold transition ${
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
          {filteredRecipes.map((recipe) => {
            const liked = likedRecipes.includes(recipe.id);

            return (
              <article
                key={recipe.id}
                className="group overflow-hidden rounded-lg border border-white/70 bg-white/60 shadow-glass backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75"
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
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-white/70 bg-white/80 text-stone-700 backdrop-blur-xl transition hover:bg-white"
                    onClick={() => toggleLike(recipe.id)}
                    aria-label={liked ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
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
                    className="mt-6 w-full rounded-lg bg-zuzu-yellow px-5 py-3 font-black text-stone-950 transition hover:-translate-y-0.5 hover:bg-zuzu-gold"
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
        <div className="fixed inset-0 z-[80] grid place-items-center bg-stone-950/45 px-4 py-8 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/70 bg-zuzu-cream p-5 shadow-glass">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-zuzu-olive">{selectedRecipe.category}</p>
                <h3 className="mt-2 font-display text-3xl font-black text-stone-950">{selectedRecipe.title}</h3>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-stone-200 bg-white text-stone-800"
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
                  {selectedRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="rounded-lg bg-white/70 px-3 py-2">
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
                  <li key={step} className="flex gap-3 rounded-lg bg-white/70 p-3">
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
