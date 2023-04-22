<template>
  <div class="character-table">
    <div class="gender">
      <select v-model="gender">
        <option value="all">All Gender</option>
        <option value="m">Male</option>
        <option value="f">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
   <div class="header">
     <button type="button" class="filter-btn" @click="filterByName('name')">
      Name
    </button>
     <button type="button" class="filter-btn" @click="filterByName('gender')">
      Gender
    </button>
     <button type="button" class="filter-btn" @click="filterByHeight('height')">
      Height
    </button>
   </div>
   <div class="cells">
     <CharacterRow v-for="(character, i) in filterPersons" :key="i" :character="character" />
   </div>
   <div class="footer">
     <span>{{ totalPersons }}</span>
     <span>{{ cmToFeet(totalHeight) }}</span>
   </div>
  </div>
</template>

<script>
  import { ref, watch, computed } from 'vue';
  import CharacterRow from '@/components/Movies/CharacterRow.vue';
  export default {
    name: 'CharacterTable',
    components: {
      CharacterRow,
    },
    props: {
      characters: {
        type: Array,
      },
    },
    setup(props) {
      const persons = ref(props.characters);
      const filterPersons = ref(props.characters);
      const sortOrder = ref(true);
      const gender = ref('all');
      const totalPersons = computed(() => filterPersons.value.length);
      const totalHeight = computed(() => {
        return filterPersons.value.reduce((acc, curr) => {
          return acc + parseInt(curr.height);
        }, 0);
      });
      const cmToFeet = (cm) => {
        const realFeet = ((cm * 0.393700) / 12);
        const feet = Math.floor(realFeet);
        const inches = Math.round((realFeet - feet) * 12);
        return `${feet}ft/${inches}in`;
      };
      const filterByName = (key = '') => {
        if (!sortOrder.value) {
          filterPersons.value = filterPersons.value.sort((a, b) => {
            if (a[key] > b[key]) {
              return 1;
            }
            if (a[key] < b[key]) {
              return -1;
            }
            return 0;
          });
          sortOrder.value = !sortOrder.value;
        } else {
          filterPersons.value = filterPersons.value.sort((a, b) => {
            if (a[key] > b[key]) {
              return -1;
            }
            if (a[key] < b[key]) {
              return 1;
            }
            return 0;
          });
          sortOrder.value = !sortOrder.value;
        }
      };
      const filterByHeight = (key = '') => {
        if (!sortOrder.value) {
          filterPersons.value = filterPersons.value.sort((a, b) => {
            if (parseInt(a[key]) > parseInt(b[key])) {
              return 1;
            }
            if (parseInt(a[key]) < parseInt(b[key])) {
              return -1;
            }
            return 0;
          });
          sortOrder.value = !sortOrder.value;
        } else {
          filterPersons.value = filterPersons.value.sort((a, b) => {
            if (parseInt(a[key]) > parseInt(b[key])) {
              return -1;
            }
            if (parseInt(a[key]) < parseInt(b[key])) {
              return 1;
            }
            return 0;
          });
          sortOrder.value = !sortOrder.value;
        }
      };
      watch(gender, (newGender) => {
        if (newGender === 'all') {
          filterPersons.value = persons.value;
        }
        if (newGender === 'm') {
          filterPersons.value = persons.value.filter((person) => person.gender === 'male');
        }
        if (newGender === 'f') {
          filterPersons.value = persons.value.filter((person) => person.gender === 'female');
        }
        if (newGender === 'other') {
          filterPersons.value = persons.value.filter((person) => (person.gender !== 'female') && (person.gender !== 'male'));
        }
      });
      return {
        persons,
        filterByName,
        filterByHeight,
        gender,
        filterPersons,
        totalPersons,
        cmToFeet,
        totalHeight,
      }
    },
  };
</script>

<style scoped>
  .character-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 300px;
  }

  .gender {
    width: 50%;
    margin: 0 auto;
  }

  .gender select {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.5rem;
    background: yellow
  }
  .header, .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .filter-btn {
    padding: 0.8rem;
    font-size: 1.5rem;
  }

  .filter-btn:nth-child(1) {
    width: 50%;
  }

  .filter-btn:nth-child(2), 
  .filter-btn:nth-child(3) {
    width: 25%;
  }

  .cells {
    width: 100%;
  }

  .footer {
    background: #f2f2f2;
  }

  .footer span {
    padding: 0.8rem;
    font-size: 1rem;
    text-align: center;
    color: #000;
  }

  .footer span:nth-child(1) {
    width: 50%;
  }
  .footer span:nth-child(2) {
    width: 25%;
  }
</style>