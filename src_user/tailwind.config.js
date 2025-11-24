/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Montserrat', 'sans-serif'], // aplica em tudo
      },
      
      colors: {
        primary: "#003385",   // Azul profundo
        secondary: "#2A629A", // Azul mais claro
        accent: "#FF7E29",    // Laranja vibrante
        highlight: "#FFDA78", // Amarelo pastel
        bg: "#FBF8EF",        // Off-white
        textprimary: "#020233",    // Azul escuro para texto
        textsecondary: "#666680", // Azul médio para texto secundário
        textlight: "#B3B3B2", // Azul claro para texto terciário
      }
    }
  },
  plugins: [],
}
