<template>
  <div :class="$style.Root">
    <LineChartJS
      :chartId="chartId"
      :datasetIdKey="datasetIdKey"
      :width="width"
      :height="height"
      :cssClasses="cssClasses"
      :styles="styles"
      :plugins="plugins"
      :chartData="chartData"
      :chartOptions="chartOptions"
    />
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
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {
        /* default styles */
      }
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    chartData(): ChartData {
      const { prices, profits } = generateChartData(this.optionsData)
      const profitColors = profits.map((profit) => {
        return profit <= 0 ? CHART_COLORS.red : CHART_COLORS.blue
      })

      return {
        labels: [...prices],
        datasets: [
          {
            label: 'Profit / Loss',
            pointBackgroundColor: profitColors,
            data: [...profits],
            segment: {
              borderColor: (ctx) => {
                const price = ctx.p1.parsed.y
                if (price <= 0) {
                  return CHART_COLORS.red
                }
                return CHART_COLORS.blue
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
