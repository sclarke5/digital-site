<template>
  <div id="case-studies-marker" v-editable="blok" class="mt-20 relative">
    <div>
      <div class="sticky-nav">
        <div class="font-dinProBlack">Our Work</div>
      </div>
      <h2 id="case-studies" class="text-white case-studies-sub">
        Our Clients<br />
        & Work
      </h2>
      <div
        class="
          icons-container
          lines-background-case-studies
          case-study-icons
          grid
        "
      >
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/Nike.png" alt="nike" />
        </div>
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/PWC.png" alt="nike" />
        </div>
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/Volkswagen.png" alt="nike" />
        </div>
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/Jordan.png" alt="nike" />
        </div>
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/Shure.png" alt="nike" />
        </div>
        <div class="flex items-center justify-center icon-item fade-in">
          <img class="icon" src="../assets/HBO.png" alt="nike" />
        </div>
      </div>

      <div class="case-studies-wrapper grid">
        <div
          v-for="caseStudy in sortedCaseStudies"
          :key="caseStudy._uid"
          class="h-full case-study-outer-container laptop:justify-center"
        >
          <case-study-teaser
            v-if="caseStudy.content"
            :case-study-link="caseStudy.full_slug"
            :case-study-content="caseStudy.content"
            :case-studies-list="sortedCaseStudies"
            class="from-right"
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
  mounted(){
    const sections = document.querySelectorAll('.from-right')
    const options = { 
      root: null,
      threshold: 0,
      // number between 0-1; with 1, 100% of element must be visible; with 0, any amount of an element will fire
      rootMargin: '0px'
      // above to add margin to the viewport, i.e. opens up 'appear when closer to the middle of the viewport'
     }
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting === true){
          entry.target.classList.add('slide-in')
          observer.unobserve(entry.target)
        } else {
          entry.target.classList.remove('slide-in')
        }
        console.log(entry.target)
      })
    }, options)

    sections.forEach(section => {
      observer.observe(section)
    })
  }
}
</script>

<style>
.from-right {
  opacity: 0;
  transform: translateX(100%);
  transition: transform 1s, opacity 1s ease-in;
}

.from-right.slide-in {
  transform: translateX(0);
  opacity: 1;
}

.fade-in {
  opacity: 0;
  transition: opacity 1s ease-in;
}

.fade-in.appear {
  opacity: 1;
}

.case-studies-sub {
  margin-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.lines-background-case-studies {
  /* background-image: url('../assets/grid.png');
  background-size: contain; */
  background-size: 59.47px 60.2px;
  background-position: 6% 4%;
  background-image: linear-gradient(to right, #3A3B3C 1px, transparent 1px),
    linear-gradient(to bottom, #3A3B3C 1px, transparent 1px);
  background-repeat: repeat;
  margin-top: 1em;
  margin-bottom: 5em;
}

.icons-container {
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  list-style-type: none;
  padding: 1rem 2rem;
}

.bg-shape {
  display: none;
}

.icon-item img {
  padding: 1rem;
}

  .case-studies-wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

@media screen(mobile) {
  #contact-marker {
    min-height: 100vh;
  }
}

@media screen(laptopwh) {
  .case-studies-sub,
  .icons-container,
  .case-studies-wrapper {
    transform: rotate(90deg);
    position: absolute;
  }

  .case-studies-sub {
    top: 78em;
    right: -1.3em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;
    top: 246em;
    right: -2rem;
  }

  .case-studies-wrapper {
    margin-top: 180em;
    margin-bottom: 50em;
    top: 250em;
    right: -114em;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
}

@media screen(laptop2xwh) {
  .case-studies-sub {
    top: 70em;
    right: -1.7em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;
    top: 220em;
    right: -6rem;
  }
  .case-studies-wrapper {
    margin-top: 180em;
    margin-bottom: 50em;
    top: 225em;
    right: -115em;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
}

@media screen(desktopwh) {
  .case-studies-sub,
  .icons-container,
  .case-studies-wrapper {
    transform: rotate(90deg);
    position: absolute;
  }

  .case-studies-sub {
    top: 83em;
    right: 0.3em;
  }

  .lines {
    margin-left: -12em;
    width: 100%;
  }

  .icons-container {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    list-style-type: none;
    padding: 2rem 10rem;
    margin-left: 25em;
    width: 800px;
    top: 256em;
    right: 5rem;
  }

  .case-study-outer-container {
    /* scroll-snap-align: start; */
    margin-right: 5em;
  }

  .case-studies-wrapper {
    margin-top: 120em;
    margin-bottom: 50em;
    top: 335em;
    right: -124em;
    width: max-content;
  }

  .bg-shape {
    display: block;
    width: 300px;
    position: absolute;
    z-index: -1;
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
