/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'main-bg': '#FAFAFA',
        'main-dark-bg': '#17191B',
        'secondary-dark-bg': '#111315',
        'tertiary-dark-bg': '#26272E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      textColor: {
        'primary-black': '#1E1E1E',
        'primary-grey': '#797979',
        'secondary-grey': '#848995',
      },
      colors: {
        'dark-blue': '#2E4284',
        'primary-blue': '#2E4BAD',
        'secondary-blue': '#8E9ED7',
        'light-blue': '#C6CFEB',
        'success': "#047857",
      }
    },
  },
  plugins: [],
};
