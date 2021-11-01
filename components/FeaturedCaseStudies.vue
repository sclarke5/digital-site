<template>
  <div v-editable="blok">
    <!-- <h1 class="text-white text-5xl case-studies-title">Case studies</h1> -->
    <div class="flex"></div>
    <!-- <div class="dot-pattern"></div> -->
    <h2 class="text-white text-5xl case-studies-sub">Case Studies</h2>
    <img class="lines" src="../assets/bad-grid.jpg" />
    <div class="icons-container">
      <div class="flex items-center justify-center">
        <img src="../assets/nike-icon.png" alt="nike">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/stryker-icon.png" alt="nike">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/astound-icon.webp" alt="nike">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/hbo-icon.png" alt="nike">
      </div>
    </div>

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

  /* margin-bottom: 10em; */
  text-transform: uppercase;
  font-family: 'Gotham', sans-serif;
  font-weight: 800;
}

.lines {
    margin-left: -12em;
    width: 80%;
    margin-top: -30em;

    /* margin-bottom: 5em;
    height: 800px; */
}

.icons-container {
  transform: rotate(90deg);
  display: grid;

  /* grid-template-columns: repeat(auto-fit, minmax(400px, 2fr)); */
	grid-template-columns: repeat(auto-fit, 400px 400px);
  grid-gap: 50px;
	list-style-type: none;
	padding-left: 0;
  margin-right: 10em;
  margin-top: -25em;
}

.icon {
  position: relative;
  width: 300px;
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