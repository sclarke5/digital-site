<template>
  <header
    class="
      header
      h-24
      fixed
      z-50
      w-screen
      flex
      bg-black
      md:bg-opacity-0
      justify-between
      -top-0
    "
  >
    <div class="header-left">
      <a href="/"
        ><img
          class="company-logo h-full min-w-max"
          src="../assets/Digital__White_-1-removebg-preview.png"
          alt="ASTOUND Group"
      /></a>
    </div>
    <div class="header-right flex">
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
        >
          <li class="nav-item my-6" @click="toggleNav">
            <nuxt-link to="/"> Home </nuxt-link>
          </li>
          <li class="nav-item my-6" @click="toggleNav">
            <nuxt-link to="/about-us">About Us</nuxt-link>
          </li>
          <li class="nav-item my-6" @click="toggleNav">
            <nuxt-link to="/articles"> Blog </nuxt-link>
          </li>

          <li class="nav-item my-6" @click="toggleNav">
            <nuxt-link to="/case-studies">Case Studies</nuxt-link>
          </li>
        </ul>
        <div class="hamburger block cursor-pointer mr-4" @click="toggleNav">
          <span
            class="bar block w-8 h-1 m-1.5 transition-all duration-300 bg-white"
          ></span>
          <span
            class="bar block w-8 h-1 m-1.5 transition-all duration-300 bg-white"
          ></span>
          <span
            class="bar block w-8 h-1 m-1.5 transition-all duration-300 bg-white"
          ></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return { test: 'testtt' }
  },

  methods: {
    toggleNav() {
      const hamburger = document.querySelector('.hamburger')
      const navMenu = document.querySelector('.nav-menu')

      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
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
  transform: translateY(10px) rotate(45deg);
}
.hamburger.active .bar:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

@media screen and (min-width: 800px) {
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
