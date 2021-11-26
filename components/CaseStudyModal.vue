<template>
  <div class="modal-overlay bg-black flex">
    <div class="modal flex flex-col bg-black overflow-auto">
      <div class="title-container flex flex-col py-9">
        <div class="close" @click="$emit('close-modal')">
          <svg 
            id="Layer_1" 
            class="close-img cursor-pointer"
            style="enable-background:new 0 0 512 512;" 
            version="1.1" 
            viewBox="0 0 512 512" 
            height="100px" 
            width="100px" 
            xml:space="preserve" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            stroke="white"
            fill="white">
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
          </svg>
        </div>
        <h1 class="pt-2 text-white text-5xl text-left uppercase">
          {{ caseStudyContent.name }}
        </h1>
        <!-- <h3 class="pt-2 pl-6 text-white text-3xl text-left uppercase">
          {{ caseStudyContent.client }}
        </h3> -->
        <h5 class="pt-2 text-white text-xl text-left">
          {{ caseStudyContent.tagline }}
        </h5>
      </div>
      
      <img class="check w-full" :src="caseStudyContent.primary_image.filename" :alt="caseStudyContent.primary_image.alt" />

      <div class="body-container flex justify-between pt-12">
        <div class="services-container flex flex-col">
          <h4 class="text-white">CLIENT</h4>
          <p class="text-white">
            {{ caseStudyContent.client }}
          </p>
          <h4 class="text-white mt-6">SERVICES PROVIDED</h4>
          <ul>
            <li v-for="(service, index) in parsedCaseStudies.services_provided" :key=index class="text-white">
              {{ service }}
            </li>
          </ul>
          <h4 class="text-white">DISCIPLINES</h4>
          <ul>
            <li v-for="(discipline, index) in parsedCaseStudies.disciplines" :key=index class="text-white">
              {{ discipline }}
            </li>
          </ul>
        </div>

        <div class="challenege-approach-container w-2/3">
          <div class="challenge-approach-first flex flex-col mb-12">
            <h4 class="text-white uppercase">Challenge</h4>
            <p class="text-white">
              {{ caseStudyContent.challenge }}
            </p>
          </div>

          <!-- whenever we render a visual, check whether the filetype includes video extentions. TODO: add other formats in addition to webm -->
          <video v-if="visualsArray[0].filename.includes('webm')" controls :src="visualsArray[0].filename" :alt="visualsArray[0].alt"></video>
          <img v-else :src="visualsArray[0].filename" :alt="visualsArray[0].alt">

          <div class="challenge-approach-second flex flex-col py-12">
            <h4 class="text-white uppercase">Approach</h4>
            <p class="text-white">
              {{ caseStudyContent.approach }}
            </p>
          </div>

          <video v-if="visualsArray[1].filename.includes('webm')" controls :src="visualsArray[1].filename" :alt="visualsArray[1].alt"></video>
          <img v-else :src="visualsArray[1].filename" :alt="visualsArray[1].alt" class="mb-16 second-image">

          <video v-if="visualsArray[2].filename.includes('webm')" controls :src="visualsArray[2].filename" :alt="visualsArray[2].alt"></video>
          <img :src="visualsArray[2].filename" :alt="visualsArray[2].alt" class="mb-16 third-image">

        </div>
      </div>

      <div 
        v-if="caseStudyContent.result_1 && caseStudyContent.result_2 && caseStudyContent.result_3" class="results-container bg-white">
        <h4 class="uppercase pt-12 pb-4 pl-20">Results</h4>

        <div class="results-columns flex">
          <div class="results-column first-column w-1/3 px-20 pb-16">
            <p>
              {{ caseStudyContent.result_1 }}
            </p>
          </div>
          <div class="results-column second-column w-1/3 px-20 pb-16">
            <p>
              {{ caseStudyContent.result_2 }}
            </p>
          </div>
          <div class="results-column third-colum w-1/3 px-20 pb-16">
            <p>
              {{ caseStudyContent.result_3 }}
            </p>
          </div>
        </div>
      </div>
      <div 
        v-if="caseStudyContent.result_1 && caseStudyContent.result_2 && !caseStudyContent.result_3" 
        class="results-container bg-white">
        <h4 class="uppercase pt-12 pb-4 pl-52">Results</h4>
        <div class="results-columns flex px-40">
          <div class="results-column first-column w-1/2 px-12 pb-16">
            <p>
              {{ caseStudyContent.result_1 }}
            </p>
          </div>
          <div class="results-column second-column w-1/2 px-12 pb-16">
            <p>
              {{ caseStudyContent.result_2 }}
            </p>
          </div>
        </div>
      </div>
      <div 
        v-if="caseStudyContent.result_1 && !caseStudyContent.result_2" 
        class="results-container bg-white">
        <h4 class="uppercase pt-12 pb-4 px-72">Results</h4>
        <div class="results-columns flex px-72 w-full">
          <div class="results-column first-column pb-16">
            <p>
              {{ caseStudyContent.result_1 }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <div class="flex flex-col p-12 w-2/3">
          <p v-if="caseStudyContent.testimonial" class="testimonial text-white">
          "{{ caseStudyContent.testimonial }}"
          </p>
          <p v-if="caseStudyContent.testimonial_author" class="testimonial-author text-white mt-4 mb-8">
            - {{ caseStudyContent.testimonial_author }}
          </p>
          <div class="flex cta items-center justify-around">
            <a :href="ctaURL" target="_blank" class="flex">
              <span class="uppercase" :href="ctaURL" >Go to Site</span>
              <img src="~/assets/arrow-right.png" />
            </a>
          </div>
        </div>
      </div>

      <div class="more-work mt-8 mb-80">
        <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">More of our work</h1>
        <ul class="flex py-6 mb-6 case-list">
          <li v-for="caseStudy in seeMoreWork" 
            :key="caseStudy._uid"
            class="list-item flex flex-column px-6 w-1/3">
            <img class= "see-more-image" :src="caseStudy.content.primary_image.filename" alt="">
            <h1 class="mt-2 text-2xl text-white uppercase">{{ caseStudy.name }}</h1>
            <h5 class="mt-2 text-white uppercase">{{caseStudy.content.client}}</h5>
            <div class="mt-4 flex cta items-center justify-around case-study-link" @click="scrollToCaseStudy" >
              <div class="flex button-container">
                <span  v-bind:id="caseStudy.content._uid" class="uppercase">View Case Study</span>
                <img src="~/assets/arrow-right.png" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caseStudyContent: {
      type: Object,
      required: true
    },
    caseStudiesList: {
      type: Array,
      required: true
    }
  },
  computed: {
    parsedCaseStudies() {
      return JSON.parse(JSON.stringify(this.caseStudyContent))
    },
    ctaURL() {
      return this.caseStudyContent.cta?.url
    },
    servicesProvided() {
      return this.caseStudyContent.services_provided
    },
    visualsArray() {
      const visualsArr = [];
      this.caseStudyContent.visuals?.forEach((visual) => {
        if(visual.filename){
          visualsArr.push(visual)
        }
      })
      return visualsArr
    },
    seeMoreWork() {
      const otherCaseStudies = []
      this.caseStudiesList.forEach((caseStudy) => {
        if(caseStudy.content._uid !== this.caseStudyContent._uid){
          otherCaseStudies.push(caseStudy)
        }
      })
      // below temporary to keep it simple; TODO: figure out how many/which "other case studies" to display
      const selectedCaseStudies = otherCaseStudies.slice(0, 3)
      return selectedCaseStudies
    },
  },
  methods: {
    scrollToCaseStudy(e) {
      const idString = e.target.id
      const destination = document.getElementsByClassName(`${idString}`)
      destination[0].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center'
      })
    }
  }
}
</script>

