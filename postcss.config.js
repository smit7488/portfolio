const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    autoprefixer,
    ...(isProduction
      ? [
          purgecss({
            content: [
              './index.html',
              './src/react-app/**/*.{js,ts,jsx,tsx}', // scan all components
            ],
            safelist: [
              /^btn/,        // Bootstrap buttons
              /^col/,        // Grid
              /^d-/,         // Display helpers
              /^text-/,
              /^bg-/,
              /^shadow/,
              /^rounded/,
              /^carousel/,   // Carousel classes
            ],
            defaultExtractor: content =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
