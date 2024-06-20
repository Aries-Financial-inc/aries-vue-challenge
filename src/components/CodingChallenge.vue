<template>
  <div>
    <h1>Options Profit Calculator</h1>
    
    <ProfitLossChart 
      v-for="(option, index) in optionsData" 
      :key="index"
      :option="option"
    />

  </div>
</template>

<script>
import ProfitLossChart from './ProfitLossChart.vue';

export default {
    name: 'CodingChallenge',
    props: {
        optionsData: Array
    }
    // Your code here
    ,
    components: { ProfitLossChart },
}
</script>

<style scoped>
/* Your Code Here */
</style>
