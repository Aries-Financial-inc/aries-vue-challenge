<template>
  <div>
    <h1>Options Profit Calculator</h1>

    <div v-for="(option, index) in optionsData" :key="index">
      <h3>Option {{ index + 1 }}</h3>
      <input v-model.number="option.strike_price" placeholder="Strike Price" />
      <select v-model="option.type">
        <option v-for="item in OptionType" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <input v-model.number="option.bid" placeholder="Bid" />
      <input v-model.number="option.ask" placeholder="Ask" />
      <select v-model="option.position">
        <option v-for="item in PositionType" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <!-- <button @click="addOption">Add Option</button>
    <button @click="removeOption">Remove Option</button>
    <button @click="calculate">Calculate</button> -->

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
  calculateStrategyProfitLoss,
  getBreakEvenPoints,
  getMaxProfit,
  getMaxLoss
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
      const prices = []
      const profits = []
      for (let i = 0; i <= 200; i += 5) {
        prices.push(i)
        profits.push(calculateStrategyProfitLoss(this.optionsData, i))
      }
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
