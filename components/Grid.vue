<template>
  <div
    id="aboutUs-marker"
    class="flex grid-container laptop:absolute flex-col mt-60 laptop:flex-row"
  >
    <div class="sticky-nav">
      <div class="font-dinProBlack">About Us</div>
    </div>
    <div
      class="
        flex flex-col
        mb-20
        laptop:mr-16
        px-6
        about-container
        desktopwh:ml-40
      "
    >
      <div class="text-container">
        <h2 class="text-white">{{ title }}</h2>
        <div class="paragraph-container laptop:flex">
          <p class="text-white pt-8 laptop:w-1/2">{{ blurb }}</p>
          <p class="text-white underline pt-8 laptop:w-1/2 laptop:pl-16">
            <a :href="astoundgroup_cta.link">
              {{ astoundgroup_cta.text }}
            </a>
          </p>
        </div>
      </div>
      <ul
        class="
          flex
          process-container
          justify-center
          items-center
          flex-wrap
          laptop:flex-nowrap
        "
      >
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
    <div class="flex flex-col grid-right laptop:flex-row laptop:ml-80">
      <ul
        v-editable="blok"
        class="
          services-list
          flex
          mb-6
          lines-background
          bg-contain
          list-none
          flex-col
          laptop:flex-row
        "
      >
        <li
          :key="blok._uid"
          v-for="blok in blok.columns"
          class="flex-auto px-6 laptop:w-1/3 text-white laptop:mr-12 list-none"
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
.lines-background {
  background-image: url('../assets/grid.png');
}

.process-item {
  @apply p-4 my-4 w-1/2;
}

.process-item > p {
  @apply w-full text-white uppercase text-center h-8 px-1 pt-2 font-primaryHeadline;
}

@media screen(laptop) {
  .process-item {
    max-width: calc(100% / 6);
    flex-basis: 0;
    flex-grow: 1;
  }

  .grid-container h1 {
    font-size: 3em;
  }

  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 250vh;
    max-width: 1971px;
  }

  .grid-right ul {
    min-width: 200%;
  }
}

@media screen(laptopwh) {
  .grid-container {
    right: -36em;
  }

  .grid-right ul {
    margin-top: -5em;
  }
}

@media screen(laptop2xwh) {
  .grid-container {
    right: -41em;
  }

  .grid-right ul {
    margin-top: -5em;
  }
}

@media screen(desktopwh) {
  .grid-container {
    right: -32em;
  }
}
</style>
