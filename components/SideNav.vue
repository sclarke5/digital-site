<template>
  <div id="sideNav" class="sideNav-container hidden laptop:flex">
    <div
      id="home-sideNav"
      class="ribbon bg-black text-white"
      @click="homeScroll"
    >
      <div class="font-dinProBlack ribbon-text current">Home</div>
    </div>
    <div
      id="about-sideNav"
      class="ribbon bg-black text-white"
      @click="aboutScroll"
    >
      <div class="font-dinProBlack ribbon-text">About Us</div>
    </div>
    <div
      id="work-sideNav"
      class="ribbon bg-black text-white"
      @click="caseStudyScroll"
    >
      <div class="font-dinProBlack ribbon-text">Our Work</div>
    </div>
    <div
      id="contact-sideNav"
      class="ribbon bg-black text-white"
      @click="contactScroll"
    >
      <div class="font-dinProBlack ribbon-text">Contact Us</div>
    </div>
  </div>
</template>

<script>
import { scrollToSection } from '../mixins'
// let aboutSideNav, workSideNav, contactSideNav

export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      document
        .getElementById('scrollEl')
        .addEventListener('scroll', this.onScrollNav, false)

      // aboutSideNav = document.getElementById('about-sideNav')
      // workSideNav = document.getElementById('work-sideNav')
      // contactSideNav = document.getElementById('contact-sideNav')
    },
    onScrollNav() {
      if (window.innerWidth >= 800) {
        const homeContainer = document.getElementById('spacer')
        const aboutUsContainer = document.getElementById('aboutUs-marker')
        const contactContainer = document.getElementById('contact-marker')
        const caseStudyWrapper = document.getElementsByClassName(
          'case-studies-wrapper'
        )[0]
        const caseStudyHeader =
          document.getElementsByClassName('case-study-icons')[0]

        const sideNavText = document.querySelectorAll('.ribbon-text')

        if (this.isElementInViewport(homeContainer)) {
          sideNavText[0].classList.add('current')
          sideNavText[1].classList.remove('current')
          sideNavText[2].classList.remove('current')
          sideNavText[3].classList.remove('current')
        } else if (this.isElementInViewport(aboutUsContainer)) {
          sideNavText[1].classList.add('current')
          sideNavText[2].classList.remove('current')
          sideNavText[3].classList.remove('current')
          sideNavText[0].classList.remove('current')
        } else if (this.isElementInViewport(contactContainer)) {
          sideNavText[3].classList.add('current')
          sideNavText[1].classList.remove('current')
          sideNavText[0].classList.remove('current')
          sideNavText[2].classList.remove('current')
        } else if (
          this.isElementInViewport(caseStudyWrapper) ||
          this.isElementInViewport(caseStudyHeader)
        ) {
          sideNavText[2].classList.add('current')
          sideNavText[0].classList.remove('current')
          sideNavText[1].classList.remove('current')
          sideNavText[3].classList.remove('current')
        } else {
          sideNavText[1].classList.remove('current')
          sideNavText[0].classList.remove('current')
          sideNavText[2].classList.remove('current')
          sideNavText[3].classList.remove('current')
        }
      }
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
    homeScroll() {
      scrollToSection(document.querySelector('#spacer'))
    },
    aboutScroll() {
      scrollToSection(document.querySelector('#aboutUs-marker'))
    },
    caseStudyScroll() {
      scrollToSection(document.querySelector('#case-studies'))
    },
    contactScroll() {
      scrollToSection(document.querySelector('#contact-marker'))
    },
  },
}
</script>

<style scoped>
.move {
  transform: translate(calc(-100vw + 8rem), 0);
}

#sideNav {
  position: fixed;
  top: 0;
  right: 0;
  background-color: none;
  z-index: 1001;
  height: 100%;
}

.ribbon {
  border-left: 0.25px solid white;
  border-right: 0.25px solid white;
  padding: 0.5rem 0.25rem;
  width: 2rem;
  transition: 0.25s all linear;
  cursor: pointer;
}

.ribbon:hover {
  background: black padding-box,
    linear-gradient(0deg, rgba(255, 78, 0, 1) 0%, rgba(48, 214, 217, 1) 100%);
}
.ribbon-text {
  height: 100%;
  width: 100%;
  text-align: center;
  white-space: pre;
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.ribbon-text:hover,
.ribbon:hover .ribbon-text {
  background: linear-gradient(
    0deg,
    rgba(255, 78, 0, 1) 45%,
    rgba(48, 214, 217, 1) 55%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
}

.ribbon-text.current {
  background: linear-gradient(
    0deg,
    rgba(255, 78, 0, 1) 45%,
    rgba(48, 214, 217, 1) 55%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
