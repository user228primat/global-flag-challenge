
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0D0D0D',
          dark: '#121212'
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          muted: 'rgba(255,255,255,0.7)'
        },
        card: {
          DEFAULT: '#1B1B1B',
          dark: '#121212'
        }
      },
      boxShadow: {
        'elegant': '0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.1)'
      },
      animation: {
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