<style scoped>


h1, h3, h5, h6 {
  font-family: 'Gotham', sans-serif;
}

h1, h3 {
  font-weight: 800;
}

h5 {
  font-weight: 200;
}

h4 {
  font-family: 'DinPro-Black', sans-serif;
}

.body-container p {
  font-size: 16px;
  margin-top: 0.5em;
  font-family: 'Gotham', sans-serif;
  text-align: left;
  font-weight: 200;
}

.services-container ul {
  margin: 20px 0;
}

.services-container li {
  font-family: 'Gotham', sans-serif;
  font-weight: 200;
}

.third-image {
  margin-left: -20em;
  margin-top: -10em;
}

.results-column {
  padding-top: 0;
}

.results-column p {
  font-weight: 300;
}

.testimonial {
  font-size: 2em;
  line-height: 1.5;
  font-family: 'Adobe Caslon Pro', sans-serif;
  font-style: italic;
}

.testimonial-author {
  font-family: 'Gotham', sans-serif;
}

.cta {
  border: 2px solid white;
  color: white;
  transition: background-color 0.5s ease, color 0.5s ease;
  height: 40px;
  width: fit-content;
  padding: 1.5em;
  cursor: pointer;
}

.cta span {
  font-family: 'Gotham', sans-serif;
  font-weight: 700;
}

.cta img {
  margin-left: 1em;
}

.cta:hover {
  color: black;
  background-color: white;
}

@media screen and (min-width: 800px) {
  .modal {
    position: fixed;
    width: 85vw;
    height: 100vh;
    top: 10px !important;
  }

  .see-more-image {
    height: 12em;
    width: -webkit-fill-available;
    object-fit: cover;
  }

  .close {
    align-self: flex-end;
  }

  video {
    border: 2px solid white;
  }
}



</style>