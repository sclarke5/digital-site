<template>
  <ul class="flex space-x-6 text-center bg-blue-400">
    <li v-for="(link, index) in links" :key="index">
      <nuxt-link :to="link.anchor">{{ link.title }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'home',
        anchor: '/',
      },
      {
        title: 'about us',
        anchor: '/about-us',
      },
      {
        title: 'portfolio',
        anchor: '/portfolio',
      },
    ],
  }),
}
</script>
