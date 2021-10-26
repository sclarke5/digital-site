<template>
  <header class="header fixed z-50 w-screen flex bg-black">
    <ul class="flex flex-col test bg-black">
      <li class="ribbon flex about" @click="aboutScroll">
        <h1>About Us</h1>
      </li>
      <li class="ribbon flex" @click="servicesScroll">
        <h1>Services</h1>
      </li>
      <li class="ribbon flex" @click="caseStudyScroll">
        <h1>Case Studies</h1>
      </li>
      <li class="ribbon flex">
        <h1>Contact Us</h1>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
    methods: {
      aboutScroll() {
        const aboutUs = document.querySelector('.about-us-content')

        aboutUs.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'center'
        });
      },
      servicesScroll() {
        const services = document.querySelector('.grid-container')

        services.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'center'
        });
      },
      caseStudyScroll() {
        const caseStudyTeaser = document.querySelector('.case-study-teaser')

        caseStudyTeaser.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'center'
        });
      }
    },
}

</script>

<style scoped>
  .header {
    /* height: 9.5em; */
  }
  .test {
    border-top: 1px solid white;
    text-align: center;
    position: absolute;
    width: 100%;
  }
  .ribbon {
    justify-content: center;
    align-items: center;
    height: 2em;
    text-transform: uppercase;
    border-bottom: 1px solid white;
    color: white;
    cursor: pointer;
  }
</style>