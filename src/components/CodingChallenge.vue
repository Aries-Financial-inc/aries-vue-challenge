<template>
  <div class="coding-challenge">
    <!-- Main title -->
    <h1 class="title">Options Profit Calculator</h1>

    <!-- Control panel for input -->
    <div class="control-panel">
      <label for="steps" class="label">Number of Steps:</label>
      <input id="steps" type="number" v-model.number="steps" min="10" max="100" step="10" class="input" />
    </div>

    <!-- Container for the Legends -->
    <div class="legends-container">
      <table>
        <tr>
          <td class="legend legend-1"></td>
          <td class="legend-name">Profit/Loss</td>
          <td class="legend legend-2"></td>
          <td class="legend-name">Call Strike</td>
          <td class="legend legend-3"></td>
          <td class="legend-name">Put Strike</td>
        </tr>
      </table>
    </div>
    
    <!-- Container for the chart canvas -->
    <div class="chart-container">
      <canvas ref="riskGraph" width="800" height="400"></canvas>
    </div>

    <!-- Results section -->
    <div class="results">
      <h2 class="subtitle">Results</h2>
      <p><strong>Max Profit:</strong> {{ maxP }}</p>
      <p><strong>Max Loss:</strong> {{ maxL }}</p>
      <p><strong>Break-even Points:</strong> {{ breakEvPoints.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Chart, LinearScale, registerables } from 'chart.js'; // Import necessary Chart.js components
import annotationPlugin from 'chartjs-plugin-annotation'; // Import the annotation plugin

export default {
  name: 'CodingChallenge',
  props: {
    optionsData: Array // Prop to pass options data to the component
  },
  data() {
    return {
      steps: 100, // Default number of steps for chart granularity
      maxP: 0, // Placeholder for maximum profit
      maxL: 0, // Placeholder for maximum loss
      breakEvPoints: [], // Placeholder for break-even points
      chart: null  // Holds the Chart.js instance
    };
  },
  watch: {
    // Watcher for optionsData and steps changes
    optionsData: {
      handler: 'calculateRiskReward', // Handler method for recalculating and updating the chart
      immediate: true, // Calculate on component mount
      deep: true // Deep watch for nested data changes
    },
    steps: 'calculateRiskReward' // Watch steps changes to update the chart granularity
  },
  methods: {
    // Method to calculate profit/loss and update chart
    calculateRiskReward() {
      const underlyingPrices = Array.from({ length: this.steps }, (_, i) => i * (200 / this.steps));
      const profits = underlyingPrices.map(price => this.calculateProfit(price));

      this.maxP = Math.max(...profits); // Calculate maximum profit
      this.maxL = Math.min(...profits); // Calculate maximum loss
      this.breakEvPoints = this.findBreakEvPoints(profits, underlyingPrices); // Find break-even points

      this.renderGraph(underlyingPrices, profits); // Render or update the chart
    },

    // Method to calculate profit for a given price
    calculateProfit(price) {
      return this.optionsData.reduce((profit, option) => {
        const optionProfit = this.calculateOptionProfit(option, price); // Calculate profit for each option
        return profit + optionProfit; // Accumulate total profit
      }, 0);
    },

    // Method to calculate profit for a single option at a given price
    calculateOptionProfit(option, price) {
      const { strike_price, type, bid, ask, long_short } = option;
      const cost = long_short === 'long' ? ask : bid; // Cost of buying or selling the option
      const quantity = long_short === 'long' ? 1 : -1; // Quantity (long or short position)
      let optionProfit = 0;

      if (type === 'Call') {
        optionProfit = Math.max(0, price - strike_price) - cost; // Calculate profit for Call option
      } else if (type === 'Put') {
        optionProfit = Math.max(0, strike_price - price) - cost; // Calculate profit for Put option
      }

      return quantity * optionProfit; // Return total profit considering quantity
    },

    // Method to find break-even points based on profits and underlying prices
    findBreakEvPoints(profits, underlyingPrices) {
      const breakEvPoints = [];
      for (let i = 1; i < profits.length; i++) {
        if ((profits[i - 1] < 0 && profits[i] >= 0) || (profits[i - 1] >= 0 && profits[i] < 0)) {
          breakEvPoints.push(underlyingPrices[i]); // Identify points where profit crosses zero
        }
      }
      return breakEvPoints; // Return array of break-even points
    },

    // Method to render or update the chart using Chart.js
    renderGraph(underlyingPrices, profits) {
      if (!this.$refs.riskGraph) return; // Check if the canvas element is available

      const ctx = this.$refs.riskGraph.getContext('2d');
      if (!ctx) return; // Check if getContext is available (for server-side rendering)

      if (this.chart) {
        this.chart.destroy(); // Destroy previous chart instance to prevent memory leaks
      }

      const strikePrices = this.optionsData.map(option => ({
        'price': option.strike_price,
        'type': option.type
      }));

      // Define vertical lines for strike prices
      const annotations = strikePrices.map(price => ({
        type: 'line',
        mode: 'vertical',
        scaleID: 'x', 
        value: price.price,
        borderColor: price.type === "Call" ? '#ed6868': '#191973',
        borderWidth: 1
      }));

      // Create new Chart.js instance for rendering the line chart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: underlyingPrices,
          datasets: [
            {
              label: 'Profit/Loss',
              data: profits,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Underlying Price at Expiry',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              },
              ticks: {
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Profit/Loss',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              },
              ticks: {
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            annotation: {
              annotations
            }
          }
        }
      });
    }
  },
  mounted() {
    // Register necessary components from Chart.js
    Chart.register(LinearScale, ...registerables, annotationPlugin);

    // Call calculateRiskReward initially when the component is mounted
    this.calculateRiskReward();
  }
};
</script>

<style scoped>
/* Scoped styles for the component */
.coding-challenge {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.control-panel {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.input {
  width: 100px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.chart-container {
  margin-bottom: 20px;
}

.results {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.results p {
  font-size: 16px;
  margin-bottom: 8px;
}

.legends-container {
  margin: auto;
  width: 363px;
}

.legends-container .legend {
  width: 33px;
}

.legends-container .legend-name {
  font-size: 13px;
  font-weight: bold;
  padding-left: 2px;
  text-align: left;
  color: #666666;
  width: 74px;
}

.legends-container .legend.legend-1 {
  background: rgba(75, 192, 192, 0.2);
  border: 3px solid rgba(75, 192, 192, 1);
}

.legends-container .legend.legend-2 {
  background: rgba(237, 104, 104, 0.2);
  border: 3px solid rgb(237, 104, 104);
}

.legends-container .legend.legend-3 {
  background: rgba(25, 25, 115, 0.2);
  border: 3px solid rgb(25, 25, 115);
}

</style>
