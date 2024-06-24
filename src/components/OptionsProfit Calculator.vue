<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div>
      <label for="contracts">Options Contracts (JSON):</label>
      <textarea id="contracts" v-model="contractsInput" rows="10" cols="50"></textarea>
    </div>
    <button @click="calculate">Calculate</button>
    <div v-if="results">
      <h2>Risk & Reward Graph</h2>
      <canvas ref="riskRewardGraph"></canvas>
      <div>
        <p>Max Profit: {{ results.maxProfit }}</p>
        <p>Max Loss: {{ results.maxLoss }}</p>
        <p>All Break Even Points: {{ results.breakEvenPoints.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Line } from 'chart.js';

export default {
  name: 'CodingChallenge',
  data() {
    return {
      contractsInput: '',
      results: null,
      chart: null,
    };
  },
  methods: {
    calculate() {
      try {
        const contracts = JSON.parse(this.contractsInput);
        if (!Array.isArray(contracts)) {
          throw new Error('Invalid input: not an array');
        }

        const graphData = this.calculateGraphData(contracts);
        const { maxProfit, maxLoss, breakEvenPoints } = this.calculateProfitLoss(contracts);

        this.results = { maxProfit, maxLoss, breakEvenPoints };
        this.renderGraph(graphData);
      } catch (error) {
        alert('Invalid JSON input');
      }
    },
    calculateGraphData(contracts) {
      const prices = [];
      const profits = [];
      for (let price = 0; price <= 200; price += 1) {
        prices.push(price);
        profits.push(this.calculateTotalProfit(contracts, price));
      }
      return { prices, profits };
    },
    calculateTotalProfit(contracts, price) {
      return contracts.reduce((total, contract) => {
        const { type, strike, price: contractPrice } = contract;
        if (type === 'call') {
          return total + Math.max(price - strike, 0) - contractPrice;
        } else if (type === 'put') {
          return total + Math.max(strike - price, 0) - contractPrice;
        }
        return total;
      }, 0);
    },
    calculateProfitLoss(contracts) {
      const profits = [];
      const prices = [];
      for (let price = 0; price <= 200; price += 1) {
        const profit = this.calculateTotalProfit(contracts, price);
        profits.push(profit);
        prices.push(price);
      }
      const maxProfit = Math.max(...profits);
      const maxLoss = Math.min(...profits);
      const breakEvenPoints = prices.filter((price, index) => profits[index] === 0);
      return { maxProfit, maxLoss, breakEvenPoints };
    },
    renderGraph(graphData) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = this.$refs.riskRewardGraph.getContext('2d');
      this.chart = new Line(ctx, {
        type: 'line',
        data: {
          labels: graphData.prices,
          datasets: [{
            label: 'Profit/Loss',
            data: graphData.profits,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Price of Underlying at Expiry'
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
  },
  mounted() {
    this.$nextTick(() => {
      this.renderGraph({ prices: [], profits: [] });
    });
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
}

textarea {
  width: 100%;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

canvas {
  max-width: 100%;
  margin-top: 20px;
}

p {
  margin: 5px 0;
}
</style>
