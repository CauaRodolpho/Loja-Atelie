/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#e953cd',    // A tua cor viva de destaque para títulos, botões e ícones
          soft: '#f3a3be',    // Rosa pastel intermédio para bordas ou hovers
          bg: '#fff0f3',      // Fundo suave de toda a página (off-white rosado)
          dark: '#2d1b22',    // Vinho/Marrom escuro para texto principal (em vez de preto puro)
          card: '#ffffff',    // Fundo branco puro para os cards e modals[cite: 2]
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}