<template>
  <div v-bind:class="caseStudyContent._uid"
    class="case-study-teaser block py-4">
    <div class="case-study-container flex flex-col">
      <img :src="caseStudyContent.primary_image.filename" />
      <h1 class="pt-2 pb-4 text-4xl font-bold text-white uppercase">
        {{ caseStudyContent.name }}
      </h1>
      <h5 class="pt-2 pb-4 text-2xl font-bold text-white uppercase">
        {{ caseStudyContent.client }}
      </h5>
      <div class="view-case-study flex items-center" @click="openModal">
        <span>VIEW CASE STUDY</span>
        <img src="~/assets/arrow-right.png" />
      </div>
      <case-study-modal v-show="showModal" :case-study-content="caseStudyContent" :case-studies-list="caseStudiesList" @close-modal="showModal = false" />
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
    caseStudyLink: {
      type: String,
      required: true
    },
    caseStudiesList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    openModal(){
      if(window.innerWidth > 800){
        this.showModal = true;
      }
    }
  }
}
</script>

<style scoped>
.case-study-teaser {
  background-color: black;
}

h1, h5 {
  font-family: 'Gotham', sans-serif;
}

h1 {
  font-weight: 800;
  margin-top: -0.7em;
  text-shadow: 2px 2px black;
}

h5 {
  font-weight: 200;
  margin-top: -0.6em;
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

@media screen and (min-width: 800px) {
  .case-study-teaser {
    background-color: black;
    width: 60%;
    transform: rotate(90deg);
    margin-bottom: 80vh;
    margin-left: 15em;
  }
}

</style>