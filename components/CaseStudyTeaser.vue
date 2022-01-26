<template>
  <div

    :class="caseStudyContent._uid"
    class="case-study-teaser block mobile:my-6 md:pb-40 relative"
    @click="openModal(caseStudyContent, caseStudiesList)"
  >
    <div class="case-study-container flex flex-col mobile:items-center">
      <div class="image-container">
        <img
          class="laptopwh:px-6 primary-image"
          :src="caseStudyContent.teaser_image.filename"
          :alt="caseStudyContent.teaser_image.alt"
        />
      </div>

      <div
        class="
          flex flex-col
          laptop:absolute
          bottom-0
          w-full
          case-text-wrapper
          laptopwh:px-6 mobile:px-6"
      >
        <h3 class="mobile:z-50 pt-2 pb-4 text-white">
          {{ caseStudyContent.name }}
        </h3>
        <p class="pt-2 pb-4 text-white">
          {{ caseStudyContent.tagline }}
        </p>
        <div
          class="view-case-study flex items-center"
          @click="togglePanel"
        >
          <p v-if="showPanel" class="uppercase">Close Panel</p>
          <p v-else class="uppercase">View case study</p>
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
      if (window.innerWidth > 1000) {
        this.$store.dispatch('modal/toggle', { content, list })
        setTimeout(this.removeDefaultNavButtons, 200)
        setTimeout(this.addListener, 200)
      }
    },
    togglePanel(){
      if(window.innerWidth < 1000 && this.showPanel === false){
        this.showPanel = true
      } else {
        this.showPanel = false
      }
    },
    addListener(){
      const modalBody = document.querySelector('.modal')
      modalBody.addEventListener('scroll', this.revealHeader)
    },
    revealHeader() {
      const header = document.querySelector('.secondary-header')
      const modal = document.querySelector('.modal')

      const scrollY = modal.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if(scrollY >= clientHeight){
        header.classList.remove('hide-header');
        header.classList.add('reveal-header');
      } else {
        header.classList.remove('reveal-header')
        header.classList.add('hide-header');
      }
    },
    removeDefaultNavButtons(){
      const navContainers = document.querySelectorAll('.agile__nav-button')
      navContainers.forEach(container => {
        container.style.border = 'none'
      })
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
  transition: transform 0.5s, opacity 0.5s;
}

.view-case-study {
  width: fit-content;
  height: 40px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border: 2px solid white;
  justify-content: space-around;
  transition: background-color 0.2s, color 0.2s;
  padding: 1.5em;
}

.view-case-study span {
  font-family: 'Gotham', sans-serif;
  font-weight: 700;
}

.view-case-study img {
  margin-left: 1em;
}

/* .view-case-study:hover {
  color: black;
  background-color: white;
} */

.bring-forward {
  z-index: 999;
}

.case-text-wrapper {
  max-width: 620px;
}

/* .case-study-teaser {
  transition: transform .2s;
} */

.image-container {
  overflow: hidden;
}

.case-study-teaser:hover {
  cursor: pointer;
}

.case-study-teaser:hover .view-case-study {
  color: black;
  background-color: white;
}

.case-study-teaser:hover .primary-image {
  opacity: 0.7;
  transform: scale(1.1);
}

</style>
