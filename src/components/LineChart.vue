<template>
  <LineChartJS :chartOptions="chartOptions" :chartData="chartData" />
</template>

<script lang="ts">
import { Line as LineChartJS } from 'vue-chartjs/legacy'

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
  name: 'LineChart',

  components: {
    LineChartJS
  },

  props: {
    labels: {
      type: Array as () => number[],
      required: true
    },
    data: {
      type: Array as () => number[],
      required: true
    }
  },

  computed: {
    chartData() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            label: 'Profit/Loss',
            backgroundColor: '#f87979',
            data: [...this.data]
          }
        ]
      }
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Price of Underlying at Expiry'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Profit/Loss'
              }
            }
          ]
        }
      }
    }
  }
}
</script>
