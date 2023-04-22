<template>
  <div class="app-content">
    <h1 class="app-title">
      Star Wars
    </h1>
    <MoviesView />
  </div>
</template>

<script>
import MoviesView from '@/views/Movies/index.vue';

export default {
  name: 'App',
  components: {
    MoviesView
  }
}
</script>

<style>
#app {

}
.app-content {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-title {
  font-size: 8rem;
}
</style>
