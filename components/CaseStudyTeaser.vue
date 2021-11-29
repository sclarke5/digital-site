<template>
  <div
    v-bind:class="caseStudyContent._uid"
    class="case-study-teaser block py-4"
  >
    <div class="case-study-container flex flex-col">
      <img
        class="primary-image"
        :src="caseStudyContent.primary_image.filename"
      />
      <h1 class="pt-2 pb-4 text-4xl font-bold text-white uppercase">
        {{ caseStudyContent.name }}
      </h1>
      <h5 class="pt-2 pb-4 text-2xl font-bold text-white uppercase">
        {{ caseStudyContent.client }}
      </h5>
      <div class="view-case-study flex items-center" @click="openModal">
        <span>VIEW CASE STUDY</span>
      </div>
      <case-study-panel
        v-show="showPanel"
        :case-study-content="caseStudyContent"
      />
      <case-study-modal
        v-show="showModal"
        :case-study-content="caseStudyContent"
        :case-studies-list="caseStudiesList"
        @close-modal="closeModal"
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
    openModal(e) {
      if (window.innerWidth > 800) {
        // const destination = e.path[3]

        console.log(e.path)
        // const destination = e.path[3]
        // destination.scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'start',
        // })

        this.showModal = true
        e.path[3].classList.add('bring-forward')
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

h1,
h5 {
  font-family: 'Gotham', sans-serif;
}

h1 {
  font-weight: 800;
  margin-top: -0.7em;
  text-shadow: 0 8px 50px #000;
}

h5 {
  font-weight: 200;
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
