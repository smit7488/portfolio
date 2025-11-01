const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss').default;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    autoprefixer,
    ...(isProduction
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
            safelist: [
              /^btn/,
              /^col/,
              /^d-/,
              /^text-/,
              /^bg-/,
              /^shadow/,
              /^rounded/,
              /^carousel/,
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
