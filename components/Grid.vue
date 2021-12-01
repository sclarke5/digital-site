<template>
  <div class="flex grid-container md:absolute">
    <div class="flex flex-col grid-left md:mr-16 px-6 about-container">
      <div class="text-container">
        <h1 class="text-white">{{ title }}</h1>
        <div class="paragraph-container md:flex">
          <p class="text-white pt-8 md:w-1/2">{{ blurb }}</p>
          <p class="text-white underline pt-8 md:w-1/2 md:pl-16">
            <a :href="astoundgroup_cta.link">
              {{ astoundgroup_cta.text }}
            </a>
          </p>
        </div>
      </div>
      <h2
        id="process-title"
        class="text-white text-center m-5 font-black uppercase"
      >
        Our Process
      </h2>
      <ul class="flex process-container">
        <li class="process-item">
          <img src="../assets/1-SpotTheProblem.png" alt="" />
          <p>Spot the Problem</p>
        </li>
        <li class="process-item">
          <img src="../assets/2-UnderstandUser.png" alt="" />
          <p>Understand the User</p>
        </li>
        <li class="process-item">
          <img src="../assets/3-AnalyzeFindings.png" alt="" />
          <p>Analyze Findings</p>
        </li>
        <li class="process-item">
          <img src="../assets/4-Ideate.png" alt="" />
          <p>Ideate &amp; Create Mockups</p>
        </li>
        <li class="process-item">
          <img src="../assets/5-BuildMVP.png" alt="" />
          <p>Build MVP &amp; Distribute</p>
        </li>
        <li class="process-item">
          <img src="../assets/6-ReviewFeedbackIterate.png" alt="" />
          <p>Review Feedback &amp; Iterate</p>
        </li>
      </ul>
    </div>
    <div class="flex flex-col grid-right">
      <ul v-editable="blok" class="services-list flex mb-6 lines-background">
        <h2 class="our-work-heading text-white px-6 mt-6">OUR SERVICES</h2>
        <li
          :key="blok._uid"
          v-for="blok in blok.columns"
          class="flex-auto px-6 md:w-1/3 text-white md:mr-12"
        >
          <component :blok="blok" :is="blok.component" />
        </li>
      </ul>
    </div>
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
  data() {
    return {
      title:
        "We're creatively led Digital Thinkers who solve business challenges and spark human connection.",
      blurb:
        'Technology is a tool to enhance human connection. We bring stories to life that inspire audiences, we innovate solutions that enhance experiences, and we reveal opportunities that serve new markets and drive business.',
      archfab_cta: {
        text: 'Looking for architectural fabrication?',
        link: 'https://www.astoundarchfab.com',
      },
      astoundgroup_cta: {
        text: 'Looking for Strategy & Creative, Brand Experience, Tradeshow & Event, Architectural Fabrication or Sports & Venues?',
        link: 'https://www.astoundgroup.com',
      },
    }
  },
}
</script>

<style scoped>
ul,
li {
  list-style-type: none;
}

.grid-container {
  flex-direction: column;
  margin-top: 15em;
}

.grid-container h1 {
  /* changed to 2em from 3em because it was adding a few px to the width! */
  font-size: 2em;
  line-height: 1.1;
}

.grid-left {
  margin-bottom: 5em;
}

.grid-right ul {
  flex-direction: column;
}

.lines-background {
  background-image: url('../assets/grid.png');
  background-size: contain;
}

.process-container {
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
}

.process-item {
  padding: 1rem;
}

.process-item > p {
  height: 2em;
  color: white;
  text-transform: uppercase;
  font-family: 'Gotham Ultra', sans-serif;
  text-align: center;
  padding: 0.5em 0.25em 0 0.25em;
  width: 100%;
}

@media screen and (max-width: 799px) {
  .process-item {
    width: 50%;
    margin: 1rem 0;
  }
}

@media screen and (min-width: 800px) {
  #process-title {
    display: none;
  }
  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 250vh;
    max-width: 1971px;
    flex-direction: row;
    right: -30em;
  }

  .grid-container h1 {
    font-size: 3em;
  }

  .grid-left {
    /* width: 550%; */
  }

  .grid-right {
    flex-direction: row;
    margin-left: 20em;
  }

  .grid-right ul {
    min-width: 200%;
    flex-direction: row;
  }

  .our-work-heading {
    display: none;
  }

  .process-container {
    flex-wrap: nowrap;
  }

  .process-item {
    max-width: calc(100% / 6);
    flex-basis: 0;
    flex-grow: 1;
  }
}
</style>
