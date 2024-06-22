<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div class="d-flex justify-content-center">
      <risk-reward-chart :options="optionsData"/>
    </div>
  </div>
</template>

<script>
import RiskRewardChart from "./RiskRewardChart"
export default {
  name: 'CodingChallenge',
  props: {
    optionsData: Array
  },
  components: {
    RiskRewardChart,
  }
}
</script>

<style scoped>
.d-flex{
  display: flex;
}

.justify-content-center{
  justify-content: center;
}
</style>
