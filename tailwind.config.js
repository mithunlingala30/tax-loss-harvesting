/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1210",
          900: "#0F1B17",
          800: "#16241F",
          700: "#1E322B",
          600: "#2A4139",
        },
        mint: {
          50: "#EAFBF3",
          100: "#CFF7E4",
          200: "#9FEECB",
          300: "#65DEAB",
          400: "#33C98D",
          500: "#14B87A",
          600: "#0B9C67",
          700: "#0A7E55",
        },
        coral: {
          50: "#FDEEEC",
          100: "#FBD8D3",
          400: "#F17A6B",
          500: "#E85B49",
          600: "#CB4433",
        },
        sand: {
          50: "#F7F5EF",
          100: "#EFEBDF",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 27, 23, 0.06), 0 8px 24px -12px rgba(15, 27, 23, 0.18)",
        pop: "0 12px 32px -8px rgba(15, 27, 23, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}

