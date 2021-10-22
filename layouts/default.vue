<template>
  <div>
    <HeaderAstound />
    <Nuxt class="layout-container" id="scrollEl" />
    <ThreeScene id="three" />
    <!-- <Footer /> -->
  </div>
</template>

<style>
body {
  overflow-x: hidden;
  overflow-y: hidden;
  background: black;
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
</style>
