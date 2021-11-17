<template>
  <div v-editable="blok" class="mt-20">
    <!-- <h1 class="text-white text-5xl case-studies-title">Case studies</h1> -->
    <div class="flex"></div>
    <!-- <div class="dot-pattern"></div> -->
    <h2 class="text-white text-5xl case-studies-sub px-6">Case Studies</h2>
    <!-- <img class="lines" src="../assets/bad-grid.jpg" /> -->
    <div class="icons-container lines-background">
      <div class="flex items-center justify-center">
        <img src="../assets/nike-icon.png" alt="nike">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/stryker-icon.png" alt="stryker">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/astound-icon.webp" alt="astound">
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/hbo-icon.png" alt="hbo">
      </div>
    </div>

    <div class="case-studies-wrapper">
      <div 
        v-for="caseStudy in sortedCaseStudies" 
        :key="caseStudy._uid"
        class="flex h-full case-study-outer-container">
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"
          :case-studies-list="sortedCaseStudies" />
      </div>
    </div>
    <!-- <ul class="flex flex-col case-studies-list">
      <li
        v-for="caseStudy in sortedCaseStudies" 
        :key="caseStudy._uid"
        class="flex-auto px-6 case-studies-list-item" 
        style="min-width: 33%">
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"
          :case-studies-list="sortedCaseStudies" />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">This content loads on save. <strong>Save the entry & reload.</strong></p>
      </li>
    </ul> -->
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

<style>

.case-studies-sub {
  text-transform: uppercase;
  font-family: 'Gotham', sans-serif;
  font-weight: 800;
}

.lines-background {
  background-image: url("../assets/bad-grid.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 1em;
}

.icons-container {
  display: grid;
	grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
	list-style-type: none;
	padding-left: 0;

  
}

@media screen and (min-width: 800px) {
  .case-studies-sub {
    transform: rotate(90deg);
    margin-left: 13em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    transform: rotate(90deg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    list-style-type: none;
    padding-left: 0;
    margin-right: 8em;
  }

  .case-study-outer-container:nth-child(even) .case-study-container {
    margin-top: 20em;
  }

  .close {
    position: absolute;
  }

  .case-study-outer-container:nth-child(odd) .close {
    /* position: absolute; */
    top: -17em;
    right: -10em;  
  }

  .case-study-outer-container:nth-child(even) .close {
    /* position: absolute; */
    top: 28em;
    right: -10em;  
  }

  .case-study-outer-container:nth-child(even) .modal {
    top: 400px;
  }

  .case-study-outer-container:nth-child(odd) .modal {
    top: -300px;
  }


  .case-study-outer-container:nth-child(odd) .modal .close {
    top: -17em;
    right: -10em;  
  }

  .case-studies-wrapper {
    display: grid;
    grid-template-columns: 2fr 2fr;
    margin-top: 50em;
    margin-bottom: 50em;
    grid-gap: 20px;
  }
}

.icon {
  position: relative;
  width: 300px;
}

  .case-study-teaser {
    scroll-snap-align: center;
  }
</style>