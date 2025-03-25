/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ingobyi-blue': {
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e7',
          300: '#66a5db',
          400: '#3387cf',
          500: '#004f98', // rgb(0, 79, 152)
          600: '#003f7a',
          700: '#002f5b',
          800: '#00203d',
          900: '#00101e',
        },
        'dark-bg': '#121212',
        'dark-secondary': '#1e1e1e',
        'dark-surface': '#2d2d2d',
        'dark-hover': '#3d3d3d',
        'light-bg': '#ffffff',
        'light-secondary': '#f3f4f6',
        'light-surface': '#ffffff',
        'light-hover': '#f9fafb',
        'academy-blue': {
          50: '#e6edf7',
          100: '#ccdaef',
          200: '#99b5df',
          300: '#668fcf',
          400: '#336abf',
          500: '#00308F', // US Air Force Academy blue
          600: '#002872',
          700: '#001f56',
          800: '#001539',
          900: '#000c1d',
        }
      },
      backgroundColor: {
        'card': 'var(--bg-card)',
        'input': 'var(--bg-input)',
        'button': 'var(--bg-button)',
      },
      textColor: {
        'primary-text': 'var(--text-primary)',
        'secondary-text': 'var(--text-secondary)',
      },
      borderColor: {
        'default': 'var(--border-default)',
        'focus': 'var(--border-focus)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
