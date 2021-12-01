<template>
  <div v-if="showModal" class="absolute text-white z-50">
    <button @click="toggleModal" class="close-icon font-bold text-6xl z-50">
      x
    </button>
    <div class="modal-overlay bg-black flex">
      <div class="modal flex flex-col p-20 bg-black overflow-auto w-screen">
        <div class="title-container flex flex-col py-9">
          <h1 class="pt-2 text-white text-5xl text-left uppercase">
            {{ content.name }}
          </h1>
          <p class="pt-2 text-white text-xl text-left">
            {{ content.tagline }}
          </p>
        </div>

        <img
          class="check w-full"
          :src="content.primary_image.filename"
          :alt="content.primary_image.alt"
        />

        <div class="body-container flex justify-between pt-12">
          <div class="services-container flex flex-col">
            <h4 class="text-white">CLIENT</h4>
            <p class="text-white">
              {{ content.client }}
            </p>
            <h4 class="text-white mt-6">SERVICES PROVIDED</h4>
            <ul>
              <li
                v-for="(service, index) in parsedCaseStudies.services_provided"
                :key="index"
                class="text-white"
              >
                {{ service }}
              </li>
            </ul>
            <h4 class="text-white">DISCIPLINES</h4>
            <ul>
              <li
                v-for="(discipline, index) in parsedCaseStudies.disciplines"
                :key="index"
                class="text-white"
              >
                {{ discipline }}
              </li>
            </ul>
          </div>

          <div class="challenege-approach-container w-2/3">
            <div class="challenge-approach-first flex flex-col mb-12">
              <h4 class="text-white uppercase">Challenge</h4>
              <p class="text-white">
                {{ content.challenge }}
              </p>
            </div>

            <!-- whenever we render a visual, check whether the filetype includes video extentions. TODO: add other formats in addition to webm -->
            <video
              v-if="visualsArray[0].filename.includes('webm')"
              controls
              :src="visualsArray[0].filename"
              :alt="visualsArray[0].alt"
            ></video>
            <img
              v-else
              :src="visualsArray[0].filename"
              :alt="visualsArray[0].alt"
            />

            <div class="challenge-approach-second flex flex-col py-12">
              <h4 class="text-white uppercase">Approach</h4>
              <p class="text-white">
                {{ content.approach }}
              </p>
            </div>

            <video
              v-if="visualsArray[1].filename.includes('webm')"
              controls
              :src="visualsArray[1].filename"
              :alt="visualsArray[1].alt"
            ></video>
            <img
              v-else
              :src="visualsArray[1].filename"
              :alt="visualsArray[1].alt"
              class="mb-16 second-image"
            />

            <video
              v-if="visualsArray[2].filename.includes('webm')"
              controls
              :src="visualsArray[2].filename"
              :alt="visualsArray[2].alt"
            ></video>
            <img
              :src="visualsArray[2].filename"
              :alt="visualsArray[2].alt"
              class="mb-16 third-image"
            />
          </div>
        </div>

        <div
          v-if="content.result_1 && content.result_2 && content.result_3"
          class="results-container bg-white"
        >
          <h4 class="uppercase pt-12 pb-4 pl-20 text-black">Results</h4>

          <div class="results-columns flex">
            <div class="results-column first-column w-1/3 px-20 pb-16">
              <p>
                {{ content.result_1 }}
              </p>
            </div>
            <div class="results-column second-column w-1/3 px-20 pb-16">
              <p>
                {{ content.result_2 }}
              </p>
            </div>
            <div class="results-column third-colum w-1/3 px-20 pb-16">
              <p>
                {{ content.result_3 }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="content.result_1 && content.result_2 && !content.result_3"
          class="results-container bg-white"
        >
          <h4 class="uppercase pt-12 pb-4 pl-52 text-black">Results</h4>
          <div class="results-columns flex px-40">
            <div class="results-column first-column w-1/2 px-12 pb-16">
              <p>
                {{ content.result_1 }}
              </p>
            </div>
            <div class="results-column second-column w-1/2 px-12 pb-16">
              <p>
                {{ content.result_2 }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="content.result_1 && !content.result_2"
          class="results-container bg-white"
        >
          <h4 class="uppercase pt-12 pb-4 px-72 text-black">Results</h4>
          <div class="results-columns flex px-72 w-full">
            <div class="results-column first-column pb-16">
              <p>
                {{ content.result_1 }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end">
          <div class="flex flex-col p-12 w-2/3">
            <p v-if="content.testimonial" class="testimonial text-white">
              "{{ content.testimonial }}"
            </p>
            <p
              v-if="content.testimonial_author"
              class="testimonial-author text-white mt-4 mb-8"
            >
              - {{ content.testimonial_author }}
            </p>
            <div class="flex cta items-center justify-around">
              <a href="" target="_blank" class="flex">
                <p class="uppercase" href="">Go to Site</p>
              </a>
            </div>
          </div>
        </div>

        <div class="more-work mt-8 mb-80">
          <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">
            More of our work
          </h1>
          <ul class="flex py-6 mb-6 case-list">
            <li
              v-for="caseStudy in seeMoreWork"
              :key="caseStudy._uid"
              class="list-item flex flex-column px-6 w-1/3 relative"
            >
              <img
                class="see-more-image"
                :src="caseStudy.content.primary_image.filename"
                alt=""
              />
              <h1 class="mt-2 text-2xl text-white uppercase">
                {{ caseStudy.name }}
              </h1>
              <p class="mt-2 text-white uppercase">
                {{ caseStudy.content.client }}
              </p>
              <div
                :id="caseStudy.content._uid"
                class="
                  mt-4
                  flex
                  cta
                  items-center
                  justify-around
                  case-study-link
                "
                @click="goToCaseStudy(caseStudy, list)"
              >
                <div class="flex button-container">
                  <p class="uppercase">
                    View Case Study
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showModal() {
      return this.$store.state.modal.show
    },
    content() {
      return this.$store.state.modal.content
    },
    list() {
      return this.$store.state.modal.list
    },
    parsedCaseStudies() {
      return JSON.parse(JSON.stringify(this.content))
    },
    visualsArray() {
      const visualsArr = []
      this.content.visuals?.forEach((visual) => {
        if (visual.filename) {
          visualsArr.push(visual)
        }
      })
      return visualsArr
    },
    seeMoreWork() {
      const otherCaseStudies = []
      this.list.forEach((caseStudy) => {
        if (caseStudy.content._uid !== this.content._uid) {
          otherCaseStudies.push(caseStudy)
        }
      })
      // below temporary to keep it simple; TODO: figure out how many/which "other case studies" to display
      const selectedCaseStudies = otherCaseStudies.slice(0, 3)
      return selectedCaseStudies
    },
  },
  methods: {
    toggleModal() {
      this.$store.dispatch('modal/toggle')
    },
    goToCaseStudy(caseStudy, list) {
      const target = caseStudy.content
      this.$store.dispatch('modal/next', { target, list })
      document.querySelector('.modal').scrollTop = 0
    }
  },

}
</script>

<style scoped>
.title-container h1 {
  font-size: 4em;
  width: 60%;
}

.check {
  height: 50%;
  object-fit: cover;
}

.body-container p {
  margin-top: 0.5em;
  text-align: left;
}

.services-container ul {
  margin: 20px 0;
}

.third-image {
  margin-left: -20em;
  margin-top: -10em;
}

.results-column {
  padding-top: 0;
}

.results-column p {
  color: black;
}

.testimonial {
  font-size: 2em;
  line-height: 1.5;
  font-family: 'Adobe Caslon Pro', sans-serif;
  font-style: italic;
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
    height: 100vh;
  }

  .see-more-image {
    height: 12em;
    width: -webkit-fill-available;
    object-fit: cover;
  }

  .list-item {
    min-height: 24em;
  }

  .case-study-link {
    position: absolute;
    bottom: 0;
  }

  .close {
    align-self: flex-end;
  }

  .close-icon {
    position: fixed;
    right: 0.5em;
    font-size: 8em;
    text-shadow: 2px 2px 12px black;
  }

  video {
    border: 2px solid white;
  }
}
</style>
