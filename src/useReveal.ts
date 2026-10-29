import { useEffect, type CSSProperties } from 'react';

/** Atraso escalonado (máx. ~420 ms) para elementos animados em sequência. */
export const revealDelay = (index: number): CSSProperties =>
  ({ '--reveal-delay': `${Math.min(index, 6) * 70}ms` }) as CSSProperties;

/**
 * Revela elementos com o atributo `data-reveal` quando entram na tela.
 * Sem IntersectionObserver ou com "reduzir movimento" ativo, nada fica oculto.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          observer.observe(el);
        }
      });
    };

    scan();
    root.classList.add('reveal-ready');

    // Pega elementos que aparecem depois (ex.: cards ao trocar o filtro).
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
