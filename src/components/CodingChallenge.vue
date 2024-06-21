<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :width="width" :height="height" />
    <div>
      <p>Max Profit: {{ maxProfit }}</p>
      <p>Max Loss: {{ maxLoss }}</p>
      <p>Break-Even Points: {{ breakEvenPoints.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'CodingChallenge',
  components: { LineChart },
  props: {
    optionsData: {
      type: Array,
      required: true
    },
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Profit/Loss',
          backgroundColor: '#36A2EB33',
          borderColor: '#36A2EBFF',
          borderWidth: 1,
          data: []
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Profit/Loss'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Strike Price Range'
            }
          }
        }
      },
      maxProfit: null,
      maxLoss: null,
      breakEvenPoints: []
    };
  },
  mounted() {
    // populating chart data and labels once the component mounts and we have chart on DOM
    this.calculateChartData();
  },
  methods: {
    calculateChartData() {
      let maxProfit = -Infinity;
      let maxLoss = Infinity;
      let breakEvenPoints = [];
      // 50 and 150 are min and max strike price ranges which could be passed as a prop too
      for (let price = 50; price <= 150; price++) {
        this.chartData.labels.push(price.toString());
        const profitLoss = this.calculateProfitLoss(price);
        this.chartData.datasets[0].data.push(profitLoss);

        // Calculate max profit
        if (profitLoss > maxProfit) {
          maxProfit = profitLoss;
        }

        // Calculate max loss
        if (profitLoss < maxLoss) {
          maxLoss = profitLoss;
        }

        // Calculate break-even points (where profit/loss is zero or close to zero)
        if (Math.abs(profitLoss) < 1) {
          breakEvenPoints.push(price);
        }
      }

      this.maxProfit = maxProfit;
      this.maxLoss = maxLoss;
      this.breakEvenPoints = breakEvenPoints;
    },
    calculateProfitLoss(price) {
      let totalProfitLoss = 0;
      this.optionsData.forEach(option => {
        // calculating premium
        const premium = (option.bid + option.ask) / 2;
        // check for the type of options contract call/put and handle the call types (right to buy)
        if (option.type === 'Call') {
          // further in call check if it is assuming long or short position and handles long position
          if (option.long_short === 'long') {
            totalProfitLoss += Math.max(0, price - option.strike_price) - premium;
          } else {
            totalProfitLoss += premium - Math.max(0, price - option.strike_price);
          }
        } else {
          // Means options type is Put and assuming Long position
          if (option.long_short === 'long') {
            totalProfitLoss += Math.max(0, option.strike_price - price) - premium;
          } else {
            totalProfitLoss += premium - Math.max(0, option.strike_price - price);
          }
        }
      });
      return totalProfitLoss;
    }
  }
};
</script>

<style scoped>
#app {
  width: 80%;
  margin: 0 auto;
}
</style>
