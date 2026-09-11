/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Automne, Rouge Brique et Or (Carnet de recherche)
        paper: {
          DEFAULT: '#F7F2E8', // Fond papier parchemin chaud
          light: '#FDFBF7',   // Teinte très douce
          card: '#EDE4D3',    // Fonds des cartes et modules (papier épais)
          muted: '#E0D4C0',   // Papier patiné / séparateurs
        },
        ink: {
          DEFAULT: '#221C18', // Encre bistre profond
          light: '#3B322C',   // Encre bistre adoucie
          muted: '#5C5047',   // Annotations de marge
          faint: '#87776B',   // Repères secondaires
        },
        brick: {
          DEFAULT: '#8C2D19', // Rouge brique minéral (accent principal)
          light: '#A23922',
          dark: '#6E2010',
          50: '#FBF2EF',
          100: '#F6E3DD',
          200: '#ECC4B9',
        },
        gold: {
          DEFAULT: '#D49A3D', // Or patiné / miel chaud
          light: '#DFB060',
          dark: '#B57E26',
          50: '#FAF5EC',
          100: '#F4E8D2',
        },
        rust: {
          DEFAULT: '#B8532F', // Terre cuite / rouille pour états secondaires et survols
          light: '#C96541',
          dark: '#984121',
          50: '#FDF5F1',
          100: '#F9E7DF',
        },
        // Alias de compatibilité pour faciliter l'harmonie des composants
        bay: {
          DEFAULT: '#8C2D19',
          light: '#A23922',
          dark: '#6E2010',
          50: '#FBF2EF',
          100: '#F6E3DD',
          200: '#ECC4B9',
        },
        amber: {
          DEFAULT: '#D49A3D',
          light: '#DFB060',
          dark: '#B57E26',
          50: '#FAF5EC',
          100: '#F4E8D2',
        },
        seaweed: {
          DEFAULT: '#B8532F',
          light: '#C96541',
          dark: '#984121',
          50: '#FDF5F1',
        },
        telemetry: {
          DEFAULT: '#8C2D19',
          light: '#A23922',
          dark: '#6E2010',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        tech: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'paper': '0 2px 8px -2px rgba(34, 28, 24, 0.08), 0 1px 3px -1px rgba(34, 28, 24, 0.04)',
        'paper-md': '0 6px 16px -4px rgba(34, 28, 24, 0.09), 0 2px 6px -1px rgba(34, 28, 24, 0.04)',
        'paper-lg': '0 12px 28px -6px rgba(34, 28, 24, 0.1), 0 4px 12px -2px rgba(34, 28, 24, 0.05)',
        'brick-soft': '0 4px 14px -2px rgba(140, 45, 25, 0.3)',
        'gold-soft': '0 4px 14px -2px rgba(212, 154, 61, 0.3)',
        'rust-soft': '0 4px 14px -2px rgba(184, 83, 47, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
