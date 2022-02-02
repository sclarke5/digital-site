<template>
  <div id="case-studies-marker" v-editable="blok" class="mt-20 relative case-studies-top-container">
      <div class="sticky-nav">
        <div class="font-dinProBlack">Our Work</div>
      </div>
      <h2 id="case-studies" class="text-white case-studies-sub fade-in">
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

      <div class="case-studies-wrapper">
        <div
          v-for="caseStudy in sortedCaseStudies"
          :key="caseStudy._uid"
          class="h-full case-study-outer-container laptop:justify-center from-right"
        >
          <case-study-teaser
            v-if="caseStudy.content"
            :case-study-link="caseStudy.full_slug"
            :case-study-content="caseStudy.content"
            :case-studies-list="sortedCaseStudies"
            class=""
          />
        </div>
        
        <div class="positioning-container relative">
          <Contact id="contact-marker" />
        </div>
      </div>
      
  </div>
</template>

<script>
import { scrollToSection } from '../mixins'

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
    if(window.location.href.includes('case-studies')){
      scrollToSection(document.querySelector('#case-studies'), 'auto')
    } 

    const sections = document.querySelectorAll('.from-right')
    const margin = window.outerWidth < 1000 ? '0px 0px 350px 0px' : '0px'

    const options = { 
      root: null,
      threshold: 0,
      // number between 0-1; with 1, 100% of element must be visible; with 0, any amount of an element will fire
      rootMargin: margin
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
  transform: translateY(100%);
  transition: transform 1s, opacity 1s ease-in;
}

.from-right.slide-in {
  transform: translateY(0);
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

@media screen(mobile) {
  #contact-marker {
    min-height: 100vh;
  }
}

@media screen(laptop){
  .fade-in {
    opacity: 0;
    transition: opacity 1s ease-in;
  }

  .fade-in.appear {
    opacity: 1;
  }
  .from-right {
    opacity: 0;
    transform: translateY(30%) rotate(90deg);
    transition: transform 1s, opacity 1s ease-in;
  }

  .from-right.slide-in {
    transform: translateY(0) rotate(90deg);
    opacity: 1;
  }
}

@media screen(laptopwh) {
  .case-studies-sub,
  .icons-container {
    transform: rotate(90deg);
    position: absolute;
  }

  .case-studies-top-container {
    bottom: 20em;
  }

  .case-studies-sub {
    top: 78em;
    right: -1.3em;
  }

  .from-right {
    opacity: 0;
    transform: translateY(30%) rotate(90deg);
    transition: transform 1s, opacity 1s ease-in;
    margin-bottom: 13em;
  }

  .from-right.slide-in {
    transform: translateY(0) rotate(90deg);
    opacity: 1;
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
    /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */

    flex-direction: column;
    position: absolute;
    top: 305em;
    right: 3em;
    display: flex;
    margin-bottom: 50em;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    
  }
}

@media screen(laptop2xwh) {
  .case-studies-top-container {
    bottom: 0;
  }

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
    margin-bottom: 50em;
    top: 280em;
    right: 0;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;

    /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
  }
}

@media screen(desktopwh) {
  .case-studies-sub,
  .icons-container {
    transform: rotate(90deg);
    position: absolute;
  }

  .case-studies-top-container {
    top: 240em;
  }

  .case-studies-sub {
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
    right: 5rem;
  }

  
  .case-study-outer-container {
    margin-bottom: 17em;
  }

  .positioning-teasers-container {
    top: 15em;
    left: 23em;
    position: absolute;
  }

  .case-studies-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60em;
    right: 10em;

    /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
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
