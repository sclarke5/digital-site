<template>
  <div class="border border-gray-500 py-64">
    <PageHeading />
    <nuxt-link
      to="/about-us"
      class="text-blue-400 hover:text-blue-600 p-4 text-xl"
      >About</nuxt-link
    >
    <ButtonCta v-for="(cta, index) in ctas" :key="index">
      {{ cta.title }}
    </ButtonCta>
  </div>
</template>

<script>
export default {
  data: () => ({
    ctas: [
      {
        title: 'hello',
      },
      {
        title: 'elo',
      },
    ],
  }),
}
</script>
