<template>
  <div :class="$style.Root">
    <LineChartJS :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/* import models */
import { Option } from '@/models/Option'

/* import utils */
import { generateChartData } from '@/utils/OptionUtils'
import { formatPrice } from '@/utils/FormatUtils'
import { CHART_COLORS } from '@/utils/ChartUtils'

/* import components */
import { Line as LineChartJS } from 'vue-chartjs/legacy'

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

export default Vue.extend({
  components: {
    LineChartJS
  },

  props: {
    optionsData: {
      type: Array as () => Option[],
      required: true
    }
  },

  computed: {
    chartData(): ChartData {
      const { prices, profits } = generateChartData(this.optionsData)

      return {
        labels: [...prices],
        datasets: [
          {
            label: 'Profit / Loss',
            backgroundColor: CHART_COLORS.blue,
            borderColor: CHART_COLORS.blue,
            data: [...profits],
            segment: {
              borderColor: (ctx) => {
                const price = ctx.p1.parsed.y
                if (price <= 0) {
                  return CHART_COLORS.red
                }
              },

              backgroundColor: (ctx) => {
                const price = ctx.p0.parsed.y
                if (price <= 0) {
                  console.log('red', price)
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
        plugins: {
          legend: {
            display: false
          }
        },
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
              text: 'Profit / Loss'
            },
            ticks: {
              callback: (value) => {
                return formatPrice(value)
              }
            }
          }
        }
      }
    }
  }
})
</script>

<style module>
.Root {
  width: 100%;
  height: 400px;
}
</style>
