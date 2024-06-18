<template>
  <div class="options-calculator">
    <h1>Options Profit Calculator</h1>
    <line-chart :chart-data="chartData" />
    <div class="results">
      <p>Maximum Profit: ${{ maxProfit.toFixed(2) }}</p>
      <p>Maximum Loss: ${{ maxLoss.toFixed(2) }}</p>
      <p>Break Even Points: {{ breakEvenPoints.map(point => `$${point.toFixed(2)}`).join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'CodingChallenge',
  components: {
    LineChart: {
      extends: Line,
      mixins: [reactiveProp],
      props: ['chartData'],
      mounted() {
        this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
      }
    }
  },
  props: {
    optionsData: {
      type: Array,
      default: () => [],
      validator: (options) => options.length <= 4 // Validate to allow up to four options
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Profit/Loss',
          backgroundColor: 'rgba(135, 206, 250, 0.2)',
          borderColor: 'rgb(135, 206, 250)',
          data: []
        }]
      },
      maxProfit: 0,
      maxLoss: 0,
      breakEvenPoints: []
    };
  },
  methods: {
    calculateData() {
      let priceRange = this.getPriceRange();
      let profitLossArray = priceRange.map(price => this.calculateProfitLossAtPrice(price));

      this.chartData.labels = priceRange;
      this.chartData.datasets[0].data = profitLossArray;

      this.maxProfit = Math.max(...profitLossArray);
      this.maxLoss = Math.min(...profitLossArray);
      this.breakEvenPoints = this.findBreakEvenPoints(priceRange, profitLossArray);
    },
    getPriceRange() {
      // Define the price range over which the graph is plotted
      let minPrice = Math.min(...this.optionsData.map(option => option.strike_price)) - 50;
      let maxPrice = Math.max(...this.optionsData.map(option => option.strike_price)) + 50;
      return Array.from({length: maxPrice - minPrice + 1}, (_, i) => minPrice + i);
    },
    calculateProfitLossAtPrice(stockPrice) {
      // Calculate total profit or loss for a given stock price across all options
      return this.optionsData.reduce((total, option) => {
        let intrinsicValue = Math.max(0, (option.type === 'Call' ? stockPrice - option.strike_price : option.strike_price - stockPrice));
        let optionValue = intrinsicValue - ((option.bid + option.ask) / 2);
        return total + (option.long_short === 'long' ? optionValue : -optionValue);
      }, 0);
    },
    findBreakEvenPoints(prices, values) {
      // Determine where the profit/loss crosses zero
      let breakEvenPoints = [];
      for (let i = 1; i < values.length; i++) {
        if ((values[i-1] < 0 && values[i] > 0) || (values[i-1] > 0 && values[i] < 0)) {
          breakEvenPoints.push((prices[i-1] + prices[i]) / 2); // Average the two prices around the zero crossing
        }
      }
      return breakEvenPoints;
    }
  },
  mounted() {
    this.calculateData();
  }
}
</script>

<style scoped>
.options-calculator {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

.results p {
  color: #2c3e50;
  font-size: 16px;
}

.line-chart {
  max-width: 600px;
  margin: 20px auto;
}
</style>
