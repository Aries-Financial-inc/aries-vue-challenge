<template>
  <LineChartJS :chartOptions="chartOptions" :chartData="chartData" />
</template>

<script lang="ts">
import { Line as LineChartJS } from 'vue-chartjs/legacy'

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ChartData,
  ChartOptions
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
    chartData(): ChartData {
      return {
        // @ts-ignore:next-line
        labels: [...this.labels],
        datasets: [
          {
            label: 'Profit/Loss',
            borderColor: CHART_COLORS.green,
            backgroundColor: CHART_COLORS.blue,
            // @ts-ignore:next-line
            data: [...this.data],
            segment: {
              borderColor: (ctx) => {
                const price = ctx.p1.parsed.y
                if (price <= 0) {
                  return CHART_COLORS.red
                }
              },
              backgroundColor: (ctx) => {
                const price = ctx.p1.parsed.y
                if (price <= 0) {
                  return CHART_COLORS.red
                }
              }
            },
            spanGaps: true
          }
        ]
      }
    },

    chartOptions(): ChartOptions {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Price of Underlying at Expiry'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Profit/Loss'
            }
          }
        }
      }
    }
  }
}
</script>
