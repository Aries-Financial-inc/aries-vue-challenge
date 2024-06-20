<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <LineChartComponent :data="optionsData"  />
  </div>
</template>

<script>
import LineChartComponent from "./chart/LineChart"
export default {
  name: 'CodingChallenge',
  components:{
    LineChartComponent
  },
  props: {
    optionsData: {
      type: Array,
      required: true
    }
  },
  // Your code here
}
</script>

<style scoped>

</style>
