<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData(newData) {
      this.renderChart(newData, this.options);
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
}
</style>