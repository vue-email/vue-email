/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#007291',
      },
    },
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [
    import('daisyui'),
  ],
}
