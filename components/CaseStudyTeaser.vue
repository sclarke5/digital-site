<template>
  <div
    :class="caseStudyContent._uid"
    class="case-study-teaser block py-4 md:pb-40 relative"
  >
    <div class="case-study-container flex flex-col">
      <img
        class="primary-image"
        :src="caseStudyContent.primary_image.filename"
        :alt="caseStudyContent.primary_image.alt"
      />
      <div class="flex flex-col md:absolute bottom-0">
        <h3 class="pt-2 pb-4 text-white">
          {{ caseStudyContent.name }}
        </h3>
        <p class="pt-2 pb-4 text-white">
          {{ caseStudyContent.tagline }}
        </p>
        <div
          class="view-case-study flex items-center"
          @click="openModal(caseStudyContent, caseStudiesList)"
        >
          <p class="uppercase">View case study</p>
        </div>
      </div>
      <case-study-panel
        v-show="showPanel"
        :case-study-content="caseStudyContent"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caseStudyContent: {
      type: Object,
      required: true,
    },
    caseStudyLink: {
      type: String,
      required: true,
    },
    caseStudiesList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      showPanel: false,
    }
  },
  methods: {
    openModal(content, list) {
      if (window.innerWidth > 800) {
        this.$store.dispatch('modal/toggle', { content, list })
      } else if (this.showPanel === false) {
        this.showPanel = true
      } else if (this.showPanel === true) {
        this.showPanel = false
      }
    },
    closeModal() {
      const teaser = this.$el
      teaser.classList.remove('bring-forward')
      this.showModal = false
    },
  },
}
</script>

<style scoped>
.case-study-teaser {
  /* background-color: black; */
}

h3 {
  margin-top: -0.7em;
  text-shadow: 0 8px 50px #000;
  line-height: 1em;
}

h5 {
  margin-top: -0.6em;
}

.primary-image {
  width: 620px;
  height: 280px;
  object-fit: cover;
}

.view-case-study {
  width: fit-content;
  height: 40px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border: 2px solid white;
  justify-content: space-around;
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 1.5em;
}

.view-case-study span {
  font-family: 'Gotham', sans-serif;
  font-weight: 700;
}

.view-case-study img {
  margin-left: 1em;
}

.view-case-study:hover {
  color: black;
  background-color: white;
}

.bring-forward {
  z-index: 999;
}

@media screen and (min-width: 800px) {
  .case-study-teaser {
    /* transform: rotate(90deg);
    margin-bottom: 30vw;
    min-width: 45em; */
  }
}
</style>
