<template>
  <section class="mt-60">
    <h2 class="py-10 text-center font-bold text-4xl text-white">Case Studies Overview</h2>
    {{ caseStudies }}
    <ul class="flex flex-col py-6 mb-6">
      <li
        v-for="caseStudy in stories" :key="caseStudy._uid"
        class="flex-auto px-6" style="min-width: 33%">
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"/>
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">This content loads on save. <strong>Save the entry & reload.</strong></p>
      </li>
    </ul>
  </section>
</template>
 
<script>
export default {
    asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'case-studies/',
      version: 'draft'
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },
  data () {
    return {
      stories: []
    }
  },
}
</script>

<style scoped>
  ul {
    margin-top: 60em;
  }
</style>