<template>
  <div class="summary">
    <line-chart :chartData="chartData" :options="chartOptions"></line-chart>
    <p><strong>Max Profit:</strong> {{ maxProfit }}</p>
    <p><strong>Max Loss:</strong> {{ maxLoss }}</p>
    <p><strong>Breakeven Points:</strong> {{ displayBreakevenPoints }}</p>
  </div>
</template>

<script>
import LineChart from './LineChart.vue';

export default {
  name: 'ChartDisplay',
  components: {
    LineChart
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    },
    maxProfit: {
      type: Number,
      required: true
    },
    maxLoss: {
      type: Number,
      required: true
    },
    breakevenPoints: {
      type: Array,
      required: true
    }
  },
  computed: {
    displayBreakevenPoints() {
      return this.breakevenPoints.length > 0 ? this.breakevenPoints.join(', ') : 'None';
    }
  }
}
</script>

<style scoped>
.summary {
  margin-top: 20px;
}
</style>