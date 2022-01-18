<template>
  <transition name="fade" appear>
    <div v-if="showModal" class="absolute text-white modal-wrapper">
      <!-- <button @click="toggleModal" class="close-icon">
      <img src="../assets/close-icon.png" alt="" />
    </button> -->
      <div class="modal-overlay bg-black flex">
        <div class="modal flex flex-col bg-black overflow-auto w-screen">
          <div class="header-container relative">
            <div class="title-container flex py-4">
              <div class="header-left">
                <img
                  id="header-logo-img"
                  class="company-logo h-full"
                  src="../assets/Digital__White_-1-removebg-preview.png"
                  alt="ASTOUND Digital Logo"
                />
              </div>
              <div class="pr-4 header-right">
                <button class="close-icon" @click="toggleModal">
                  <svg
                    width="16"
                    height="30"
                    viewBox="0 0 16 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="styled-arrow"
                      d="M15 29L1 15L15 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h6 class="back-button text-white uppercase">
                    Back to Case Studies
                  </h6>
                  <!-- <img src="../assets/close-icon.png" alt="" /> -->
                </button>
              </div>
            </div>

            <div class="header-bottom">
              <p class="pt-2 text-white text-xl text-left">
                {{ content.client }}
              </p>
              <h1 class="pt-2 text-white text-5xl text-left uppercase">
                {{ content.name }}
              </h1>
              <p class="pt-2 text-white text-xl text-left tagline">
                {{ content.tagline }}
              </p>
            </div>

            <img
              class="check w-full"
              :src="content.teaser_image.filename"
              :alt="content.teaser_image.alt"
            />
          </div>

          <div class="secondary-header hide-header flex py-8 px-4">
            <div class="header-left">
              <h3 class="text-white">{{ content.name }}</h3>
            </div>
            <div class="header-right text-right">
              <button class="close-icon" @click="toggleModal">
                <svg
                  width="16"
                  height="30"
                  viewBox="0 0 16 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="styled-arrow"
                    d="M15 29L1 15L15 1"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h6 class="back-button text-white uppercase">
                  Back to Case Studies
                </h6>
              </button>
            </div>
          </div>

          <div class="body-centering-container flex">
            <div class="body-container flex pt-40">
              <div class="challenege-approach-container flex flex-col">
                <div class="challenge-approach-first flex flex-col">
                  <h4 class="uppercase">Challenge</h4>
                  <h3 class="text-white pt-4">
                    {{ content.challenge }}
                  </h3>
                </div>

                <div class="visuals-container flex items-center my-40">
                  <div class="visuals-left">
                    <img
                      :src="content.primary_image_large.filename"
                      :alt="content.primary_image_large.alt"
                      class="second-image"
                    />
                  </div>

                  <div class="visuals-right">
                    <img
                      :src="content.primary_image_small.filename"
                      :alt="content.primary_image_small.alt"
                      class="third-image"
                    />
                  </div>
                </div>

                <div class="challenge-approach-second flex flex-col py-12">
                  <h4 class="text-white uppercase">Approach</h4>
                  <p class="text-white pt-4">
                    {{ content.approach }}
                  </p>
                </div>

                <div class="second-visuals-container py-40 flex flex-col">
                  <img
                    class="w-2/5 first-image"
                    :src="content.secondary_image_large.filename"
                    :alt="content.secondary_image_large.alt"
                  />
                  <img
                    class="w-5/6 self-end second-image"
                    :src="content.secondary_image_small.filename"
                    :alt="content.secondary_image_small.alt"
                  />
                </div>
              </div>
              <!-- end of first body container--need to keep exiting for full-screen width parts -->
            </div>
          </div>

          <div
            v-if="content.testimonial"
            class="testimonial-container flex bg-white"
          >
            <div class="testimonial-text-container relative flex py-20">
              <div class="flex flex-col w-1/2">
                <p v-if="content.testimonial" class="testimonial text-black">
                  "{{ content.testimonial }}"
                </p>
                <p
                  v-if="content.testimonial_author"
                  class="testimonial-author text-black mt-4 mb-8"
                >
                  - {{ content.testimonial_author }}
                </p>
              </div>
            </div>
          </div>

          <div class="results-centering-container flex justify-center my-20">
            <div class="results-container">
              <div class="results-text-container">
                <h4 class="text-white">Results</h4>
                <h3 class="pt-4">
                  {{ content.result_1 }}
                </h3>
                <p v-if="content.result_2" class="text-white pt-4">
                  {{ content.result_2 }}
                </p>
                <p v-if="content.result_3" class="text-white pt-4">
                  {{ content.result_3 }}
                </p>
              </div>
              <!-- <p>{{ content.visual }}</p> -->
              <video
                v-if="content.visual.filename.includes('webm') || content.visual.filename.includes('mp4')"
                class="my-20"
                controls
                :src="content.visual.filename"
                :alt="content.visual.alt"
              ></video>
              <img
                v-else
                class="my-20"
                :src="content.visual.filename"
                :alt="content.visual.alt"
              />
            </div>
          </div>

          <div class="services-container flex bg-white py-20">
            <div class="services-provided">
              <h4 class="text-black pb-4">SERVICES PROVIDED</h4>
              <ul>
                <li
                  v-for="(
                    service, index
                  ) in parsedCaseStudies.services_provided"
                  :key="index"
                  class="text-black"
                >
                  {{ service }}
                </li>
              </ul>
            </div>
            <div class="disciplines-container">
              <h4 class="text-black pb-4">DISCIPLINES</h4>
              <ul>
                <li
                  v-for="(discipline, index) in parsedCaseStudies.disciplines"
                  :key="index"
                  class="text-black"
                >
                  {{ discipline }}
                </li>
              </ul>
            </div>
          </div>
          <div class="extra-container flex justify-center">
            <div class="more-work py-20">
              <h1 class="pl-6 pb-16 text-white text-5xl text-left uppercase">
                More of our work
              </h1>
              <div class="more-work-centering">
                <agile :options="slideOptions">
                  <div
                    v-for="caseStudy in seeMoreWork"
                    :key="caseStudy._uid"
                    class="list-item flex flex-column px-6 relative"
                  >
                    <img
                      class="see-more-image"
                      :src="caseStudy.content.teaser_image.filename"
                      alt=""
                    />
                    <h3 class="mt-2 text-white">
                      {{ caseStudy.name }}
                    </h3>
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
                        <p class="uppercase">View Case Study</p>
                      </div>
                    </div>
                  </div>
                  <template slot="prevButton">
                    <svg
                      class="nav-button nav-previous"
                      width="16"
                      height="30"
                      viewBox="0 0 16 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 29L1 15L15 1"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                  <template slot="nextButton" class="test-slider">
                    <svg
                      class="nav-button nav-next"
                      width="16"
                      height="30"
                      viewBox="0 0 16 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L15 15L1 29"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </agile>
              </div>
            </div>
          </div>

          <div class="contact-us mt-8">
            <h1
              class="
                pt-2
                ml-20
                text-5xl text-left
                uppercase
                text-black text-left
              "
            >
              Like what you see?
            </h1>
            <div
              class="flex px-4 py-2 ml-20 mt-6 contact-button-container"
              @click="contactScroll"
            >
              <p class="uppercase text-black">Contact Us</p>
            </div>
            <div class="back-to-top flex float-right">
              <svg
                class=""
                width="10"
                height="30"
                viewBox="0 0 16 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 29L1 15L15 1"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                class="mr-20 uppercase text-black text-right"
                @click="scrollToTop"
              >
                Back to Top
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { VueAgile } from 'vue-agile'
import { scrollToSection } from '../mixins'
export default {
  components: {
    agile: VueAgile,
  },
  data() {
    return {
      slideOptions: {
        responsive: [
          {
            breakpoint: 400,
            settings: {
              dots: false,
              slidesToShow: 3,
              navButtons: true,
            },
          },
        ],
      },
    }
  },
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
      return otherCaseStudies
    },
  },
  mounted() {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.toggleModal()
      }
    })
  },
  methods: {
    toggleModal() {
      this.$store.dispatch('modal/toggle')
    },
    contactScroll() {
      this.toggleModal()
      scrollToSection(document.querySelector('#contact-marker'), 'auto')
    },
    goToCaseStudy(caseStudy, list) {
      const target = caseStudy.content
      this.$store.dispatch('modal/next', { target, list })
      document.querySelector('.modal').scrollTop = 0
    },
    collapseHeader() {
      if (document.querySelector('.modal').scrollTop > 20) {
        document.querySelector('.text-left').style.fontSize = '2em'
        document.querySelector('.tagline').style.display = 'none'
      } else {
        document.querySelector('.text-left').style.fontSize = '4em'
        document.querySelector('.tagline').style.display = 'block'
      }
    },
    scrollToTop() {
      const modal = document.querySelector('.modal')
      modal.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.reveal-header {
  opacity: 1;
  transform: translate(0, 0);
  z-index: 2;
}

.hide-header {
  z-index: 2;
  transform: translate(0, -150px);

  /* opacity: 0;
  z-index: 0; */
}

.title-container {
  flex-direction: row;
  position: absolute;
  width: 100%;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
}

.header-bottom {
  position: absolute;
  bottom: 5em;
  left: 5em;
  z-index: 1;
  width: 70%;
}

.header-bottom h1 {
  font-size: 5em;
}

.text-left {
  transition: 0.25s;
}

.secondary-header {
  flex-direction: row;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  transition: 0.5s ease;
}

.company-logo {
  max-height: 100px;
}

.tagline {
  transition: 0.25s;
}

.check {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  opacity: 0.6;
}

.back-button {
  font-size: 1.2rem;
}

.body-centering-container {
  justify-content: center;
}

.body-container {
  flex-direction: column;
  width: 80%;
}

.challenege-approach-container h4 {
  color: rgba(29, 173, 228, 1);
}

.challenge-approach-first {
  width: 60%;
}

.challenge-approach-first h3 {
  font-size: 3em;
  text-transform: none;
}

.challenge-approach-second {
  width: 50%;
  align-self: flex-end;
}

.second-visuals-container .first-image {
  z-index: 1;
}

.second-visuals-container .second-image {
  z-index: 0;
  margin-top: -10em;
}

.services-container {
  justify-content: center;
}

.services-provided {
  margin-right: 5em;
}

.modal-overlay {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.results-column {
  padding-top: 0;
}

.visuals-container {
  max-height: 55em;
  flex-direction: column-reverse;
}

.visuals-container img {
  max-height: 100%;
}

.visuals-left {
  width: 80%;
  margin-top: -15em;
}

.visuals-right {
  width: 30%;
  align-self: flex-end;
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

.testimonial-container {
  justify-content: center;
}

.testimonial-text-container {
  justify-content: center;
}

.results-container {
  width: 80%;
}

.results-container h4 {
  color: rgba(29, 173, 228, 1);
}

.results-text-container {
  width: 50%;
}

.results-text-container h3 {
  text-transform: none;
  font-size: 3em;
}

.results-container video {
  max-height: 70vh;
  width: 100%;
}

.results-container img {
  width: 100%;
}

.services-container h4 {
  color: rgba(29, 173, 228, 1);
}

.cta {
  border: 2px solid white;
  color: white;
  transition: background-color 0.25s ease, color 0.25s ease;
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

.more-work {
  width: 90%;
}

.case-list-slider {
  display: flex;
}

.contact-us {
  padding-top: 5em;
  padding-bottom: 5em;
  background: white;
}

.contact-button-container {
  border: solid black 2px;
  width: fit-content;
  transition: background-color 0.25s;
}

.contact-button-container p {
  transition: color 0.25s;
}

.contact-button-container:hover {
  cursor: pointer;
  background-color: black;
}

.contact-button-container:hover p {
  color: white;
}

.back-to-top svg {
  transform: rotate(90deg);
  margin-right: 1em;
  margin-top: -0.3em;
}

.back-to-top:hover {
  cursor: pointer;
}

.nav-loaded {
  display: none;
  border: none;
}

.nav-button {
  position: absolute;
  top: 50%;
}

.nav-next {
  right: -2em;
}

.nav-previous {
  left: -2em;
}

.agile__nav-button .agile__nav-button--next {
  border: none;
}

.contact-us-link:hover {
  cursor: pointer;
}

@media screen(laptop) {
  .modal {
    height: 100vh;
    padding-bottom: 0;

    /* max-width: 80em; */
  }

  .modal-wrapper {
    z-index: 1010;
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
    display: flex;
    z-index: 1;
    transition: 0.2s;
    border: 0;
  }

  .close-icon svg {
    margin-right: 1em;
  }

  .close-icon:hover {
    background: linear-gradient(
      80deg,
      rgba(48, 214, 217, 1) 0%,
      rgba(255, 78, 0, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .close-icon:hover .styled-arrow {
    stroke: rgba(48, 214, 217, 1);
  }

  .close-icon img {
    object-fit: contain;
  }

  video {
    border: 2px solid white;
    width: 100%;
  }
}
@media screen(desktopxl) {
  .modal {
    /* padding-left: 15rem;
    padding-right: 15rem; */
    padding-top: 0;
    padding-bottom: 0;
  }

  /* .results-container {
    margin-left: -15rem;
    margin-right: -15rem;
    padding-right: 12rem;
    padding-left: 12rem;
  } */

  /* .title-container {
    margin-left: -15rem;
    padding-left: 15rem;
  } */
}

@media screen(desktop2xl) {
  .modal {
    /* padding: 25rem; */
    padding-top: 0;
    padding-bottom: 0;
  }

  /* .title-container {
    margin-left: -25rem;
    padding-left: 25rem;
  } */
}
</style>
