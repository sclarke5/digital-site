<template>
  <div v-editable="blok">
    <!-- <h1 class="text-white text-5xl case-studies-title">Case studies</h1> -->
    <div class="flex"></div>
    <div class="dot-pattern"></div>
    <h2 class="text-white text-5xl case-studies-sub">Case Studies</h2>
    <ul class="flex flex-col py-6 mb-6 case-studies-list">
      <li
        v-for="caseStudy in sortedCaseStudies" 
        :key="caseStudy._uid"
        class="flex-auto px-6" 
        style="min-width: 33%">
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"
          :case-studies-list="sortedCaseStudies" />
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
h1 {
  transform: rotate(90deg);
  text-transform: uppercase;
  font-family: 'Gotham', sans-serif;
  font-weight: 800;
  margin-right: -12em;
}

.case-studies-sub {
  transform: rotate(90deg);
  margin-left: 13em;
  margin-bottom: 10em;
  text-transform: uppercase;
  font-family: 'Gotham', sans-serif;
  font-weight: 800;
}

.dot-pattern {
  /* margin-top: -30em;
	height: 700px;
  margin-left: 35em;
	z-index: -30; 
	background-image: radial-gradient(circle at 1px 1px, white 4px, transparent 0);
	background-size: 40px 40px; */
}

  .case-study-teaser {
    scroll-snap-align: center;
  }
</style>