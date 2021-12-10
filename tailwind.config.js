/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      flatBlue: '#1dade4',
      turqoise: '#30d6d9',
      matteGreen: '#727d4f',
      intlOrange: '#ff4e00',
      white: '#fff',
      black: '#000',
    },
    extend: {
      fontFamily: {
        body: ['Gotham Book', 'sans-serif'],
        primaryHeadline: ['Gotham Ultra', 'sans-serif'],
        subHeadline: ['DINPro', 'sans-serif'],
        specialCase: ['Adobe Caslon Pro', 'sans-serif'],
      },
      screens: {
        mobile: { raw: '(max-width: 1024px)' },
        laptop: { raw: '(min-width: 1025px)' },
        laptopwh: { raw: '(min-width: 1025px) and (max-height:800px)' },
        // laptop is for shorter than 800px
        desktopwh: { raw: '(min-width: 1025px) and (min-height:801px)' },
        // longer than 800px, same width as laptop
        laptop2xwh: {
          raw: '(min-width: 1025px) and (max-height:800px) and (-webkit-device-pixel-ratio: 1.5)',
        },
        // laptop is for shorter than 800px
        desktop2xwh: {
          raw: '(min-width: 1025px) and (min-height:801px) and (-webkit-device-pixel-ratio: 1.5)',
        },
        desktopxl: { raw: '(min-width: 1400px)' },
        desktop2xl: { raw: '(min-width: 1400px)' },
        // longer than 800px, same width as laptop
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
