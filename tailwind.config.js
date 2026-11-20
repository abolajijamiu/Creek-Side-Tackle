/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './guide.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spruce: '#1F3D2E', night: '#14281E', lake: '#2B6077', deeplake: '#173C4B', moss: '#5E7A49', glacier: '#A9C9CF',
        driftwood: '#B8956A', bobber: '#C2412A', granite: '#24292A', stone: '#636A60', birch: '#F2F1E9', paper: '#FBFBF7',
        mist: '#E2EAE6', kraft: '#D8C6A6',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        sans: ['Barlow', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
