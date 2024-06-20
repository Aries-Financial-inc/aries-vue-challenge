<template>
  <div id="app">
    <CodingChallenge :optionsData="sampleData" />
  </div>
</template>

<script>
import CodingChallenge from './components/CodingChallenge.vue';

export default {
  name: 'App',
  components: {
    CodingChallenge
  },
  data() {
    return {
      sampleData: []
    };
  }
};
</script>
