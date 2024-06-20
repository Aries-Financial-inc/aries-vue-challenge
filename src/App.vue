<template>
  <div id="app">
    <CodingChallenge :optionsData="sampleData" />
    <notifications group="foo"  position="bottom right" />
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
