<template>
    <div class="chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  export default {
    name: 'LineChart',
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        if (this.chart) {
          this.chart.destroy();
        }
        const ctx = this.$refs.lineChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions
        });
      }
    },
    watch: {
      chartData: {
        handler() {
          this.renderChart();
        },
        deep: true
      }
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 400px;
    width: 100%;
  }
  </style>
  