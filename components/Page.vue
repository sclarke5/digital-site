<template>
  <div
    v-editable="blok"
    class="mt-28 bg-black"> 
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component" /> 
  </div> 
</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>