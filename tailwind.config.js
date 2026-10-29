/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zuzu: {
          cream: '#fffaf0',
          yellow: '#fde68a',
          gold: '#f6c453',
          olive: '#56704b',
          ink: '#211d18',
        },
        stone: {
          650: '#5f5750',
        },
      },
      boxShadow: {
        glass: '0 24px 70px rgba(90, 73, 34, 0.14)',
        soft: '0 14px 30px rgba(107, 83, 32, 0.12)',
      },
    },
  },
  plugins: [],
};
