<template>
  <div class="options-calculator">
    <h1>Options Profit Calculator</h1>
    <div class="options-form">
      <form @submit.prevent="addOption">
        <input v-model="newOption.strike_price" type="number" placeholder="Strike Price" required />
        <select v-model="newOption.type" required>
          <option disabled value="">Select Type</option>
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </select>
        <input v-model="newOption.bid" type="number" placeholder="Bid Price" required />
        <input v-model="newOption.ask" type="number" placeholder="Ask Price" required />
        <select v-model="newOption.long_short" required>
          <option disabled value="">Position</option>
          <option value="Long">Long</option>
          <option value="Short">Short</option>
        </select>
        <button type="submit">Add Option</button>
      </form>
      <ul>
        <li v-for="(option, index) in localOptionsData" :key="index">
          {{ option.type }} at {{ option.strike_price }}
          <span @click="removeOption(index)" class="remove-option">Remove</span>
        </li>
      </ul>
    </div>
    <canvas ref="profitGraph"></canvas>
    <div class="results">
      <p>Max Profit: {{ maxProfit }}</p>
      <p>Max Loss: {{ maxLoss }}</p>
      <p>Break-even Points: {{ breakEvens.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'CodingChallenge',
  props: {
    optionsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localOptionsData: [],
      newOption: {
        strike_price: '',
        type: '',
        bid: '',
        ask: '',
        long_short: ''
      },
      maxProfit: 0,
      maxLoss: 0,
      breakEvens: [],
      chart: null
    };
  },
  mounted() {
    this.localOptionsData = JSON.parse(JSON.stringify(this.optionsData));
    this.renderChart();
  },
  methods: {
    addOption() {
      this.localOptionsData.push({...this.newOption});
      this.newOption = { strike_price: '', type: '', bid: '', ask: '', long_short: '' };
      this.calculateOutcomes();
    },
    removeOption(index) {
      this.localOptionsData.splice(index, 1);
      this.calculateOutcomes();
    },
    calculateOutcomes() {
      if (!this.localOptionsData.length) {
        console.alert("No data to process.");
        return;
      }

      const priceRange = 10; // Buffer around the highest and lowest strike prices
      let minPrice = Math.min(...this.localOptionsData.map(option => option.strike_price)) - priceRange;
      let maxPrice = Math.max(...this.localOptionsData.map(option => option.strike_price)) + priceRange;
      let profitLossByPrice = {};

      for (let price = minPrice; price <= maxPrice; price += 0.5) {
        let totalPL = 0;
        this.localOptionsData.forEach(option => {
          let pl = 0;
          if (option.type === 'Call') {
            pl = (price > option.strike_price) ? (price - option.strike_price - option.ask) * (option.long_short === 'Long' ? 1 : -1) : -option.ask * (option.long_short === 'Long' ? 1 : -1);
          } else { // Put
            pl = (price < option.strike_price) ? (option.strike_price - price - option.bid) * (option.long_short === 'Long' ? 1 : -1) : -option.bid * (option.long_short === 'Long' ? 1 : -1);
          }
          totalPL += pl;
        });
        profitLossByPrice[price] = totalPL;
      }

      this.maxProfit = parseFloat(Math.max(...Object.values(profitLossByPrice)).toFixed(2));
      this.maxLoss = parseFloat(Math.min(...Object.values(profitLossByPrice)).toFixed(2));
      this.breakEvens = Object.keys(profitLossByPrice).filter(price => Math.abs(profitLossByPrice[price]) < 0.005).map(Number).map(price => parseFloat(price.toFixed(2)));

 

      this.chartData = {
        labels: Object.keys(profitLossByPrice),
        datasets: [{
          label: 'Profit / Loss',
          data: Object.values(profitLossByPrice),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      this.renderChart();
    },

    renderChart() {
      const ctx = this.$refs.profitGraph.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Profit / Loss ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Underlying Price ($)'
              }
            }
          }
        }
      });
    },
  },
  watch: {
    localOptionsData: {
      deep: true,
      handler() {
        this.$emit('update:optionsData', this.localOptionsData);
      }
    }
  }
}
</script>

<style scoped>
.options-calculator {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.options-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.options-form:hover {
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.options-form form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.options-form input, .options-form select {
  flex: 1 1 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.options-form input:focus, .options-form select:focus {
  border-color: #42a5f5;
  outline: none;
}

.options-form button {
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.options-form button:hover {
  background-color: #1e88e5;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #e3f2fd;
  padding: 10px;
  margin-top: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-option {
  color: #f44336;
  cursor: pointer;
  transition: color 0.3s;
}

.remove-option:hover {
  color: #c62828;
}

canvas {
  width: 100% !important;
  height: 400px !important;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.results {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-top: 20px;
}

.results p {
  color: #424242;
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  border-left: 5px solid #42a5f5;
  background-color: #ffffff;
}

.results p:hover {
  background-color: #eceff1;
}

</style>
