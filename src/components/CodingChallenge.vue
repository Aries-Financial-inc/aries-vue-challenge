<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div class="chart-container">
      <line-chart
        v-if="chartData"
        :chartData="chartData"
        :options="chartOptions"
      />
    </div>
    <div v-if="analysis">
      <p>Max Profit: {{ analysis.maxProfit }}</p>
      <p>Max Loss: {{ analysis.maxLoss }}</p>
      <p>Break Even Points: {{ analysis.breakEvenPoints.join(", ") }}</p>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "CodingChallenge",
  components: {
    LineChart,
  },
  props: {
    optionsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      analysis: null,
    };
  },
  mounted() {
    this.calculateRiskReward();
  },
  methods: {
    calculateRiskReward() {
      const { minPrice, maxPrice } = this.getUnderlyingPriceRange();
      const underlyingPrices = this.generateUnderlyingPrices(
        minPrice,
        maxPrice,
        1
      );
      const profits = underlyingPrices.map((price) =>
        this.calculateTotalProfit(price)
      );

      this.chartData = {
        labels: underlyingPrices,
        datasets: [
          {
            label: "Profit/Loss",
            backgroundColor: "#42A5F5",
            borderColor: "#42A5F5",
            data: profits,
            fill: false,
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Underlying Price at Expiry",
            },
          },
          y: {
            title: {
              display: true,
              text: "Profit/Loss",
            },
          },
        },
      };

      this.analysis = this.calculateAnalysis(profits, underlyingPrices);
    },
    getUnderlyingPriceRange() {
      const strikePrices = this.optionsData.map(
        (option) => option.strike_price
      );
      const minPrice = Math.min(...strikePrices) * 0.8; // 20% below the minimum strike price
      const maxPrice = Math.max(...strikePrices) * 1.2; // 20% above the maximum strike price
      return { minPrice, maxPrice };
    },
    generateUnderlyingPrices(min, max, step) {
      const prices = [];
      for (let i = min; i <= max; i += step) {
        prices.push(i);
      }
      return prices;
    },
    calculateTotalProfit(price) {
      return this.optionsData.reduce((total, option) => {
        const optionProfit = this.calculateOptionProfit(option, price);
        return total + optionProfit;
      }, 0);
    },
    calculateOptionProfit(option, price) {
      const { strike_price, type, bid, ask, long_short } = option;
      const cost = (bid + ask) / 2;
      const isLong = long_short === "long";
      let profit = 0;

      if (type === "Call") {
        profit = Math.max(0, price - strike_price) - cost;
      } else if (type === "Put") {
        profit = Math.max(0, strike_price - price) - cost;
      }

      return isLong ? profit : -profit;
    },
    calculateAnalysis(profits, prices) {
      const maxProfit = Math.max(...profits);
      const maxLoss = Math.min(...profits);
      const breakEvenPoints = [];

      for (let i = 1; i < profits.length; i++) {
        if (
          (profits[i - 1] < 0 && profits[i] >= 0) ||
          (profits[i - 1] >= 0 && profits[i] < 0)
        ) {
          const breakEvenPrice = (prices[i - 1] + prices[i]) / 2;
          breakEvenPoints.push(breakEvenPrice.toFixed(2));
        }
      }

      return {
        maxProfit,
        maxLoss,
        breakEvenPoints,
      };
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 40vh;
  width: 80vw;
  margin: auto;
}
</style>
