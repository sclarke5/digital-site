<template>
  <div>
    <HeaderAstound />
    <DummyModal />
    <SideNav />
    <ThreeScene id="three" />
    <Nuxt id="scrollEl" class="layout-container" />
    <!-- <Footer /> -->
  </div>
</template>
<script>
let direction = ''

export default {
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      document
        .getElementById('scrollEl')
        .addEventListener('wheel', this.windowScroll, false)

      document
        .getElementById('scrollEl')
        .addEventListener('scroll', this.windowScroll, false)
    },
    isElementInViewport(elem) {
      const rect = elem.getBoundingClientRect()

      // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth

      // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
      const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
      const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

      return vertInView && horInView
    },
    windowScroll(e) {
      const aboutUsContainer = document.getElementById('aboutUs-marker')
      const contactContainer = document.getElementById('contact-marker')
      const caseStudyWrapper = document.getElementsByClassName(
        'case-studies-wrapper'
      )[0]
      const caseStudyHeader =
        document.getElementsByClassName('case-study-icons')[0]

      const aboutSideNav = document.getElementById('about-sideNav')
      const workSideNav = document.getElementById('work-sideNav')
      const contactSideNav = document.getElementById('contact-sideNav')

      if (e.deltaY < 0) {
        direction = 'up'
      } else if (e.deltaY > 0) {
        direction = 'down'
      }

      if (direction === 'down') {
        if (this.isElementInViewport(aboutUsContainer)) {
          console.log('about us in in view')
          aboutSideNav.classList.add('move')
        } else if (
          this.isElementInViewport(caseStudyWrapper) ||
          this.isElementInViewport(caseStudyHeader)
        ) {
          console.log('case studies in in view')
          workSideNav.classList.add('move')
        } else if (this.isElementInViewport(contactContainer)) {
          console.log('contact is in view')
          contactSideNav.classList.add('move')
        }
      } else if (direction === 'up') {
        if (this.isElementInViewport(aboutUsContainer)) {
          console.log('about us in in view')
          aboutSideNav.classList.remove('move')
        } else if (
          this.isElementInViewport(caseStudyWrapper) ||
          this.isElementInViewport(caseStudyHeader)
        ) {
          console.log('case studies in in view')
          workSideNav.classList.remove('move')
        } else if (this.isElementInViewport(contactContainer)) {
          console.log('contact is in view')
          contactSideNav.classList.remove('move')
        }
      }
    },
  },
}
</script>

<style>
/* @import url('http://fonts.cdnfonts.com/css/din-pro');
@import url('http://fonts.cdnfonts.com/css/dinpro-bold');
@import url('http://fonts.cdnfonts.com/css/dinpro-black');
@import url('http://fonts.cdnfonts.com/css/adobe-caslon-pro'); */

/* .layout-container {
  margin-top: -20em;
} */

.sticky-nav {
  display: none;
}

@media screen and (max-width: 799px) {
  .sticky-nav {
    /* border: 1px solid white; */
    display: block;
    position: -webkit-sticky;
    position: sticky;
    background-color: black;
    top: 0;
    z-index: 50;
    width: 100%;
    margin-bottom: 3rem;
    height: 6rem;
  }

  .sticky-nav > span {
    z-index: 0;
  }

  .sticky-nav h2 {
    /* background-color: black; */
    width: 50%;
    color: white;
  }

  .sticky-nav > * {
    /* flex-grow: 1; */
    padding: 2rem 1rem;
  }
}

.side-nav {
  display: none;
}
body {
  background: black;
}

@media screen and (min-width: 800px) {
  body {
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .layout-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;

    /* width: 100vh; */
    height: 100vw;
    transform: rotate(-90deg);

    /* position: absolute; */
    bottom: -30em;
    will-change: transform;
  }
  #scrollEl {
    background: none;
  }

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  #three {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}

h1,
h3,
h5,
h6,
.font-gothamUltra {
  font-family: 'Gotham Ultra', sans-serif;
  text-transform: uppercase;
}

h1 {
  font-size: 3em;
  line-height: 1em;
}

h3 {
  font-size: 2em;
  line-height: 1em;
}

h2,
h4,
.font-dinProBlack {
  font-family: 'DINPro', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
}

p,
li,
input,
textarea,
.font-gothamBook,
label,
button {
  font-family: 'Gotham Book', sans-serif;
}

p {
  font-size: 1rem;
}
</style>
