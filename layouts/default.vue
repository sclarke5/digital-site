<template>
  <div>
    <HeaderAstound />
    <DummyModal />
    <SideNav class="side-nav fixed" />
    <ThreeScene id="three" />
    <Nuxt id="scrollEl" class="layout-container" />
    <!-- <Footer /> -->
  </div>
</template>

<style>
/* @import url('http://fonts.cdnfonts.com/css/din-pro');
@import url('http://fonts.cdnfonts.com/css/dinpro-bold');
@import url('http://fonts.cdnfonts.com/css/dinpro-black');
@import url('http://fonts.cdnfonts.com/css/adobe-caslon-pro'); */

/* .layout-container {
  margin-top: -20em;
} */

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

  .side-nav {
    display: block;
    transform: rotate(-90deg);
    left: 50vw;
    top: 50vh;
    margin-left: -8em;
  }

  .layout-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 100vh;

    /* width: 100vh; */
    height: 200vh;
    transform: rotate(-90deg);
    position: absolute;
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
h6 {
  font-family: 'Gotham Ultra', sans-serif;
  text-transform: uppercase;
}

h2,
h4 {
  font-family: 'DINPro', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
}

p,
li {
  font-family: 'Gotham Book', sans-serif;
}
</style>
