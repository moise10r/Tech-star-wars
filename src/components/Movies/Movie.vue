<template>
  <option :value="movie.url">{{ movie.title }}</option>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {}
  },
});
</script>

<style scoped>
  .movie-button {
    padding: 0.8rem;
    width: 100%;
    font-size: 1.5rem;
  }
</style>