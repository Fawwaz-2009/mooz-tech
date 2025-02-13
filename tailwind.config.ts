import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import scrollbarHide from "tailwind-scrollbar-hide";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        'dark-blue': '#596E80',

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",

        big: '32px',
        small: '12px',
      },
      fontFamily: {
        bangers: ["var(--font-bangers)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        graphik: ["Graphik", "sans-serif"],
        sans: ['"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        'big-1': ['32px', {
          lineHeight: '40px',
        }],
        'big-2': ['28px', {
          lineHeight: '35px',
        }],
        'medium-1': ['20px', {
          lineHeight: '30px',
        }],
        'medium-2': ['24px', {
          lineHeight: '28px',
        }],
        'small-1': ['18px', {
          lineHeight: '30px',
        }],
        'small-2': ['16px', {
          lineHeight: '24px'
        }],
        'small-3': ['12px', {
          lineHeight: '12px'
        }]
      },
      textColor: {
        'dark-blue': '#596E80',
        'light-blue': '#E9F5FF',
        'dark-red': '#806259',
        'light-red': '#FFC4B2',
        'dark-gray': '#727272',
        'light-gray': '#F7F7F9',
      },
      screens: {
        'xl': '1200px',
      }
    },
  },
  plugins: [animate, scrollbarHide],
} satisfies Config;

export default config;
