<template>
  <div id="app">
    <RiskRewardGraph :optionsContracts="optionsContracts" />
  </div>
</template>

<script>
import RiskRewardGraph from './components/RiskRewardGraph.vue';

export default {
  name: 'App',
  components: {
    RiskRewardGraph
  },
  data() {
    return {
      optionsContracts: [] // Add your options contracts data here
    };
  }
};
</script>

<style>
/* Add global styles here */
</style>
