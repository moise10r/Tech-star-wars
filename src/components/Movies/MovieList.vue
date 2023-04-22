<template>
  <MovieItem
    v-for="(movie, i) in movies"
    :key="i" :movie="movie"
  />
</template>

<script>
  import { defineComponent } from 'vue';
  import MovieItem from '@/components/Movies/Movie.vue';
  export default defineComponent({
    name: 'MovieList',
    components: {
      MovieItem,
    },
    props: {
      movies: {
        type: Array,
        required: true,
      },
    },
    setup() {
    
    return {}   
    
    },
  });
</script>

<style scoped>
.movielist-container {
  width: 100%;
}
.movielist {
  width: 100%;
  max-height: 0;
  overflow-y: scroll;
}

.movie-button {
  padding: 0.8rem;
  width: 100%;
  font-size: 1.5rem;
}
</style>