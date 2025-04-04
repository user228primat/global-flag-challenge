
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
          dark: '#080808',
          card: '#161616'
        },
        foreground: {
          DEFAULT: '#FFFFFF',
          muted: 'rgba(255,255,255,0.7)',
          subtle: 'rgba(255,255,255,0.5)'
        },
        card: {
          DEFAULT: '#1B1B1B',
          dark: '#171717',
          light: '#212121',
          hover: '#252525'
        },
        accent: {
          DEFAULT: '#FFCC00',
          muted: 'rgba(255,204,0,0.8)'
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.1)',
          hover: 'rgba(255,255,255,0.2)'
        }
      },
      boxShadow: {
        'elegant': '0 10px 30px rgba(0, 0, 0, 0.25), 0 4px 15px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.07)',
        'inner-highlight': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
        'button': '0 2px 5px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.12)'
      },
      animation: {
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
