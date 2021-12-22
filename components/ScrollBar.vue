<template>
  <div class="scroll-bar">
    <div class="progress"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const scrollContainer = document.getElementById('scrollEl')

    scrollContainer.addEventListener('scroll', (e) => {
      const distanceFromTop = scrollContainer.scrollTop

      const height = scrollContainer.scrollHeight - document.body.clientHeight
      console.log((distanceFromTop / height) * 100)

      document.querySelector('.progress').style.width =
        (distanceFromTop / height) * 100 + '%'
    })
  },
}
</script>

<style scoped>
.scroll-bar {
  position: fixed;
  width: calc(100vw - 10rem);
  margin: 0 1rem;
  height: 2px;
  bottom: 1rem;
  right: 8rem;
  background-color: white;
  z-index: 2000;
}

.progress {
  width: 0%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 78, 0, 1) 0%,
    rgba(48, 214, 217, 1) 100%
  );
}
</style>
