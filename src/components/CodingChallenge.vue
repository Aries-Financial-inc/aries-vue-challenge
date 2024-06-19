<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div>
      <h2>Options Risk & Reward Graph</h2>
      <div>
        <label v-for="(option, index) in options" :key="index">
          Option {{ index + 1 }}:
          <input v-model="option.type" placeholder="Type (call/put)" />
          <input v-model.number="option.strike" placeholder="Strike Price" />
          <input v-model.number="option.price" placeholder="Option Price" />
        </label>
        <button @click="calculateRiskReward">Calculate</button>
      </div>
      <canvas ref="riskRewardChart"></canvas>
      <div v-if="result">
        <p>Max Profit: {{ result.maxProfit }}</p>
        <p>Max Loss: {{ result.maxLoss }}</p>
        <p>Break Even Points: {{ result.breakEvenPoints.join(", ") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: "CodingChallenge",
  props: {
    optionsData: Array,
  },
  data() {
    return {
      options: [
        { type: "call", strike: 100, price: 12.04 },
        { type: "call", strike: 102.5, price: 14 },
        { type: "put", strike: 103, price: 15.5 },
        { type: "call", strike: 105, price: 18 },
      ],
      result: null,
      chart: null,
    };
  },
  methods: {
    calculateRiskReward() {
      const { data, maxProfit, maxLoss, breakEvenPoints } =
        this.getRiskRewardData();

      this.result = { maxProfit, maxLoss, breakEvenPoints };

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.riskRewardChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.x,
          datasets: [
            {
              label: "Profit/Loss",
              data: data.y,
              borderColor: "rgba(75, 192, 192, 1)",
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
                text: "Price of Underlying at Expiry",
              },
            },
            y: {
              title: {
                display: true,
                text: "Profit/Loss",
              },
            },
          },
        },
      });
    },
    getRiskRewardData() {
      const steps = 50;
      const underlyingPrices = [];
      const profitLosses = [];

      const minPrice = Math.min(...this.options.map((opt) => opt.strike)) * 0.5;
      const maxPrice = Math.max(...this.options.map((opt) => opt.strike)) * 1.5;

      for (let i = 0; i <= steps; i++) {
        const underlyingPrice = (minPrice + (maxPrice - minPrice) * (i / steps)).toFixed(2);
        underlyingPrices.push(underlyingPrice);

        let totalProfitLoss = 0;
        for (const option of this.options) {
          if (option.type.toLowerCase() === "call") {
            totalProfitLoss +=
              Math.max(underlyingPrice - option.strike, 0) - option.price;
          } else if (option.type.toLowerCase() === "put") {
            totalProfitLoss +=
              Math.max(option.strike - underlyingPrice, 0) - option.price;
          }
        }

        profitLosses.push(totalProfitLoss);
      }

      const maxProfit = Math.max(...profitLosses);
      const maxLoss = Math.min(...profitLosses);
      const breakEvenPoints = underlyingPrices.filter(
        (price, idx) => profitLosses[idx] === 0
      );

      return {
        data: { x: underlyingPrices, y: profitLosses },
        maxProfit: maxProfit.toFixed(2),
        maxLoss: maxLoss.toFixed(2),
        breakEvenPoints,
      };
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin: 10px 0;
}
</style>
