<template>
  <div v-editable="blok" class="mt-20 relative" id="case-studies-marker">
    <div>
      <div class="sticky-nav">
        <div class="font-dinProBlack">Our Work</div>
      </div>
      <h2 class="text-white case-studies-sub" id="case-studies">
        Our <br />
        Work
      </h2>
      <div
        class="icons-container lines-background-case-studies case-study-icons"
      >
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
    <Contact id="contact-marker" />
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
}
</script>

<style>
.case-studies-sub {
  margin-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.lines-background-case-studies {
  background-image: url('../assets/grid.png');
  background-size: contain;
  background-repeat: repeat;
  margin-top: 1em;
  margin-bottom: 5em;
}

.case-study-container {
  padding: 1.5em;
}

.icons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  list-style-type: none;
  padding: 1rem 2rem;
}

.bg-shape {
  display: none;
}

@media screen and (min-width: 800px) and (max-height: 800px) {
  .case-studies-sub {
    transform: rotate(90deg);
    position: absolute;
    top: 60em;
    right: 0.4em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    transform: rotate(90deg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;

    /* width: fit-content; */
    position: absolute;
    top: 187em;
    right: 0;
  }
  .case-studies-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    margin-top: 180em;
    margin-bottom: 50em;
    transform: rotate(90deg);
    position: absolute;
    top: 180em;
    right: -100em;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
}

@media screen and (min-width: 800px) and (max-height: 800px) and (-webkit-device-pixel-ratio: 1.5) {
  .case-studies-sub {
    transform: rotate(90deg);
    position: absolute;
    top: 60em;
    right: -1.2em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    transform: rotate(90deg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;

    /* width: fit-content; */
    position: absolute;
    top: 187em;
    right: 0;
  }
  .case-studies-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    margin-top: 180em;
    margin-bottom: 50em;
    transform: rotate(90deg);
    position: absolute;
    top: 190em;
    right: -105em;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
}

@media screen and (min-width: 800px) and (min-height: 801px) {
  .case-studies-sub {
    transform: rotate(90deg);
    position: absolute;
    top: 60em;
    right: 1.8em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    transform: rotate(90deg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;

    /* width: fit-content; */
    position: absolute;
    top: 187em;
    right: 8em;
  }

  .case-study-container {
    padding: 0;
  }

  .case-study-outer-container {
    /* scroll-snap-align: start; */
    margin-right: 5em;
  }

  .case-studies-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    margin-top: 120em;
    margin-bottom: 50em;
    transform: rotate(90deg);
    position: absolute;
    top: 250em;
    right: -100.5em;
    width: max-content;
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
  width: 100%;
  max-width: 300px;
}

.featured-cases-container {
  position: absolute;
  top: 600em;
  right: 15em;
}

/* .case-study-outer-container {
  scroll-snap-align: start;
  margin-right: 3em;
} */
</style>
