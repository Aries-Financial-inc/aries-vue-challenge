<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <line-chart :chartData="chartData" :options="chartOptions"></line-chart>
    <div class="summary">
      <p><strong>Max Profit:</strong> {{ maxProfit }}</p>
      <p><strong>Max Loss:</strong> {{ maxLoss }}</p>
      <p><strong>Breakeven Points:</strong> {{ displayBreakevenPoints }}</p>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue';

export default {
  name: 'CodingChallenge',
  components: {
    LineChart
  },
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
      breakevenPoints: [],
      chartData: {
        labels: [],
        datasets: [{
          label: 'Profit/Loss',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Underlying Price at Expiry'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Profit/Loss'
            }
          }]
        }
      }
    }
  },
  computed: {
    /**
     * Formats the breakeven points for display.
     * @returns {string} Comma-separated string of breakeven points or 'None'.
     */
    displayBreakevenPoints() {
      return this.breakevenPoints.length > 0 ? this.breakevenPoints.join(', ') : 'None';
    }
  },
  methods: {
    /**
     * Calculates the risk and reward for the options strategy and updates chart data.
     */
    calculateRiskReward() {
      const priceRange = Array.from({ length: 201 }, (_, i) => i + 50); // Prices from 50 to 250
      const profitLoss = priceRange.map(price => {
        return this.optionsData.reduce((total, option) => {
          const { strike_price, type, bid, ask, long_short } = option;
          const premium = (bid + ask) / 2;
          let payoff = 0;

          if (type === 'Call') {
            payoff = Math.max(price - strike_price, 0);
          } else if (type === 'Put') {
            payoff = Math.max(strike_price - price, 0);
          }

          if (long_short === 'long') {
            return total + (payoff - premium);
          } else {
            return total + (premium - payoff);
          }
        }, 0);
      });

      this.maxProfit = Math.max(...profitLoss);
      this.maxLoss = Math.min(...profitLoss);

      // Calculate breakeven points
      this.breakevenPoints = priceRange.filter((price, index) => {
        return Math.abs(profitLoss[index]) < 0.01;
      });

      this.chartData = {
        labels: priceRange,
        datasets: [{
          label: 'Profit/Loss',
          data: profitLoss,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      };
    }
  },
  mounted() {
    this.calculateRiskReward();
  }
}
</script>

<style scoped>
.summary {
  margin-top: 20px;
}
</style>