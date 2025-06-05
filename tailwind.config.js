/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00FFFF',
        'primary-light': '#66FFFF',
        'primary-dark': '#0099FF',
        'secondary': '#FF6B00',
        'secondary-light': '#FF9640',
        'accent': '#9D00FF',
        'accent-light': '#BE4DFF',
        'bg-dark': '#121212',
        'bg-darker': '#0A0A0A',
        'border': '#2A2A2A',
        'text-light': '#FFFFFF',
        'text-dim': '#CCCCCC',
        'text-dark': '#666666',
      },
      backgroundImage: {
        'gradient-fire': 'linear-gradient(45deg, var(--secondary), var(--secondary-light))',
        'gradient-cyber': 'linear-gradient(45deg, var(--primary), var(--accent))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 'text-shadow': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' },
          'to': { 'text-shadow': '0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #00FFFF' },
        },
      },
    },
  },
  plugins: [],
} 