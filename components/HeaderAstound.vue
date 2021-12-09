<template>
  <header class="header w-screen flex md:bg-opacity-0 justify-between -top-0">
    <div class="header-left h-24">
      <h1 class="h-full">
        <img
          id="header-logo-img"
          class="company-logo h-full min-w-max"
          src="../assets/Digital__White_-1-removebg-preview.png"
          alt="ASTOUND Digital Logo"
        />
      </h1>
    </div>
    <div class="header-right flex h-24">
      <nav class="navbar flex justify-between items-center">
        <ul
          class="
            nav-menu
            fixed
            -right-full
            top-20
            flex-col
            bg-black
            w-full
            text-center
            transition-all
            duration-300
            text-white
          "
          id="mobileNavMenu"
        >
          <li class="nav-item py-4" @click="homeScroll">
            Home
            <!-- <nuxt-link to="/"> Home </nuxt-link> -->
          </li>
          <li class="nav-item py-4" @click="aboutScroll">
            <!-- <nuxt-link to="/about-us">About Us</nuxt-link> -->
            About Us
          </li>
          <li class="nav-item py-4" @click="caseStudyScroll">
            <!-- <nuxt-link to="/case-studies">Case Studies</nuxt-link> -->
            Our Work
          </li>
          <li class="nav-item py-4" @click="contactScroll">
            <!-- <nuxt-link to="/case-studies">Contact Us</nuxt-link> -->
            Contact Us
          </li>
        </ul>
        <div
          class="hamburger block cursor-pointer mr-4"
          id="ham-icon"
          @click="toggleNav"
        >
          <span
            class="
              bar
              block
              w-8
              h-0.5
              m-1.5
              transition-all
              duration-300
              bg-white
            "
          ></span>
          <span
            class="
              bar
              block
              w-8
              h-0.5
              m-1.5
              transition-all
              duration-300
              bg-white
            "
          ></span>
          <span
            class="
              bar
              block
              w-8
              h-0.5
              m-1.5
              transition-all
              duration-300
              bg-white
            "
          ></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { scrollToSection } from '../mixins'

export default {
  data() {
    return { test: 'testtt', toggled: false }
  },
  mounted() {
    window.addEventListener(
      'click',
      (e) => {
        const insideUl = document
          .getElementById('mobileNavMenu')
          .contains(e.target)
        const insideIcon = document
          .getElementById('ham-icon')
          .contains(e.target)

        console.log(insideUl, insideIcon)

        if (insideIcon) {
          e.stopPropagation()
        } else if (!insideIcon && !insideUl && this.toggled) {
          this.toggleNav()
          console.log(this.toggled)
        }
      },
      false
    )
  },
  methods: {
    toggleNav() {
      const hamburger = document.querySelector('.hamburger')
      const navMenu = document.querySelector('.nav-menu')

      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')

      this.toggled = !this.toggled
    },
    homeScroll() {
      scrollToSection(document.querySelector('#three'))
      this.toggleNav()
    },
    aboutScroll() {
      scrollToSection(document.querySelector('#aboutUs-marker'))
      this.toggleNav()
    },
    caseStudyScroll() {
      scrollToSection(document.querySelector('#case-studies-marker'))
      this.toggleNav()
    },
    contactScroll() {
      scrollToSection(document.querySelector('#contact-marker'))
      this.toggleNav()
    },
  },
}
</script>

<style scoped>
.nav-menu.active {
  right: 0;
}
.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.header-right {
  z-index: 1001;
  position: fixed;
  top: 0;
  right: 0;
  background-color: black;
  width: 50%;
  text-align: right;

  /* border-bottom: 1px solid white;
  border-top: 1px solid white; */
  justify-content: flex-end;
}

.header-left {
  width: 50%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  background-color: black;

  /* border-bottom: 1px solid white;
  border-top: 1px solid white; */
}

#header-logo-img {
  transition: 0.5s linear transform;
  transform: translate(2rem, 0);
}

@media screen and (min-width: 800px) {
  .header-right,
  .header-left {
    border: 0;
    background: none;
  }
  .hamburger {
    display: none;
  }
}

li {
  font-family: 'DINPro', sans-serif;
  text-transform: uppercase;
  font-weight: 900;
}

.company-logo {
  object-fit: contain;
}
</style>
