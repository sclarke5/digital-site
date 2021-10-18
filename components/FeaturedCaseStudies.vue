<template>
  <div v-editable="blok">
    <h2 class="pt-2 pl-6 text-white text-5xl">{{ blok.title }}</h2>
    <ul class="flex flex-col py-6 mb-6">
      <li
        v-for="caseStudy in sortedCaseStudies" :key="caseStudy._uid"
        class="flex-auto px-6" style="min-width: 33%">
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"/>
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">This content loads on save. <strong>Save the entry & reload.</strong></p>
      </li>
    </ul>
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
  computed: {
    sortedCaseStudies() {
      const featuredCaseStudies = this.$store.state.caseStudies.caseStudies.filter((caseStudy) => {
        return this.blok.case_studies.includes(caseStudy.uuid)
      })
 

      featuredCaseStudies.sort((a, b) => {
        return this.blok.case_studies.indexOf(a.uuid) - this.blok.case_studies.indexOf(b.uuid);
      })
 
      return featuredCaseStudies
    }
  }
}
</script>

<style scoped>
  h2 {
    transform: rotate(90deg);
    text-transform: uppercase;
    font-family: 'Gotham', sans-serif;
    font-weight: 800;
    margin-right: -12em;
  }
</style>