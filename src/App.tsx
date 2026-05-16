import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Concepts from './components/Concepts';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Recipes from './components/Recipes';
import ZeroGuide from './components/ZeroGuide';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Receitas', href: '#receitas' },
  { label: 'Conceitos', href: '#conceitos' },
  { label: 'Guia Zero', href: '#guia' },
  { label: 'Dicas', href: '#dicas' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-zuzu-cream text-zuzu-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(253,224,71,0.38),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(187,247,208,0.28),transparent_30%),linear-gradient(180deg,#fffdf4_0%,#fff8db_42%,#fffaf0_100%)]" />

      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg border border-white/70 bg-white/75 px-4 shadow-glass backdrop-blur-2xl sm:px-6">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para o início">
            <img
              src="/logo-icon.svg"
              alt=""
              className="h-11 w-11 rounded-lg object-contain"
            />
            <span>
              <span className="block font-display text-2xl font-black leading-none tracking-tight text-stone-950">
                Zuzu Zero
              </span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.26em] text-zuzu-olive">
                sabor sem açúcar
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-bold text-stone-700 transition hover:bg-zuzu-yellow/35 hover:text-stone-950"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#receitas"
            className="hidden rounded-lg bg-stone-950 px-5 py-3 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-zuzu-olive md:inline-flex"
          >
            Explorar receitas
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-stone-200 bg-white/70 text-stone-900 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-lg border border-white/70 bg-white/90 p-3 shadow-glass backdrop-blur-2xl md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 font-bold text-stone-700 hover:bg-zuzu-yellow/35 hover:text-stone-950"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <Hero />
        <Recipes />
        <Concepts />
        <ZeroGuide />
      </main>

      <Footer />
    </div>
  );
}

export default App;
