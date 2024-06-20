<template>
<<<<<<< HEAD
  <div>
    <h1>Options Profit Calculator</h1>
    {{ "Your Code Here" }}
=======
  <div class="container">
    <h1>Options Profit Calculator</h1>
    <div class="card">
      <LineChart :chart-data="chartData" :chart-options="chartOptions" />
      <div class="summary">
        <div class="profit-loss">
          <p><strong>Max Profit:</strong> <span class="profit">{{ maxProfit }}</span></p>
          <p><strong>Max Loss:</strong> <span class="loss">{{ maxLoss }}</span></p>
        </div>
        <div>
          <p><strong>Break-even Points:</strong> <span class="break-even">{{ breakEvenPoints.join(', ') }}</span></p>
        </div>
      </div>
    </div>
>>>>>>> myfork/master
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: 'CodingChallenge',
  props: {
    optionsData: Array
  }
  // Your code here
=======
import LineChart from './LineChart.vue'

export default {
  name: 'CodingChallenge',
  components: {
    LineChart
  },
  props: {
    optionsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Profit/Loss',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      },
      maxProfit: null,
      maxLoss: null,
      breakEvenPoints: []
    }
  },
  methods: {
    calculateRiskReward() {
      const underlyingPrices = Array.from({ length: 201 }, (_, i) => i) // Prices from 0 to 200
      const breakEvenPointsSet = new Set()
      const results = underlyingPrices.map(price => {
        let totalPnL = 0
        this.optionsData.forEach(option => {
          const { strike_price, ask, bid, type, long_short } = option
          const strikePrice = strike_price
          const premium = long_short === 'long' ? ask : bid
          const quantity = long_short === 'long' ? 1 : -1

          let pnl = 0
          if (type === 'Call') {
            if (long_short === 'long') {
              pnl = (price > strikePrice ? price - strikePrice : 0) - premium
            } else {
              pnl = premium - (price > strikePrice ? price - strikePrice : 0)
            }
          } else if (type === 'Put') {
            if (long_short === 'long') {
              pnl = (price < strikePrice ? strikePrice - price : 0) - premium
            } else {
              pnl = premium - (price < strikePrice ? strikePrice - price : 0)
            }
          }
          pnl *= quantity
          totalPnL += pnl

          // Add break-even point
          if (type === 'Call' && long_short === 'long') {
            breakEvenPointsSet.add(strikePrice + premium)
          } else if (type === 'Call' && long_short === 'short') {
            breakEvenPointsSet.add(strikePrice + premium)
          } else if (type === 'Put' && long_short === 'long') {
            breakEvenPointsSet.add(strikePrice - premium)
          } else if (type === 'Put' && long_short === 'short') {
            breakEvenPointsSet.add(strikePrice - premium)
          }
        })
        return { price, totalPnL }
      })

      this.chartData.labels = results.map(result => result.price)
      this.chartData.datasets[0].data = results.map(result => result.totalPnL)

      this.maxProfit = Math.max(...results.map(result => result.totalPnL))
      this.maxLoss = Math.min(...results.map(result => result.totalPnL))
      this.breakEvenPoints = [...breakEvenPointsSet].sort((a, b) => a - b)

      console.log('Chart Data:', this.chartData)
      console.log('Max Profit:', this.maxProfit)
      console.log('Max Loss:', this.maxLoss)
      console.log('Break-even Points:', this.breakEvenPoints)
    }
  },
  mounted() {
    this.calculateRiskReward()
  }
>>>>>>> myfork/master
}
</script>

<style scoped>
<<<<<<< HEAD
/* Your Code Here */
=======
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary {
  margin-top: 20px;
  text-align: center;
}

.profit-loss {
  display: flex;
  justify-content: center;
}

.profit-loss p {
  margin: 5px 10px;
}

.break-even {
  margin-top: 10px;
}

.profit {
  background-color: #d4edda;
  color: #155724;
  padding: 5px;
  border-radius: 4px;
}

.loss {
  background-color: #f8d7da;
  color: #721c24;
  padding: 5px;
  border-radius: 4px;
}

.break-even {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 5px;
  border-radius: 4px;
}

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
>>>>>>> myfork/master
</style>
