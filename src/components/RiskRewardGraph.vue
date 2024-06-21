<template>
    <div>
      <LineChartGenerator
        :chart-data="chartData"
        :chart-options="chartOptions"
        chart-id="risk-reward-graph"
      />
      <div class="pl-20 text-primary/90">
        <div class="flex gap-4 text-2xl font-bold mb-2">
          <span>Risk-Reward Ratio:</span>
          {{ riskRewardRatio }}
        </div>
        <div class="flex gap-4 text-2xl font-bold mb-2">
          <span>Max Profit:</span>
          {{ maxProfit  }} {{ currency }}
        </div>
        <div class="flex gap-4 text-2xl font-bold mb-2">
          <span>Max Loss:</span>
          {{ maxLoos  }} {{ currency }}
        </div>
        <div class="flex gap-4 text-2xl font-bold mb-2">
          <span>Profit Probability:</span>
          {{ profitProbability }}%
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { generateChartData, getRiskRewardRatio, getProfitProbability } from '@/core'
  import {
    Chart as ChartJS,
    registerables
  } from 'chart.js'
  import { Line as LineChartGenerator } from 'vue-chartjs'
  
  ChartJS.register(...registerables)
  
  export default {
    name: 'RiskRewardGraph',
    components: {
      LineChartGenerator,
    },
    props: {
      option: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        currency: 'USD',
        chartData: {
          labels: [],
          datasets: [
            {
              backgroundColor: '#e27509',
              borderColor: '#59B9BB',
              borderWidth: 5,
              data: []
            },
            {
              backgroundColor: '#d1cdff',
              borderColor: '#F6455D',
              borderWidth: 1,
              data: []
            }
          ],
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xAxis: {
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              title: {
                display: true,
                text: 'Time',
                align: 'end',
                color: '#e27509',
                font: {
                  size: 18,
                }
              },
            },
            yAxis: {
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: 'Price',
                align: 'end',
                color: '#e27509',
                font: {
                  size: 18,
                }
              },
            }
          },
        },
        riskRewardRatio: null,
        maxLoos: null,
        maxProfit: null,
        profitProbability: null,
      }
    },
    watch: {
      option: {
        immediate: true,
        handler(newOption) {
          const axiosData = generateChartData(newOption);
          const { ratio, maxLoss, maxProfit } = getRiskRewardRatio(axiosData.y);
          this.maxLoos = maxLoss;
          this.maxProfit = maxProfit;
          this.riskRewardRatio = ratio;
          this.profitProbability = getProfitProbability(axiosData.y);
  
          this.chartData.labels = axiosData.x;
          this.chartData.datasets[0].data = axiosData.y;
          this.chartData.datasets[1].data = axiosData.y.map(() => this.$props.option.strike_price);
        }
      }
    },
  }
  </script>
  