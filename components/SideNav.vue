<template>
  <div id="sideNav" class="sideNav-container">
    <div
      id="about-sideNav"
      class="ribbon bg-black text-white"
      @click="aboutScroll"
    >
      <h2 class="ribbon-text">About Us</h2>
    </div>
    <div
      id="work-sideNav"
      class="ribbon bg-black text-white"
      @click="caseStudyScroll"
    >
      <h2 class="ribbon-text">Our Work</h2>
    </div>
    <div
      id="contact-sideNav"
      class="ribbon bg-black text-white"
      @click="contactScroll"
    >
      <h2 class="ribbon-text">Contact Us</h2>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    aboutScroll() {
      const aboutUs = document.querySelector('.about-container')

      aboutUs.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
    },
    caseStudyScroll() {
      const caseStudyTeaser = document.querySelector('#case-studies')

      caseStudyTeaser.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
    },
    contactScroll() {
      const contactDiv = document.querySelector('#contactContainer')

      contactDiv.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 799px) {
  #sideNav {
    display: none;
  }
}
.move {
  transform: translate(calc(-100vw + 6rem), 0);
}

#sideNav {
  position: fixed;
  top: 0;
  right: 0;
  background-color: none;
  z-index: 1001;
  height: 100%;
}

.sideNav-container {
  display: flex;
}

.ribbon {
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 0.5rem 0.25rem;
  width: 2rem;
  transition: 0.5s all linear;
  cursor: pointer;
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
</style>
