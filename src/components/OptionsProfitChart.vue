<template>
    <div class="chart-container">
      <apexchart
        type="line"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue-apexcharts'
  
  export default {
    name: 'OptionsProfitChart',
    components: {
      apexchart: VueApexCharts,
    },
    props: {
      series: Array
    },
    data() {
      return {
        chartOptions: {
  chart: {
    id: 'options-profit-chart',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false  // This will hide the default toolbar
    },
  },
  xaxis: {
    type: 'numeric',
    title: {
      text: 'Underlying Price at Expiry',
    },
  },
  yaxis: {
    title: {
      text: 'Profit/Loss ($)',
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      formatter: (val) => `$${val.toFixed(2)}`,
    },
    y: {
      formatter: (val) => `$${val.toFixed(2)}`,
    },
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  grid: {
    padding: {
      right: 30,
      left: 20,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40,
    labels: {
      useSeriesColors: true
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    },
  },
},
      }
    }
  }
  </script>

<style scoped>
.chart-container {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
}
</style>

  