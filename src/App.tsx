import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Concepts from './components/Concepts';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Recipes from './components/Recipes';
import ZeroGuide from './components/ZeroGuide';
import { useScrollReveal } from './useReveal';
import { useTheme } from './useTheme';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Receitas', href: '#receitas' },
  { label: 'Conceitos', href: '#conceitos' },
  { label: 'Guia Zero', href: '#guia' },
  { label: 'Dicas', href: '#dicas' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('inicio');

  useScrollReveal();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-ink">
      <div className="page-bg pointer-events-none fixed inset-0 -z-10" />

      <header
        className={`fixed left-0 right-0 top-0 z-50 px-3 transition-[padding] duration-300 sm:px-5 ${scrolled ? 'pt-2' : 'pt-3'}`}
      >
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg border border-line/70 px-4 backdrop-blur-2xl transition-all duration-300 sm:px-6 ${
            scrolled ? 'bg-surface/90 shadow-nav' : 'bg-surface/75 shadow-glass'
          }`}
        >
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para o início">
            <img
              src="/logo-icon.svg"
              alt=""
              className="h-24 w-24 rounded-lg object-contain"
            />
            <span>
              <span className="block font-display text-2xl font-black leading-none tracking-tight text-ink">
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
                aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition duration-300 ${
                  activeId === link.href.slice(1)
                    ? 'bg-tint/55 text-ink'
                    : 'text-ink-soft hover:bg-tint/35 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface/70 text-ink-soft transition duration-300 hover:-translate-y-0.5 hover:bg-tint/35 hover:text-ink active:scale-95"
              onClick={toggleTheme}
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              title={isDark ? 'Modo claro' : 'Modo escuro'}
            >
              <span className="relative block h-5 w-5">
                <Sun
                  className={`absolute inset-0 h-5 w-5 transition duration-500 ${
                    isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
                <Moon
                  className={`absolute inset-0 h-5 w-5 transition duration-500 ${
                    isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </span>
            </button>
            <a
              href="#receitas"
              className="hidden rounded-lg bg-btn px-5 py-3 text-sm font-extrabold text-btn-fg shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-btn-hover active:translate-y-0 active:scale-[0.97] md:inline-flex"
            >
              Explorar receitas
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface/70 text-ink transition duration-200 active:scale-95 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="animate-menu mx-auto mt-2 max-w-7xl rounded-lg border border-line/70 bg-raised p-3 shadow-glass md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 font-bold text-ink-soft transition duration-200 hover:bg-tint/35 hover:text-ink"
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
