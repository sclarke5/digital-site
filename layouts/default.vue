<template>
  <div>
    <HeaderAstound />
    <SideNav class="side-nav fixed" />
    <Nuxt id="scrollEl" class="bg-black layout-container" />
    <ThreeScene id="three" />
    <!-- <Footer /> -->
  </div>
</template>

<style>
@import url('http://fonts.cdnfonts.com/css/din-pro');
@import url('http://fonts.cdnfonts.com/css/dinpro-bold');
@import url('http://fonts.cdnfonts.com/css/dinpro-black');
@import url('http://fonts.cdnfonts.com/css/adobe-caslon-pro');

.layout-container {
  margin-top: -20em;
}

.side-nav {
  display: none;
}

@media screen and (min-width: 800px) {
  body {
    overflow-x: hidden;
    overflow-y: hidden;
    background: black;
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
</style>
