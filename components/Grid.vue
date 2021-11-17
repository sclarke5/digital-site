<template>
  <div class="flex grid-container">
    <div class="flex flex-col grid-left md:mr-16 px-6 about-container">
      <div class="text-container">
        <h1 class="text-white">{{ title }}</h1>
        <p class="text-white md:pl-48 pt-8">{{ blurb }}</p>
      </div>
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
          <p>Ideate & Create Mockups</p>
        </li>
        <li class="process-item">
          <img src="../assets/5-BuildMVP.png" alt="" />
          <p>Build MVP & Distribute</p>
        </li>
        <li class="process-item">
          <img src="../assets/6-ReviewFeedbackIterate.png" alt="" />
          <p>Review Feedback & Iterate</p>
        </li>
      </ul>
    </div>
    <div class="flex grid-right">
      <ul v-editable="blok" class="services-list flex py-8 mb-6 lines-background">
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
        "We're human-centered design thinkers who solve business challenges and spark connections.",
      blurb:
        'Technology is an opportunity to enhance human connection. We tell stories that inspire new audiences, we find tech solutions that serve new markets, and we reveal opportunities that drive new business.',
      archfab_cta: {
        text: 'Looking for architectural fabrication?',
        link: 'https://www.astoundarchfab.com',
      },
      astoundgroup_cta: {
        text: 'Looking for other services?',
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
  font-family: 'Gotham', sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1.1;
}

.grid-container p {
  font-family: 'Gotham', sans-serif;
  font-weight: 300;
}

.grid-left {
  margin-bottom: 10em;
}

.grid-right ul {
  flex-direction: column;
  margin-top: -10em;
}

.lines-background {
  background-image: url('../assets/grid.png');
  background-size: contain;
}

.about-container {
  margin-right: 5rem;
}

.process-container {
  justify-content: center;
  align-items: flex-end;
}

.process-item {
  width: 100%;
}

@media screen and (min-width: 800px) {
  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 250vh;
    margin-left: -25em;
    width: 150%;
    flex-direction: row;
  }

  .grid-container h1 {
    font-size: 3em;
  }

  .grid-left {
    width: 550%;
  }

  .grid-right {
    margin-left: 20em;
  }

  .grid-right ul {
    min-width: 200%;
    flex-direction: row;
  }

  .process-item {
    flex-basis: 0;
    flex-grow: 1;
    padding: 1rem;
  }

  .process-item > p {
    height: 2em;
    color: white;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Gotham', sans-serif !important;
    font-weight: 800;
    padding: 0.5em 0.25em 0 0.25em;
  }


}
</style>
