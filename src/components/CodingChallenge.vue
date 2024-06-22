<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div class="d-flex justify-content-center">
      <risk-reward-chart :options="optionsData"/>
    </div>
    <options-table :options="optionsData" />
  </div>
</template>

<script>
import RiskRewardChart from "./RiskRewardChart"
import OptionsTable from './OptionsTable.vue'

export default {
  name: 'CodingChallenge',
  props: {
    optionsData: Array
  },
  components: {
    RiskRewardChart,
    OptionsTable,
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
