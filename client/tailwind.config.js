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
        primary: '#004F98',
        'dark-bg': '#121212',
        'dark-secondary': '#1e1e1e',
        'dark-surface': '#2d2d2d',
        'dark-hover': '#3d3d3d',
        'light-bg': '#ffffff',
        'light-secondary': '#f3f4f6',
        'light-surface': '#ffffff',
        'light-hover': '#f9fafb',
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
