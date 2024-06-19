<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div class="calculator">
      <div class="options-input">
        <label v-for="(option, index) in options" :key="index">
          Option {{ index + 1 }}:
          <input v-model="option.type" placeholder="Type (call/put)" />
          <input v-model.number="option.strike_price" placeholder="Strike Price" />
          <input v-model.number="option.ask" placeholder="Option Price" />
        </label>
        <button @click="calculateRiskReward">Calculate</button>
      </div>
      <div class="dashboard">
        <div class="cards-group" v-if="result">
          <div class="card">
            <h3>Max Profit</h3>
            <div>{{ result.maxProfit }}</div>
          </div>
          <div class="card">
            <h3>Max Loss</h3>
            <div>{{ result.maxLoss }}</div>
          </div>
          <div class="card">
            <h3>Break Even Points</h3>
            <div v-if="result.breakEvenPoints.length == 0">None</div>
            <div v-else>{{ result.breakEvenPoints.join(", ") }}</div>
          </div>
        </div>
        <canvas ref="riskRewardChart"></canvas>
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
        {
          "strike_price": 100,
          "type": "Call",
          "bid": 10.05,
          "ask": 12.04,
          "long_short": "long",
          "expiration_date": "2025-12-17T00:00:00Z"
        },
        {
          "strike_price": 102.50,
          "type": "Call",
          "bid": 12.10,
          "ask": 14,
          "long_short": "long",
          "expiration_date": "2025-12-17T00:00:00Z"
        },
        {
          "strike_price": 103,
          "type": "Put",
          "bid": 14,
          "ask": 15.50,
          "long_short": "short",
          "expiration_date": "2025-12-17T00:00:00Z"
        },
        {
          "strike_price": 105,
          "type": "Put",
          "bid": 16,
          "ask": 18,
          "long_short": "long",
          "expiration_date": "2025-12-17T00:00:00Z"
        }
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
              borderColor: "rgba(10, 105, 233, 1)",
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

      const minPrice = Math.min(...this.options.map((opt) => opt.strike_price)) * 0.5;
      const maxPrice = Math.max(...this.options.map((opt) => opt.strike_price)) * 1.5;

      for (let i = 0; i <= steps; i++) {
        const underlyingPrice = (minPrice + (maxPrice - minPrice) * (i / steps));
        underlyingPrices.push(underlyingPrice.toFixed(2));

        let totalProfitLoss = 0;
        for (const option of this.options) {
          const cost = (option.bid + option.ask) / 2;

          if (option.type.toLowerCase() === "call") {
            if (option.long_short === 'long') {
              totalProfitLoss +=
                Math.max(underlyingPrice - option.strike_price, 0) - cost;
            } else {
              totalProfitLoss += cost -
                Math.max(underlyingPrice - option.strike_price, 0);
            }

          } else if (option.type.toLowerCase() === "put") {
            if (option.long_short == 'short') {
              totalProfitLoss +=
                Math.max(option.strike_price - underlyingPrice, 0) - cost;
            } else {
              totalProfitLoss += cost -
                Math.max(option.strike_price - underlyingPrice, 0);
            }
          }
        }

        profitLosses.push(totalProfitLoss);
      }

      const maxProfit = Math.max(...profitLosses);
      const maxLoss = Math.min(...profitLosses);

      const breakEvenPoints = underlyingPrices.filter(
        (price, idx) => profitLosses[idx] == 0
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

button {
  background-color: rgb(14, 165, 233);
  border: 1px solid rgb(14, 165, 233);
  border-radius: 8px;
  color: white;
  font-weight: bold;
  padding: 15px;
  appearance: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  background-color: rgb(10, 160, 230);
}

.calculator {
  display: flex;
  margin: 0 auto;
  max-width: 1440px;
}

.options-input {
  flex: 1
}

.options-input input {
  width: 80px;
  padding: 5px;
}

@media screen and (max-width: 1400px) {
  .options-input input {
    width: 60px;
  }
}

@media screen and (max-width: 768px) {
  .options-input input {
    width: 100%;
  }
}

.dashboard {
  flex: 3
}

.cards-group {
  display: flex;
}

.card {
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 15px;
  flex: 1;
  padding-bottom: 30px;
}
</style>
