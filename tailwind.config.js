/** @type {import('tailwindcss').Config} */
// As cores vêm de variáveis CSS (src/index.css), que mudam entre o tema claro e o escuro.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: token('base'),
        surface: token('surface'),
        tile: token('tile'),
        raised: token('raised'),
        line: token('line'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        muted: token('muted'),
        tint: token('tint'),
        chip: token('chip'),
        panel: token('panel'),
        accent: {
          DEFAULT: token('accent'),
          strong: token('accent-strong'),
          fg: token('accent-fg'),
        },
        btn: {
          DEFAULT: token('btn'),
          fg: token('btn-fg'),
          hover: token('btn-hover'),
        },
        zuzu: {
          olive: token('olive'),
          ink: token('ink'),
        },
      },
      boxShadow: {
        glass: '0 24px 70px rgb(var(--shadow) / var(--sh-glass))',
        soft: '0 14px 30px rgb(var(--shadow) / var(--sh-soft))',
        lift: '0 30px 80px rgb(var(--shadow) / var(--sh-lift))',
        nav: '0 18px 50px rgb(var(--shadow) / var(--sh-nav))',
      },
    },
  },
  plugins: [],
};
