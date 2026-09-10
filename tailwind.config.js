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
        // Tokens du Design System (Soft UI / Carnet de recherche)
        paper: '#F5F1E8',
        ink: '#1A2A33',
        bay: '#1F4E5F',
        kelp: '#7BA05B',
        amberAccent: '#E8A33D',
        dataBlue: '#3D8B9E',

        // Profondeurs abyssales (fonds sombres & zones océaniques)
        abyss: {
          950: '#010409', // Fosse hadale / noir d'encre absolu
          900: '#030816', // Plaine abyssale (fond principal de l'UI)
          850: '#061024', // Zone bathypélagique (cartes et panneaux sombres)
          800: '#0b1938', // Zone mésopélagique (survol, bordures subtiles)
          700: '#11254e', // Sub-structure sous-marine & séparateurs
          600: '#1a3670', // Bleu profond intermédiaire
        },
        // Accents bioluminescents de créatures et micro-organismes marins
        biolum: {
          cyan: '#00f2fe',     // Cyan électrique bioluminescent
          teal: '#0df5c4',     // Vert phosphorescent abyssal
          blue: '#38bdf8',     // Rayonnement Cherenkov / sonar
          violet: '#818cf8',   // Lueur bathyale ultraviolette
        },
        // Instrumentation Hard Sci-Fi & télémétrie de sous-marin
        sonar: {
          DEFAULT: '#00e5ff',
          pulse: 'rgba(0, 229, 255, 0.4)',
        },
        depth: {
          warning: '#f59e0b', // Jauge d'alerte barométrique / pression
          danger: '#ef4444',  // Alerte brèche de coque
          hull: '#1e293b',    // Alliage titane de la coque
          hud: '#0f172a',     // Fond des cadrans de bord
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        tech: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'abyssal-gradient': 'radial-gradient(ellipse at top, #061024 0%, #030816 55%, #010409 100%)',
        'sonar-grid': 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 1px, transparent 1px)',
      },
      boxShadow: {
        'biolum-cyan': '0 0 20px -3px rgba(0, 242, 254, 0.45)',
        'biolum-teal': '0 0 20px -3px rgba(13, 245, 196, 0.45)',
        'hud': '0 0 0 1px rgba(0, 242, 254, 0.2), 0 8px 24px -4px rgba(1, 4, 9, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sonar-ping': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
