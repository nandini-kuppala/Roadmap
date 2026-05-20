/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        surface: '#1a1a2e',
        'surface-2': '#16213e',
        'surface-3': '#0f3460',
        accent: '#00d4aa',
        'accent-dark': '#00a882',
        'accent-light': '#33ddb8',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        border: '#2d2d4e',
        'border-light': '#3d3d5e',
        error: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
        'easy': '#00b8a3',
        'medium': '#ffc01e',
        'hard': '#ff375f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4aa33' },
          '100%': { boxShadow: '0 0 20px #00d4aa66, 0 0 40px #00d4aa33' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #00d4aa, #0ea5e9)',
        'gradient-dark': 'linear-gradient(180deg, #1a1a2e 0%, #0f0f0f 100%)',
      },
    },
  },
  plugins: [],
};
