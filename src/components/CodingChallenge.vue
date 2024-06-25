<template>
  <div>
    <h1>Options Profit Calculator</h1>

    <div v-if="chartData">
      <LineChart :labels="chartLabels" :data="chartData" />
      <div>
        <p>Max Profit: {{ maxProfit }}</p>
        <p>Max Loss: {{ maxLoss }}</p>
        <p>Break-even Points: {{ breakEvenPoints.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Option, OptionType, PositionType } from '@/models/Option'
import {
  getBreakEvenPoints,
  getMaxProfit,
  getMaxLoss,
  generateChartData
} from '@/utils/OptionUtils'

import LineChart from '@/components/LineChart.vue'

export default Vue.extend({
  name: 'CodingChallenge',

  components: {
    LineChart
  },

  props: {
    optionsData: {
      type: Array as () => Option[],
      required: true
    }
  },

  data(): {
    chartLabels: number[]
    chartData: number[]
  } {
    return {
      chartLabels: [],
      chartData: []
    }
  },

  computed: {
    OptionType() {
      return OptionType
    },
    PositionType() {
      return PositionType
    },
    breakEvenPoints(): number[] {
      return getBreakEvenPoints(this.optionsData)
    },
    maxProfit(): number {
      return getMaxProfit(this.optionsData)
    },
    maxLoss(): number {
      return getMaxLoss(this.optionsData)
    }
  },

  methods: {
    generateChartData() {
      const { prices, profits } = generateChartData(this.optionsData)
      this.chartLabels = prices
      this.chartData = profits
    }
  },

  watch: {
    options: {
      handler() {
        this.generateChartData()
      },
      deep: true,
      immediate: true
    }
  }
})
</script>

<style scoped>
/* Your Code Here */
</style>
