<template>
  <div>
    <h1>Options Profit Calculator</h1>

    <ProfitLossChart :optionsData="optionsData" :class="$style.Chart" />

    <ProfitLossSummary :optionsData="optionsData" :class="$style.Summary" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/* import models */
import { Option } from '@/models/Option'

/* import components */
import ProfitLossChart from '@/components/ProfitLossChart.vue'
import ProfitLossSummary from '@/components/ProfitLossSummary.vue'

export default Vue.extend({
  components: {
    ProfitLossChart,
    ProfitLossSummary
  },

  props: {
    optionsData: {
      type: Array as () => Option[],
      required: true
    }
  }
})
</script>

<style module>
/* Controls the layout and spacing of the components at Container layers */
.Chart {
  margin-top: 2em;
}
.Summary {
  margin-top: 2em;
}
</style>
