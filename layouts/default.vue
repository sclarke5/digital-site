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
let oldScroll = 0

export default {
  mounted() {
    // this.init()
  },
  methods: {
    init() {
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

      if (e.target.scrollTop > oldScroll) {
        direction = 'up'
      } else if (e.target.scrollTop < oldScroll) {
        direction = 'down'
      }

      oldScroll = e.target.scrollTop

      if (direction === 'up') {
        if (this.isElementInViewport(aboutUsContainer)) {
          aboutSideNav.classList.add('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(4rem,0)'
        } else if (this.isElementInViewport(contactContainer)) {
          contactSideNav.classList.add('move')
          aboutSideNav.classList.add('move')
          workSideNav.classList.add('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(8rem,0)'
        } else if (
          this.isElementInViewport(caseStudyWrapper) ||
          this.isElementInViewport(caseStudyHeader)
        ) {
          workSideNav.classList.add('move')
          aboutSideNav.classList.add('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(6rem,0)'
        }
      } else if (direction === 'down') {
        if (this.isElementInViewport(document.getElementById('spacer'))) {
          aboutSideNav.classList.remove('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(2rem,0)'
        } else if (this.isElementInViewport(aboutUsContainer)) {
          workSideNav.classList.remove('move')
          contactSideNav.classList.remove('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(4rem,0)'
        } else if (
          this.isElementInViewport(caseStudyWrapper) ||
          this.isElementInViewport(caseStudyHeader)
        ) {
          contactSideNav.classList.remove('move')
          document.getElementById('header-logo-img').style.transform =
            'translate(6rem,0)'
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

button {
  border: 2px solid white;
}

@media screen(mobile) {
  .sticky-nav {
    /* border: 1px solid white; */
    display: block;
    position: -webkit-sticky;
    position: sticky;
    background-color: black;
    top: 0;
    z-index: 50;
    width: 100%;
    height: 6rem;
  }

  .sticky-nav > span {
    z-index: 0;
  }

  .sticky-nav > div {
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

@keyframes changeSection {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.changeAnim {
  animation: changeSection 1s linear 0s 1 forwards none;
}

@media screen(laptop) {
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
h2,
h3,
.font-gothamUltra {
  @apply font-primaryHeadline uppercase;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 2.5em;
  line-height: 1em;
  z-index: 100;
}
@media screen(laptop) {
  h2 {
    font-size: 3em;
  }
}

h3 {
  line-height: 1em;
  font-size: 1.75em;
}

h4,
.font-dinProBlack {
  @apply font-subHeadline uppercase font-black;
}

p,
li,
input,
textarea,
.font-gothamBook,
label,
button {
  @apply font-body;
}

p {
  font-size: 1rem;
}
</style>
