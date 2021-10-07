<template>
  <section>
    <CaseStudy :blok="story.content" class="mt-36"/>
  </section>
</template>

<script>
import CaseStudy from '~/components/CaseStudy.vue'

export default {
  components: {
    CaseStudy
  },
  asyncData (context) {
    // Load the JSON from the API
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
 
    return context.app.$storyapi.get(`cdn/stories/case-studies/${context.params.slug}`, {
      version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },
  data() {
    return {
      story: { content: {} }
    }
  },
  mounted() {
    this.$storybridge(() => {
    	const { StoryblokBridge } = window
      const storyblokInstance = new StoryblokBridge()

      // use the input event for instant update of content
      storyblokInstance.on('input', (event) => {
        console.log(this.story.content)
        if(event.story.id === this.story.id){
          this.story.content = event.story.content
        }
      })

      // use the bridge to listen to the events
      storyblokInstance.on(['published', 'changed'], (event) => {
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      })
    })
  },
}
</script>
