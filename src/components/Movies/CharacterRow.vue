<template>
  <li class="character-item">
    <div class="character">
      <span>{{ character.name }}</span>
      <span>{{ character.gender }}</span>
      <span>{{ character.height }}</span>
    </div>
  </li>
</template>
  
<script>
  export default {
    name: 'CharacterRow',
    props: {
      character: {
        type: Object,
      },
    },
    setup() {
      return {}
    },
  };
</script>

<style scoped>
  .character-item {
    width: 100%;
  }
  
  .character {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .character span {
    padding: 0.8rem;
    font-size: 1rem;
    text-align: center;
  }

  .character span:nth-child(1) {
    width: 50%;
  }

  .character span:nth-child(2), 
  .character span:nth-child(3) {
    width: 25%;
  }
</style>