export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      boxShadow: {
        soft: '0 30px 60px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};
