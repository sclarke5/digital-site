<template>
  <div v-editable="blok" class="mt-20">
    <h2 class="text-white text-5xl case-studies-sub">Case <br/> Studies</h2>
    <div class="icons-container lines-background-case-studies">
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/Nike.png" alt="nike" />
      </div>
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/PWC.png" alt="nike" />
      </div>
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/Volkswagen.png" alt="nike" />
      </div>
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/Jordan.png" alt="nike" />
      </div>
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/Shure.png" alt="nike" />
      </div>
      <div class="flex items-center justify-center icon-item">
        <img class="icon" src="../assets/HBO.png" alt="nike" />
      </div>
    </div>

    <div class="case-studies-wrapper">
      <div
        v-for="caseStudy in sortedCaseStudies"
        :key="caseStudy._uid"
        class="flex h-full case-study-outer-container"
      >
        <case-study-teaser
          v-if="caseStudy.content"
          :case-study-link="caseStudy.full_slug"
          :case-study-content="caseStudy.content"
          :case-studies-list="sortedCaseStudies"
        />
      </div>
      <!-- <img id="triangle" class="bg-shape" src="../assets/triangle.png" />
        <img id="square" class="bg-shape" src="../assets/square.png" />
        <img id="circle" class="bg-shape" src="../assets/circle.png" /> -->
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
      <Contact />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sortedCaseStudies() {
      const featuredCaseStudies =
        this.$store.state.caseStudies.caseStudies.filter((caseStudy) => {
          return this.blok.case_studies.includes(caseStudy.uuid)
        })

      featuredCaseStudies.sort((a, b) => {
        return (
          this.blok.case_studies.indexOf(a.uuid) -
          this.blok.case_studies.indexOf(b.uuid)
        )
      })

      return featuredCaseStudies
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      document
        .getElementById('scrollEl')
        .addEventListener('scroll', this.animateCS, false)

      document
        .getElementById('scrollEl')
        .addEventListener('wheel', this.animateCS, false)
    },
    animateCS() {
    },
  },
}
</script>

<style>
.case-studies-sub {
  text-transform: uppercase;
  font-family: 'Gotham', sans-serif;
  font-weight: 800;
  margin-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.lines-background-case-studies {
  background-image: url('../assets/grid.png');
  background-size: contain;
  margin-top: 1em;
  margin-bottom: 5em;
}

.case-study-container {
  padding: 1.5em;
}

.icons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  list-style-type: none;
  padding-left: 0;
}

.bg-shape {
  display: none;
}

@media screen and (min-width: 800px) {
  .case-studies-sub {
    transform: rotate(90deg);
    margin-left: 13em;
    margin-bottom: -10em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    transform: rotate(90deg);
    display: grid;
    grid-template-columns: 30em 30em;
    grid-gap: 2rem;
    list-style-type: none;
    padding-left: 0;
    margin-left: 25em;
    width: fit-content;
  }

  .icon-item {
    /* width: 50%; */
  }



  .case-study-container {
    padding: 0;
  }

  .case-study-outer-container:nth-child(even) .case-study-container {
    /* margin-top: 20em; */
  }

  .case-study-outer-container:nth-child(odd) {
    /* margin-left: 1em; */
  }

   .case-study-outer-container:nth-child(even) {
    /* margin-left: -1em; */
  }

  .close {
    /* position: absolute; */
  }

  .case-study-outer-container:nth-child(odd) .close {
    /* position: absolute; */
    top: -25em;
    right: -16em;
  }

  .case-study-outer-container:nth-child(even) .close {
    /* position: absolute; */
    top: 23em;
    right: -26em;
  }

  .case-study-outer-container:nth-child(even) .modal {
    top: 5em;
  }

  .case-study-outer-container:nth-child(odd) .modal {
    top: 5em;
  }

  .case-study-outer-container:nth-child(odd) .modal .close {
    top: -17em;
    right: -10em;
  }

  .case-studies-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 60em;
    margin-bottom: 50em;
    transform: rotate(90deg);
  }

  .bg-shape {
    display: block;
    width: 300px;
    position: absolute;
    z-index: -1;
  }

  #triangle {
    left: 10%;
    top: 0%;
  }

  #square {
    left: 50%;
    top: 35%;
    transform: rotate(30deg);
  }

  #circle {
    left: 70%;
    top: 70%;
  }
}

.icon {
  min-width: 100px;
  width: 40%;
  max-width: 300px;
}

.case-study-outer-container {
  /* scroll-snap-align: start; */
}
</style>
