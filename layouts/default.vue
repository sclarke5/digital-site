<template>
  <div>
    <HeaderAstound />
    <Nuxt class="bg-black layout-container"/>
    <!-- <Footer /> -->
  </div>
</template>

<style>
@import url('http://fonts.cdnfonts.com/css/din-pro');
@import url('http://fonts.cdnfonts.com/css/dinpro-bold');
@import url('http://fonts.cdnfonts.com/css/dinpro-black');

  body {
    overflow-x: hidden;
    overflow-y: hidden;
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

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

</style>