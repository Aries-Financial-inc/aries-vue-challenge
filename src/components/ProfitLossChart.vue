<template>
    <div class="container">
        <div class="feature">
            <div class="feature-row">
                <b>Strategy: </b> 
                <span class="feature-value">
                    {{ option.long_short }} {{ option.type }}  
                </span>
                <span 
                    class="feature-value" 
                    v-if="option.long_short == 'long' && option.type == 'Call'">
                     - Protective Put 
                </span>
                <span 
                    class="feature-value" 
                    v-if="option.long_short == 'short' && option.type == 'Put'">
                     - Covered Call 
                </span>
                , 
                <b>Breakeven Point:</b> <span class="feature-value">{{ breakeven }}</span>, 
                <b>Max Profit:</b> <span class="feature-value">{{ max.profit }}</span>,
                <b>Max Loss:</b> <span class="feature-value">{{ max.loss.toFixed(2) }}</span>
            </div>
            
            <ChartComponent 
                type="line" 
                :height="120" 
                :options="chartData.options" 
                :data="chartData.data" />
        </div>
    </div>
</template>
<script>
import ChartComponent from './ChartComponent.vue'
import { 
    calculateProfits, 
    calculateBreakeven, 
    calculateMaxProfitLoss 
} from '@/utils/profit-calculator';

export default {
    name: 'ProfitLossChart',
    props: {
        option: {
            type: Object,
            required: true,
            validator: (option) => {
            return typeof option.strike_price === 'number' &&
                    typeof option.type === 'string' &&
                    typeof option.bid === 'number' &&
                    typeof option.ask === 'number' &&
                    typeof option.long_short === 'string' &&
                    typeof option.expiration_date === 'string';
            }
        }
    },
    components: {
        ChartComponent
    },
    data() {
        return {
            breakeven: 0,
            max: {},
            chartData: {
                data: {
                    labels: [10, 2, 3],
                    datasets: [{ data: [40, 20, 12] }]
                },
                options: {
                    responsive: true,
                    backgroundColor: false,
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            padding: 25,
                            boxWidth: 9,
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                },
                                ticks: {
                                    stepSize: 40,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                },
                            },
                        ],
                    },
                }
            }
        };
    },
   created() {

        const option = this.$props.option;
        const prices = Array.from({ length: 101 }, (_, i) => i * 2);
        const profits = prices.map(price => calculateProfits(option, price))

        this.chartData.data.labels = prices;
        this.chartData.data.datasets = [{
            label: "Profit/Loss on Underlying's Price",
            pointStyle: 'none',
            data: profits,
            fill: false,
            pointRadius: 0.2,
            borderColor: 'green',
        }];

        this.breakeven = calculateBreakeven(option)
        this.max = calculateMaxProfitLoss(option)
    }


}
</script>
<style>
.container {
    padding: 20px 120px;
    margin-bottom: 20px;
}
.feature {
    background-color: white;
    box-shadow: 0 0 10px #cccccc88;
    padding: 14px;
    border-radius: 8px;
}
.feature-row {
    margin-top: 20px;
}
.feature-value {
    color: red
}
</style>