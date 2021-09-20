<template>
  <div>
    <h1>This is a job posting for {{ job }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    job() {
      return this.$route.params.slug
    },
  },
}
</script>
