<template>
    <div class="chart-container">
        <line-chart v-if="chartData" :data="chartData" :options="chartOptions" />
        <SummaryComponent :data="summary" />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { defineComponent } from 'vue';
import { chartOptions } from "./chartOptions"
import SummaryComponent from "./Summary"
import { calculateProfitLossData } from "./utils"

import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default defineComponent({
    name: 'LineChartComponent',
    components: {
        LineChart: Line,
        SummaryComponent
    },
    props: {
        data: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            chartData: null,
            chartOptions: chartOptions,
            summary: {
                maxProfit: null,
                maxLoss: null,
                breakEvenPoints: []
            }
        };
    },
    mounted() {
        if (this.data && this.data.length > 0) {
            this.updateChartData();
        }
    },
    methods: {
        updateChartData() {
            const { chartData, maxProfit, maxLoss, breakEvenPoints } = calculateProfitLossData(this.data);
            this.chartData = chartData;
            this.summary.maxProfit = maxProfit;
            this.summary.maxLoss = maxLoss;
            this.summary.breakEvenPoints = breakEvenPoints;
        },
    },
    watch: {
        data: {
            handler(newData) {
                if (newData && newData.length > 0) {
                    this.updateChartData();
                }
            },
            deep: true,
            immediate: true
        }
    }
});
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
}
</style>