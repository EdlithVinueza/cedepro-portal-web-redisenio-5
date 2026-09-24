/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cedepro: {
          navy: '#091E3A',
          navyDark: '#061528',
          navyLight: '#0d2d59',
          gold: '#f5a623',
          goldDark: '#c1911e',
          amber: '#e08f09',
          amberDark: '#c67a00',
          amberBg: '#df9417',
          mustard: '#b8860b',
          charcoal: '#1e2229',
          lightBg: '#f8f9fa',
          grayLight: '#eef2f6',
          darkText: '#1a1a1a',
          bodyText: '#4a4a4a',
          grayBorder: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Kohinoor Latin"', 'sans-serif'],
        heading: ['"Kohinoor Latin"', 'sans-serif'],
        kohinoor: ['"Kohinoor Latin"', 'sans-serif'],
        cursive: ['"Kohinoor Latin"', 'sans-serif'],
        signature: ['"Kohinoor Latin"', 'sans-serif'],
        serif: ['"Kohinoor Latin"', 'sans-serif'],
        mono: ['"Kohinoor Latin"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
