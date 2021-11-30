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
    // fontFamily: {
    //   body: ['Gotham Book', 'sans-serif'],
    //   primaryHeadline: ['Gotham Ultra', 'sans-serif'],
    //   subHeadline: ['DINPro', 'sans-serif'],
    //   specialCase: ['Adobe Cason Pro', 'sans-serif'],
    // },
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
