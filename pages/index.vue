<template>
  <div>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
    <ButtonCta v-for="(cta, index) in ctas" :key="index">
      {{ cta.title }}
    </ButtonCta>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/home', {
        version: 'draft',
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })
  },
  data() {
    return {
      ctas: [
        {
          title: 'Learn More',
        },
        {
          title: 'Get a Quote',
        },
      ],
      story: { content: {} },
    }
  },

  async fetch(context) {
    // Loading reference data - Articles in our case
    if (context.store.state.articles.loaded !== '1') {
      const articlesRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'articles/',
        version: 'draft',
      })
      context.store.commit('articles/setArticles', articlesRefRes.data.stories)
      context.store.commit('articles/setLoaded', '1')
    }
    if (context.store.state.caseStudies.loaded !== '1') {
      const caseSudiesRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: 'case-studies/',
        version: 'draft',
      })
      context.store.commit(
        'caseStudies/setCaseStudies',
        caseSudiesRefRes.data.stories
      )
      context.store.commit('caseStudies/setLoaded', '1')
    }
  },
  mounted() {
    this.$storybridge(() => {
      const { StoryblokBridge } = window
      const storyblokInstance = new StoryblokBridge()

      // Use the input event for instant update of content
      storyblokInstance.on('input', (event) => {
        console.log(this.story.content)
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      })

      // Use the bridge to listen the events
      storyblokInstance.on(['published', 'change'], (event) => {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      })
    })
  },
}
</script>
