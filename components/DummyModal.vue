<template>
  <div v-if="showModal" class="absolute text-white mt-24 z-50">
    <button @click="toggleModal" class="font-bold text-6xl z-50">x</button>
    <pre>{{ content }}</pre>
    <pre>{{ list }}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    showModal() {
      return this.$store.state.modal.show
    },
    content() {
      return this.$store.state.modal.content
    },
    list() {
      return this.$store.state.modal.list
    },
  },
  methods: {
    toggleModal() {
      this.$store.dispatch('modal/toggle')
    },
  },
}
</script>
