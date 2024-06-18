<template>
  <div class="options-calculator">
    <h1 class="title">Options Profit Calculator</h1>
    <line-chart :chart-data="profitLossChartData" class="chart" />
    <div class="results-grid">
      <div class="result-card" v-for="(value, label) in resultsData" :key="label">
        <p class="label">{{ label }}</p>
        <p class="value">{{ value }}</p>
      </div>
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
      validator: optionsData => optionsData.length <= 4
    }
  },
  data() {
    return {
      profitLossChartData: {
        labels: [],
        datasets: [{
          label: 'Profit/Loss',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: []
        }]
      },
      maximumProfit: 0,
      maximumLoss: 0,
      breakEvenPoints: []
    };
  },
  computed: {
    resultsData() {
      return {
        'Maximum Profit': `$${this.maximumProfit.toFixed(2)}`,
        'Maximum Loss': `$${this.maximumLoss.toFixed(2)}`,
        'Break Even Points': this.formattedBreakEvens
      };
    },
    formattedBreakEvens() {
      return this.breakEvenPoints.map(point => `$${point.toFixed(2)}`).join(', ');
    }
  },
  methods: {
    initializeChartData() {
      const priceRange = this.computePriceRange();
      const profitLossValues = priceRange.map(this.calculateProfitOrLossAtPrice);
      this.profitLossChartData.labels = priceRange;
      this.profitLossChartData.datasets[0].data = profitLossValues;
      this.maximumProfit = Math.max(...profitLossValues);
      this.maximumLoss = Math.min(...profitLossValues);
      this.breakEvenPoints = this.computeBreakEvenPoints(priceRange, profitLossValues);
    },
    computePriceRange() {
      const minPrice = Math.min(...this.optionsData.map(opt => opt.strike_price)) - 50;
      const maxPrice = Math.max(...this.optionsData.map(opt => opt.strike_price)) + 50;
      return Array.from({ length: maxPrice - minPrice + 1 }, (_, i) => minPrice + i);
    },
    calculateProfitOrLossAtPrice(stockPrice) {
      return this.optionsData.reduce((total, { type, strike_price, bid, ask, long_short }) => {
        const intrinsicValue = Math.max(0, type === 'Call' ? stockPrice - strike_price : strike_price - stockPrice);
        const optionCost = (bid + ask) / 2;
        const profitOrLoss = intrinsicValue - optionCost;
        return total + (long_short === 'long' ? profitOrLoss : -profitOrLoss);
      }, 0);
    },
    computeBreakEvenPoints(prices, values) {
      return prices.reduce((breakEvens, _, i) => {
        if (i > 0 && ((values[i-1] < 0 && values[i] > 0) || (values[i-1] > 0 && values[i] < 0))) {
          breakEvens.push((prices[i-1] + prices[i]) / 2);
        }
        return breakEvens;
      }, []);
    }
  },
  mounted() {
    this.initializeChartData();
  }
}
</script>

<style scoped>
.options-calculator {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
  color: #333;
}

.title {
  font-size: 24px;
  font-weight: 500;
}

.results-grid {
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: center;
}

.result-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.label {
  font-size: 14px;
  color: #555;
}

.value {
  font-size: 16px;
  font-weight: bold;
}

.line-chart {
  width: 100%;
  max-width: 600px;
}
</style>
