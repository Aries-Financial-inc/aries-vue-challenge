<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <canvas id="riskRewardChart"></canvas>
    <div v-if="maxProfit !== null && maxLoss !== null">
      <p>Max Profit: {{ maxProfit }}</p>
      <p>Max Loss: {{ maxLoss }}</p>
      <p>Break Even Points: {{ breakEvenPoints.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'CodingChallenge',
  props: {
    optionsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      maxProfit: null,
      maxLoss: null,
      breakEvenPoints: []
    };
  },
  mounted() {
    this.calculateRiskReward();
  },
  methods: {
    calculateRiskReward() {
      const underlyingPrices = [];
      const profits = [];

      // Generate a range of underlying prices
      for (let price = 80; price <= 120; price += 1) {
        underlyingPrices.push(price);
      }

      // Calculate profit/loss for each underlying price
      underlyingPrices.forEach(price => {
        let totalProfit = 0;
        this.optionsData.forEach(option => {
          const { strike_price, type, bid, ask, long_short } = option;
          const cost = (bid + ask) / 2;

          if (type === 'Call') {
            if (long_short === 'long') {
              totalProfit += Math.max(0, price - strike_price) - cost;
            } else {
              totalProfit += cost - Math.max(0, price - strike_price);
            }
          } else if (type === 'Put') {
            if (long_short === 'long') {
              totalProfit += Math.max(0, strike_price - price) - cost;
            } else {
              totalProfit += cost - Math.max(0, strike_price - price);
            }
          }
        });
        profits.push(totalProfit);
      });

      // Calculate max profit, max loss, and break-even points
      this.maxProfit = Math.max(...profits);
      this.maxLoss = Math.min(...profits);
      this.breakEvenPoints = underlyingPrices.filter((price, index) => profits[index] === 0);

      // Plot the chart
      this.plotChart(underlyingPrices, profits);
    },
    plotChart(xData, yData) {
      const ctx = document.getElementById('riskRewardChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: xData,
          datasets: [{
            label: 'Profit/Loss',
            data: yData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
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
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
canvas {
  max-width: 600px;
  margin: 0 auto;
}
p {
  margin: 10px 0;
}
</style>
