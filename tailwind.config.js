/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00ff00',
          'green-dark': '#008f00',
          'green-dim': '#005500',
          amber: '#ffb000',
          'amber-dark': '#cc8800'
        }
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      animation: {
        blink: 'blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    }
  },
  plugins: []
}
