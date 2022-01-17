<template>
  <div
    id="aboutUs-marker"
    class="flex grid-container laptop:absolute flex-col mt-60 laptop:flex-row"
  >
    <div class="sticky-nav">
      <div class="font-dinProBlack">About Us</div>
    </div>
    <div class="flex flex-col laptop:mr-4 px-6 about-container desktopwh:ml-40">
      <div
        class="text-container flex flex-col justify-between items-start h-full"
      >
        <div>
          <h2 class="text-white laptop:text-6xl">{{ title }}</h2>
          <div class="paragraph-container">
            <p class="text-white pt-8 laptop:w-1/2">{{ blurb }}</p>
          </div>
        </div>
        <p class="text-white underline pt-8 cta-container">
          <a :href="astoundgroup_cta.link" target="blank" class="cta-link">
            <!-- {{ astoundgroup_cta.text }} -->

            Go to Main Website &nearr;
          </a>
        </p>
      </div>
    </div>
    <div
      class="
        grid-right
        p-4
        laptop:p-0
        mb-8
        laptop:mb-0 laptop:ml-24
        process-wrapper
      "
    >
      <div
        class="
          flex flex-col
          process-container
          justify-center
          items-center
          laptop:items-start
        "
      >
        <h3 class="text-white self-start">Our Process</h3>
        <div class="process-group hidden laptop:flex">
          <div class="process-item">
            <img src="../assets/1-SpotTheProblem.png" alt="" />
            <p>Spot the Problem</p>
          </div>
          <div class="process-item">
            <img src="../assets/2-UnderstandUser.png" alt="" />
            <p>Understand the User</p>
          </div>
          <div class="process-item">
            <img src="../assets/3-AnalyzeFindings.png" alt="" />
            <p>Analyze Findings</p>
          </div>
        </div>
        <div class="process-group ml-48 hidden laptop:flex">
          <div class="process-item">
            <img src="../assets/4-Ideate.png" alt="" />
            <p>Ideate &amp; Create Mockups</p>
          </div>
          <div class="process-item">
            <img src="../assets/5-BuildMVP.png" alt="" />
            <p>Build MVP &amp; Distribute</p>
          </div>
          <div class="process-item">
            <img src="../assets/6-ReviewFeedbackIterate.png" alt="" />
            <p>Review Feedback &amp; Iterate</p>
          </div>
        </div>

        <div class="process-group flex laptop:hidden">
          <div class="process-item">
            <img src="../assets/1-SpotTheProblem.png" alt="" />
            <p>Spot the Problem</p>
          </div>
          <div class="process-item">
            <img src="../assets/2-UnderstandUser.png" alt="" />
            <p>Understand the User</p>
          </div>
        </div>
        <div class="process-group flex laptop:hidden">
          <div class="process-item">
            <img src="../assets/3-AnalyzeFindings.png" alt="" />
            <p>Analyze Findings</p>
          </div>

          <div class="process-item">
            <img src="../assets/4-Ideate.png" alt="" />
            <p>Ideate &amp; Create Mockups</p>
          </div>
        </div>
        <div class="process-group flex laptop:hidden">
          <div class="process-item">
            <img src="../assets/5-BuildMVP.png" alt="" />
            <p>Build MVP &amp; Distribute</p>
          </div>
          <div class="process-item">
            <img src="../assets/6-ReviewFeedbackIterate.png" alt="" />
            <p>Review Feedback &amp; Iterate</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col grid-right items-center laptop:flex-row laptop:ml-80"
    >
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
        <h3 class="service-text text-white pl-6 pt-6">Our Services</h3>
        <li
          v-for="blok in blok.columns"
          :key="blok._uid"
          class="flex-auto px-6 laptop:w-1/3 text-white laptop:mr-12 list-none"
        >
          <component :is="blok.component" :blok="blok" />
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
        'Technology is a tool to enhance connection. We bring stories to life that inspire audiences, we innovate solutions that enhance experiences, and we reveal opportunities that drive business.',
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
  @apply p-4 my-4 w-1/2 text-center;
}

.process-item > p {
  @apply w-full text-white uppercase h-8 px-1 pt-2 font-primaryHeadline;
}

@media screen(mobile) {
  .process-item > img {
    max-width: 200px;
    width: 100%;
    display: inline-block;
  }
}

@media screen(laptop) {
  .service-text {
    padding: 0;
    margin-top: -2rem;
    white-space: nowrap;
  }

  .process-group {
    height: 30vh;
  }

  .process-item {
    @apply p-4 my-4 text-center flex flex-col justify-end;
  }

  .process-item > img {
    max-width: 300px;
    display: inline-block;
  }

  .grid-container h1 {
    font-size: 3em;
  }

  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 250vh;
    right: -87em;

    /* max-width: 1971px; */
  }

  .grid-right ul {
    min-width: 200%;
    height: 80%;
  }

  .text-container {
    width: 900px;
  }
}

@media screen(laptopwh) {
  .grid-right ul {
    margin-top: -5em;
  }
}

@media screen(laptop2xwh) {
  .grid-container {
    right: -70em;
  }

  .grid-right ul {
    margin-top: -3em;
  }
  .about-container {
    max-height: 32em;
  }
}

.cta-link:hover,
.cta-container:hover .cta-link,
.cta-container:hover {
  background: linear-gradient(
    -90deg,
    rgba(255, 78, 0, 1) 0%,
    rgba(48, 214, 217, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
