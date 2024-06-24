<template>
  <div class="container">
    <h1>Risk & Reward Graph</h1>
    <div class="input-container">
      <label for="contracts">Options Contracts:</label>
      <textarea
        id="contracts"
        v-model="contractsInput"
        placeholder="Enter options contracts"
      ></textarea>
      <button @click="calculateRiskReward">Calculate</button>
    </div>
    <div class="chart-container">
      <canvas ref="riskRewardChart"></canvas>
    </div>
    <div class="results-container">
      <p><strong>Max Profit:</strong> {{ maxProfit }}</p>
      <p><strong>Max Loss:</strong> {{ maxLoss }}</p>
      <p><strong>All Break Even Points:</strong> {{ breakEvenPoints.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'RiskRewardGraph',
  data() {
    return {
      contractsInput: '',
      maxProfit: 0,
      maxLoss: 0,
      breakEvenPoints: [],
    };
  },
  methods: {
    calculateRiskReward() {
      try {
        const { maxProfit, maxLoss, breakEvenPoints, chartData } = this.analyzeContracts();
        this.maxProfit = maxProfit;
        this.maxLoss = maxLoss;
        this.breakEvenPoints = breakEvenPoints;
        this.renderChart(chartData);
      } catch (error) {
        alert('Invalid input.');
      }
    },
    analyzeContracts() {
      // Placeholder for risk and reward calculation logic
      const maxProfit = 100;
      const maxLoss = -50;
      const breakEvenPoints = [75, 125];
      const chartData = this.generateChartData();
      return { maxProfit, maxLoss, breakEvenPoints, chartData };
    },
    generateChartData() {
      // Placeholder for chart data generation logic
      return {
        labels: Array.from({ length: 201 }, (_, i) => i), // Example labels from 0 to 200
        datasets: [
          {
            label: 'Profit/Loss',
            data: Array.from({ length: 201 }, () => Math.random() * 200 - 100), // Example data
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
          },
        ],
      };
    },
    renderChart(chartData) {
      const ctx = this.$refs.riskRewardChart.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Price of Underlying at Expiry',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Profit/Loss',
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #4CAF50;
  text-align: center;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
  text-align: center;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

textarea {
  width: calc(100% - 42px);
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  margin-bottom: 10px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.chart-container {
  margin: 20px 0;
  text-align: center;
}

.results-container {
  text-align: center;
  margin-top: 20px;
}

.results-container p {
  margin: 5px 0;
  font-size: 16px;
}
</style>
