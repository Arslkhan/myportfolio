import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-purple': '#a78bfa',
        'accent-blue': '#60a5fa',
        'accent-green': '#34d399',
      },
      backgroundImage: {
        'gradient-page': 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      },
    },
  },
  plugins: [],
}

export default config
