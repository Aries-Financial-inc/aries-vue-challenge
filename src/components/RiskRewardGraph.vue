<template>
  <div>
    <h2>Risk & Reward Graph</h2>
    <canvas id="riskRewardChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  props: ['options', 'showGraph'],
  watch: {
    options: {
      deep: true,
      handler() {
        if (this.showGraph) {
          this.generateGraph();
        }
      }
    },
    showGraph(newValue) {
      if (newValue) {
        this.generateGraph();
      }
    }
  },
  methods: {
    generateGraph() {
      const ctx = document.getElementById('riskRewardChart').getContext('2d');
      const data = this.calculateRiskRewardData();

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Profit/Loss',
            data: data.values,
            borderColor: 'blue',
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              title: {
                display: true,
                text: 'Underlying Price at Expiry'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Profit/Loss'
              }
            }
          }
        }
      });
    },
    calculateRiskRewardData() {
      const prices = [];
      const profits = [];
      const minPrice = Math.min(...this.options.map(o => o.strike_price)) - 20;
      const maxPrice = Math.max(...this.options.map(o => o.strike_price)) + 20;

      for (let price = minPrice; price <= maxPrice; price += 1) {
        let profit = 0;
        this.options.forEach(option => {
          const premium = (option.bid + option.ask) / 2;
          if (option.type === 'Call') {
            if (option.long_short === 'long') {
              profit += Math.max(0, price - option.strike_price) - premium;
            } else {
              profit -= Math.max(0, price - option.strike_price) - premium;
            }
          } else {
            if (option.long_short === 'long') {
              profit += Math.max(0, option.strike_price - price) - premium;
            } else {
              profit -= Math.max(0, option.strike_price - price) - premium;
            }
          }
        });
        prices.push(price.toFixed(2));
        profits.push(profit.toFixed(2));
      }

      return { labels: prices, values: profits };
    }
  }
};
</script>