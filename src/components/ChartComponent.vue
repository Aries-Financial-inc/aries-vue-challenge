<template>
  <v-card>
    <v-card-title>Options Profit/Loss Chart</v-card-title>
    <v-card-text>
      <canvas ref="profitLossChart"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { calculateProfitLoss } from '@/utils/calculations';

Chart.register(...registerables);

export default {
  name: 'ChartComponent',
  props: {
    optionsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    optionsData: 'renderChart',
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.profitLossChart.getContext('2d');
      const { prices, profits } = this.generateChartData();

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: prices,
          datasets: [
            {
              label: 'Profit/Loss',
              data: profits,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Underlying Price',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Profit/Loss',
              },
            },
          },
        },
      });
    },
    generateChartData() {
      const prices = [];
      const profits = [];
      for (let price = 80; price <= 120; price += 0.5) {
        let totalProfit = 0;
        this.optionsData.forEach((option) => {
          totalProfit += calculateProfitLoss(price, option);
        });
        prices.push(price);
        profits.push(totalProfit);
      }
      return { prices, profits };
    },
  },
};
</script>
