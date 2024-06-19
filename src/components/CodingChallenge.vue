<template>
  <div>
    <h1>Options Profit Calculator</h1>
    <div>
      <LineChart :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';

import { calculateProfitItem } from "../utils/stock";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend);

export default {
  name: "CodingChallenge",
  props: ["optionsData"],
  components: { LineChart },
  mounted() {
    const list = this.optionsData.map((item) => calculateProfitItem(item));
    const labels = this.optionsData.map(it => `${it.strike_price}(${it.type})`);

    const chart = {
      labels,
      datasets: [
        {
          label: "Maximum Loss",
          data: list.map(it => it.maxLoss),
          borderColor: "red",
          borderWidth: 1,
          backgroundColor: 'rgba(200, 100, 100, 0.2)',
          fill: true,
          tension: 0.1
        },
        {
          label: "Maximum Profit",
          data: list.map(it => it.maxProfit),
          borderColor: "green",
          borderWidth: 1,
          backgroundColor: 'rgba(0, 200, 0, 0.3)',
          fill: true,
          tension: 0.1
        },
        {
          label: "Break Even Point",
          data: list.map(it => it.breakevenPoint),
          borderColor: "blue",
          borderWidth: 3,
          backgroundColor: "rgba(0, 0, 255, 0.3)",
          fill: true,
          tension: 0.1
        }
      ]
    };

    this.chartData = chart;
  },
  data() {
    return {
      list: [],
      chartData: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 200,
            title: { 
              display: true, 
              text: 'Profit / Loss / Break Even Point' 
            } 
          },
          x: {
            stacked: true,
          }
        },
        layout: { 
          padding: { 
            left: 40, 
            right: 40, 
            top: 40, 
            bottom: 40 
          } 
        } 
      }
    };
  },
};
</script>

<style scoped>
</style>
