<template>
  <div class="container">
    <h1>Options Profit Calculator</h1>
    <div class="form-section">
      <h2 class="mb-6">Options Strategy Risk & Reward Analysis</h2>
      <form @submit.prevent="generateGraph">
        <div v-for="(contract, index) in optionsContracts" :key="index" class="contract-input">

          <div class="mt-3"
               :style="{'display': 'flex !important','flex-direction': isPhone ?'column':'row','align-items': 'baseline'}">

            <v-col cols="12" md="2" class="mx-1">
              <label>Contract {{ index + 1 }}</label>
            </v-col>

            <v-col cols="12" md="3" class="mx-1 py-0">
              <v-text-field outlined dense v-model="contract.type" placeholder="Type (call/put)"/>
            </v-col>

            <v-col cols="12" md="3" class="mx-1 py-0">
              <v-text-field outlined dense v-model="contract.strike" type="number" placeholder="Strike Price"/>
            </v-col>

            <v-col cols="12" md="3" class="mx-1 py-0">
              <v-text-field outlined dense v-model="contract.price" type="number" placeholder="Premium"/>
            </v-col>

          </div>

        </div>
        <div class="button-group">
          <v-btn class="mx-md-3 mb-4 col-12 col-md-3" outlined color="green" @click="addContract">
            Add Contract
          </v-btn>
          <v-btn class="mb-4 col-12 col-md-3" outlined color="blue" type="submit">Generate Graph</v-btn>
        </div>
      </form>
    </div>
    <div class="chart-section">
      <line-chart v-if="chartData" :chart-data="chartData" :options="chartOptions"></line-chart>
      <div v-if="results" class="results">
        <p><strong>Max Profit:</strong> {{ results.maxProfit }}</p>
        <p><strong>Max Loss:</strong> {{ results.maxLoss }}</p>
        <p><strong>Break Even Points:</strong> {{ results.breakEvenPoints.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {Line} from 'vue-chartjs'
import {mixins} from 'vue-chartjs'
// import { reactiveProp } from 'vue-chartjs/es/mixins'

export default {
  name: 'OptionsProfitCalculator',
  components: {
    'line-chart': {
      extends: Line,
      mixins: [mixins.reactiveProp],
      props: ['chartData', 'options'],
      mounted() {
        this.renderChart(this.chartData, this.options)
      }
    }
  },
  data() {
    return {
      optionsContracts: [{type: '', strike: 0, price: 0}],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Price of Underlying at Expiry'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Profit/Loss'
            }
          }]
        }
      },
      results: null
    }
  },
  methods: {
    addContract() {
      if (this.optionsContracts.length < 4) {
        this.optionsContracts.push({type: '', strike: 0, price: 0})
      }
    },
    generateGraph() {
      const dataPoints = this.calculateProfitLoss()
      this.chartData = {
        labels: dataPoints.map(point => point.price),
        datasets: [
          {
            label: 'Profit/Loss',
            data: dataPoints.map(point => point.profitLoss),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      }
      this.results = this.calculateMaxProfitLossAndBreakEven(dataPoints)
    },
    calculateProfitLoss() {
      const dataPoints = []
      for (let price = 0; price <= 200; price += 1) {
        let profitLoss = 0
        this.optionsContracts.forEach(contract => {
          if (contract.type === 'call') {
            profitLoss += Math.max(0, price - contract.strike) - contract.price
          } else if (contract.type === 'put') {
            profitLoss += Math.max(0, contract.strike - price) - contract.price
          }
        })
        dataPoints.push({price, profitLoss})
      }
      return dataPoints
    },
    calculateMaxProfitLossAndBreakEven(dataPoints) {
      let maxProfit = -Infinity
      let maxLoss = Infinity
      const breakEvenPoints = []

      dataPoints.forEach(point => {
        if (point.profitLoss > maxProfit) {
          maxProfit = point.profitLoss
        }
        if (point.profitLoss < maxLoss) {
          maxLoss = point.profitLoss
        }
        if (Math.abs(point.profitLoss) < 0.01) {
          breakEvenPoints.push(point.price)
        }
      })

      return {maxProfit, maxLoss, breakEvenPoints}
    }
  },
  computed: {
    isPhone: () => window.screen.width < 600
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-section {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.contract-input {
  margin-bottom: 10px;
}

.button-group {
  margin-top: 10px;
}

button {
  margin-right: 10px;
}

.chart-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
}

.results {
  margin-top: 20px;
}

.results p {
  margin: 5px 0;
}
</style>
