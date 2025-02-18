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
        caveat: ["Caveat", 'cursive'],
      },
      fontSize: {
        'big-0': ['36px', {
          lineHeight: '45px',
        }],
        'big-1': ['32px', {
          lineHeight: '40px',
        }],
        'big-2': ['28px', {
          lineHeight: '35px',
          letterSpacing: '-0.4px',
        }],
        'big-3': ['24px', {
          lineHeight: '40px',
        }],
        'big-4': ['24px', {
          lineHeight: '36px',
        }],
        'big-5': ['16px', {
          lineHeight: '16px',
        }],
        'medium-1': ['20px', {
          lineHeight: '30px',
          letterSpacing: '-0.4px',
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
      },
      keyframes: {
        // Projects Card
        rocket: {
          '0%': {
            transform: 'translateX(-50%) translateY(0)'
          },
          '50%': {
            transform: 'translateX(-50%) translateY(-128px)'
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-240px)'
          }
        },
        moon: {
          '0%': {
            transform: 'translateX(-50%) rotate(0deg)'
          },
          '25%': {
            transform: 'translateX(-50%) rotate(30deg)'
          },
          '50%': {
            transform: 'translateX(-50%) rotate(60deg)'
          },
          '75%': {
            transform: 'translateX(-50%) rotate(90deg)'
          },
          '100%': {
            transform: 'translateX(-50%) rotate(120deg)'
          },
        },
        code: {
          '0%': {
            transform: 'translateX(-50%) translateY(0)'
          },
          '25%': {
            transform: 'translateX(-50%) translateY(-48px)'
          },
          '50%': {
            transform: 'translateX(-50%) translateY(-128px)'
          },
          '75%': {
            transform: 'translateX(-50%) translateY(-256px)'
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-312px)'
          }
        },
        codeLoop: {
          '0%': {
            transform: 'translateX(-50%) translateY(-128px)'
          },
          '25%': {
            transform: 'translateX(-50%) translateY(-200px)'
          },
          '50%': {
            transform: 'translateX(-50%) translateY(-326px)'
          },
          '75%': {
            transform: 'translateX(-50%) translateY(-510px)'
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-712px)'
          }
        },

        // Writings Card
        hand: {
          '0%': {
            transform: 'translateX(0) translateY(0)'
          },
          '11%': {
            transform: 'translateX(90px) translateY(-30px) rotate(-10deg)'
          },
          '22%': {
            transform: 'translateX(200px) translateY(20px) rotate(10deg)'
          },
          '33%': {
            transform: 'translateX(300px) translateY(0) rotate(0deg)'
          },
          '55%': {
            transform: 'translateX(0px) translateY(60px) rotate(0deg)'
          },
          '66%': {
            transform: 'translateX(205px) translateY(60px) rotate(0deg)'
          },
          '75%': {
            transform: 'translateX(0px) translateY(115px) rotate(0deg)'
          },
          '83%': {
            transform: 'translateX(160px) translateY(135px) rotate(10deg)'
          },
          '92%': {
            transform: 'translateX(280px) translateY(115px) rotate(0deg)'
          },
          '100%': {
            transform: 'translateX(50%) translateY(165px)'
          }
        },
        firstSentence: {
          '0%': {
            transform: 'translateX(0)'
          },
          '33%': {
            transform: 'translateX(90px) translateY(0px)'
          },
          '66%': {
            transform: 'translateX(200px) translateY(0px)'
          },
          '100%': {
            transform: 'translateX(300px) translateY(0)'
          },
        },
        secondSentence: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(215px) translateY(0)'
          },
        },
        thirdSentence: {
          '0%': {
            transform: 'translateX(0)'
          },
          '50%': {
            transform: 'translateX(160px)'
          },
          '100%': {
            transform: 'translateX(300px) translateY(0)'
          },
        },
      },
      animation: {
        'rocket': 'rocket 1500ms steps(2, end) infinite',
        'moon': 'moon 2s steps(1, end) infinite',
        'code': 'code 2s steps(2, end), codeLoop 2s steps(2, end) infinite 2s',

        'hand': 'hand 3500ms ease-out forwards',
        'first-sentence': 'firstSentence 1100ms ease-out forwards',
        'second-sentence': 'secondSentence 360ms ease-out forwards',
        'third-sentence': 'thirdSentence 700ms ease-out forwards',
      }
    },
  },
  plugins: [animate, scrollbarHide],
} satisfies Config;

export default config;
