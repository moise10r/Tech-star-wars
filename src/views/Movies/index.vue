<template>
  <div class="loading" v-if="loading"></div>
  <div class="movies-dropdown">
    <div class="button-container">
      <select v-model="dropdownTitle" @change="movieSelected">
        <option value="">Choose a star wars movies</option>
        <template v-if="movies.length > 0">
          <MovieList :movies="movies" />
        </template>
      </select>
    </div>
  </div>
  <OpeningCrawl v-if="movie.movie.opening_crawl" :openingCrawl="movie.movie.opening_crawl"/>
  <template v-if="characters.length > 0">
    <CharacterTable :characters="characters" />
  </template>
</template>

<script>
import { onMounted, ref, reactive } from 'vue';
import MovieList from '@/components/Movies/MovieList.vue';
import OpeningCrawl from '@/components/Movies/OpeningCrawl.vue';
import CharacterTable from '@/components/Movies/CharacterTable.vue';
import { getFilms, fetchCharacters } from '@/services';

export default {
  name: 'MoviesView',
  components: {
    MovieList,
    OpeningCrawl,
    CharacterTable,
  },
  setup() {
    const dropdownTitle = ref('');
    const loading = ref(false);
    const movies = ref([]);
    const movie = reactive({
      movie: {},
    });
    const characters = ref([]);
    const movieSelected = async (e) => {
      loading.value = true;
      characters.value = [];
      movie.movie = {};
      if (e.target.value === '') return;
      const response = await fetch(e.target.value);
      const data = await response.json();
      movie.movie = data;
      Promise.all(data.characters.map((url) => fetchCharacters(url)))
        .then((data) => {
          loading.value = false;
          characters.value = data.filter((character) => character.height !== 'unknown' && character.height !== 'n/a');
        }).catch((error) => {
          loading.value = false;
          console.log(error);
        });
    };
    const fetchFilms = async (path) => {
      loading.value = true;
      getFilms(path)
        .then((data) => {
          loading.value = false;
          const sortedData = data.results.sort((a, b) => {
            return new Date(a.release_date) - new Date(b.release_date);
          });
          movies.value = sortedData;
        }).catch((error) => {
          loading.value = false;
          console.log(error);
        })
    };
    onMounted(() => fetchFilms('films'));
    return {
      movies,
      movie,
      movieSelected,
      characters,
      dropdownTitle,
      loading,
    } 
  },
};
</script>

<style scoped>
.movies-dropdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.button-container {
  width: 100%;
  position: relative;
  text-align: left;
}

.button-container select {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background: yellow;
}

.dropdown-toggle {
  display: block;
  padding: 1rem;
  font-size: 1.2rem;
  outline: none;
  border: none;
  width: 100%;
  text-align: left;
}

.dropdown-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.5rem solid black;
  transition: all 0.3s ease;
}

.dropdown-toggle.active::after {
  transform: translateY(-50%) rotate(180deg);
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 10px solid white;
    border-radius: 50%;
    border-top: 10px solid yellow;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>