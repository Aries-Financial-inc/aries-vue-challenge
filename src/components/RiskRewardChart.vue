<template>
  <div class="w-80">
    <line-chart 
      :data="chartData" 
      :options="chartOptions" 
    />
  </div>
</template>

<script>
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'
import { generateChartData } from "../utils/dataGenerator"
import chartOptions from "../utils/chartOptions"

ChartJS.register(...registerables)

export default {
  name: 'RiskRewardChart',
  components: {
    LineChart,
  },
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: chartOptions
    }
  },
  mounted() {
    this.chartData = generateChartData(this.options)
  },
}
</script>

<style scoped>
.w-80 {
  width: 80%;
}
</style>
