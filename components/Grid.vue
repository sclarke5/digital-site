<template>
<div class="flex grid-container">
  <div class="flex flex-col grid-left mr-16">
    <h1 class="text-white">{{ title }}</h1>
    <p class="text-white pl-48 pt-8">{{ blurb }}</p>
  </div>
  <div class="flex grid-right">
    <ul
      v-editable="blok"
      class="flex py-8 mb-6">
      <li
        :key="blok._uid"
        v-for="blok in blok.columns"
        class="flex-auto px-6 w-1/3 text-white mr-12">
        <component :blok="blok" :is="blok.component" />
      </li>
    </ul>
  </div>
</div>

</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: "We're human-centered design thinkers who solve business challenges and spark connections.",
      blurb: "Technology is an opportunity to enhance human connection. We tell stories that inspire new audiences, we find tech solutions that serve new markets, and we reveal opportunities that drive new business.",
      archfab_cta: {
        text: 'Looking for architectural fabrication?',
        link: 'https://www.astoundarchfab.com'
      },
      astoundgroup_cta: {
        text: 'Looking for other services?',
        link: 'https://www.astoundgroup.com'
      }
    }
  },
}
</script>

<style scoped>
  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 200vh;
  }

  .grid-left {
    width: 250%;
  }

  .grid-container h1 {
    font-size: 3em;
    font-family: 'Gotham', sans-serif;
    text-transform: uppercase;
    font-weight: 800;
    line-height: 1.1;;
  }

  .grid-container p {
    font-family: 'Gotham', sans-serif;
    font-weight: 300;
  }

</style>