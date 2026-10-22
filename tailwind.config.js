/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#070b14',      // Fondo oscuro profundo tipo panel de control
          card: '#0f172a',      // Superficie de tarjetas
          primary: '#1d4ed8',   // Azul corporativo principal (como el texto ANGPS)
          accent: '#0ea5e9',    // Celeste brillante (como el globo y la flecha del logo)
          glow: '#38bdf8',      // Destello cian para efectos luminosos
        }
      },
      boxShadow: {
        'brand-glow': '0 0 25px -5px rgba(14, 165, 233, 0.3)', // Sombra brillante azulada
        'card-tech': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}