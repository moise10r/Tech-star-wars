<template>
  <div class="marquee">
    <p>
      {{ openingCrawl  }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'OpeningCrawl',
  props: {
    openingCrawl: {
      type: String,
    },
  },
  setup() {
    return {}
  },
});
</script>

<style scoped>
  .marquee {
    width: 100%;
    margin-block: 20px;
    height: 50px;	
    overflow: hidden;
    position: relative;
    background: yellow;
    color: orange;
    border: 1px solid orange;
  }
  .marquee p {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    line-height: 50px;
    text-align: center;
    color: #000;
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);	
    transform: translateX(100%);
    -moz-animation: marquee 15s linear infinite;
    -webkit-animation: marquee 15s linear infinite;
    animation: marquee 15s linear infinite;
  }
  @-moz-keyframes marquee {
    0%   { -moz-transform: translateX(100%); }
    100% { -moz-transform: translateX(-100%); }
  }
  @-webkit-keyframes marquee {
    0%   { -webkit-transform: translateX(100%); }
    100% { -webkit-transform: translateX(-100%); }
  }
  @keyframes marquee {
    0%   { 
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%); 		
  }
  100% { 
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%); 
  }
}
</style>