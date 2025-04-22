// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1c23',
        darkteal: '#23272f',
        emerald: '#34d399',
        gray: {
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
        },
        red: {
          400: '#f87171',
        },
      },
    },
  },
  plugins: [],
};
