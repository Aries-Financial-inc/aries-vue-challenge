<template>
  <div class="container">
    <h1>Options Profit Calculator</h1>
    <canvas ref="optionsChart"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "CodingChallenge",
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
  methods: {
    calculateProfitLoss() {
      const prices = Array.from({ length: 40 }, (_, i) => i * 5 + 60);
      const profitData = [];
      const lossData = [];
      const breakEvenPoints = [];

      prices.forEach((price) => {
        let totalPL = 0;
        this.optionsData.forEach((option) => {
          const strike = option.strike_price;
          const cost = option.long_short === "long" ? option.ask : -option.bid;
          let pl = 0;

          if (option.type === "Call") {
            pl =
              option.long_short === "long"
                ? Math.max(0, price - strike) - cost
                : cost - Math.max(0, price - strike);
          } else if (option.type === "Put") {
            pl =
              option.long_short === "long"
                ? Math.max(0, strike - price) - cost
                : cost - Math.max(0, strike - price);
          }
          totalPL += pl;
        });

        if (totalPL > 0) {
          profitData.push(totalPL);
          lossData.push(null);
        } else if (totalPL < 0) {
          profitData.push(null);
          lossData.push(totalPL);
        } else {
          profitData.push(null);
          lossData.push(null);
          breakEvenPoints.push({ x: price, y: 0 });
        }
      });

      return {
        prices,
        profitData,
        lossData,
        breakEvenPoints,
      };
    },
    createChart(data) {
      const ctx = this.$refs.optionsChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.prices,
          datasets: [
            {
              label: "Profit",
              borderColor: "rgb(50, 205, 50)",
              backgroundColor: "rgba(50, 205, 50, 0.2)",
              data: data.profitData,
              spanGaps: true,
              fill: true,
            },
            {
              label: "Loss",
              borderColor: "rgb(255, 0, 0)",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              data: data.lossData,
              spanGaps: true,
              fill: true,
            },
            {
              label: "Break Even",
              borderColor: "rgb(204, 204, 0)",
              backgroundColor: "rgba(204, 204, 0, 0.2)",
              data: data.breakEvenPoints,
              type: "bubble",
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
            },
            legend: {
              display: true,
            },
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Underlying Price at Expiry",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Profit/Loss",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    const data = this.calculateProfitLoss();
    this.createChart(data);
  },
};
</script>

<style scoped>
.container {
  margin-left: 10%;
  margin-right: 10%;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
canvas {
  max-width: 100%;
  max-height: 700px;
}
</style>
