<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <OptionFormManager :optionsData="localOptionsData" @update-options="updateOptionsData" />
    <button @click="calculateRiskReward" class="analyze-button">Analyze</button>
    <ChartDisplay :chartData="chartData" :chartOptions="chartOptions" :maxProfit="maxProfit" :maxLoss="maxLoss"
      :breakevenPoints="breakevenPoints" />
  </div>
</template>

<script>
import OptionFormManager from './OptionFormManager.vue';
import ChartDisplay from './ChartDisplay.vue';

export default {
  name: 'CodingChallenge',
  components: {
    OptionFormManager,
    ChartDisplay
  },
  props: {
    optionsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localOptionsData: JSON.parse(JSON.stringify(this.optionsData)),
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
  methods: {
    updateOptionsData(newOptionsData) {
      this.localOptionsData = newOptionsData;
    },
    calculateRiskReward() {
      const priceRange = Array.from({ length: 201 }, (_, i) => i + 50); // Prices from 50 to 250
      const profitLoss = priceRange.map(price => {
        return this.localOptionsData.reduce((total, option) => {
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
        return (profitLoss[index - 1] < 0 && profitLoss[index] > 0) || (profitLoss[index - 1] > 0 && profitLoss[index] < 0);
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
  watch: {
    optionsData: {
      immediate: true,
      handler(newVal) {
        this.localOptionsData = JSON.parse(JSON.stringify(newVal));
      }
    }
  }
}
</script>

<style scoped>
.analyze-button {
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.analyze-button:hover {
  background-color: #27ae60;
}
</style>