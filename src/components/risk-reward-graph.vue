<template>
  <div>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="currentChartData"
      chart-id="risk-reward-graph"
    />

    <div
      v-if="currentChartData.datasets.length"
      class="max-w-md text-left mt-2 mb-24 mx-auto"
    >
      <div class="grid grid-cols-4 gap-4 border-b-2 mb-2">
        <h5>Option Name</h5>
        <h5>Max Profit</h5>
        <h5>Max Loss</h5>
        <h5>No loss</h5>
      </div>
      <div
        v-for="(option, idx) in currentChartData.datasets"
        :key="idx"
        class="grid grid-cols-4 gap-4 mb-2"
      >
        <h5 class="font-semibold">
          {{ option.label }}
        </h5>
        <p class="text-green-600">
          {{ option.maxProfit }}
        </p>
        <p class="text-red-600">
          {{ option.maxLoss }}
        </p>
        <p>
          {{ option.noLossPricePoint ?? 'Loss option' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  registerables,
} from "chart.js";

ChartJS.register(...registerables);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxis: {
            grid: {
              display: false,
            },
            title: {
              align: "end",
              color: "#b38bf4",
              display: true,
              font: {
                size: 18,
              },
              text: "Price",
            },
          },
        },
      },
      currentChartData: {
        datasets: [],
        labels: [],
      },
    };
  },
  methods: {
    async renderChart() {
      if (!this.chartData.datasets.length) {
        this.$notify({
          group: "riskReward",
          text: "Add options for further work!",
          title: "No options",
          type: "error",
        });
      }

      this.currentChartData = JSON.parse(JSON.stringify(this.chartData));
    },
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart();
      },
    },
  },
};
</script>
