<template>
  <div class="coding-challenge">
    <h1>Options Profit Calculator</h1>
    
    <OptionsTable 
      :options="localOptionsData" 
      @update="calculateProfitCurve"
    />

    <OptionsProfitChart :series="chartSeries" />

    <AnalysisSummary 
      :maxProfit="maxProfit"
      :maxLoss="maxLoss"
      :breakEvenPoints="breakEvenPoints"
    />
  </div>
</template>

<script>
import OptionsTable from './OptionsTable.vue'
import OptionsProfitChart from './OptionsProfitChart.vue'
import AnalysisSummary from './AnalysisSummary.vue'

export default {
  name: 'CodingChallenge',
  components: {
    OptionsTable,
    OptionsProfitChart,
    AnalysisSummary
  },
  props: {
    optionsData: Array,
  },
  data() {
    return {
      localOptionsData: [],
      chartSeries: [],
      maxProfit: 0,
      maxLoss: 0,
      breakEvenPoints: [],
    }
  },
  mounted() {
    this.localOptionsData = JSON.parse(JSON.stringify(this.optionsData))
    this.calculateProfitCurve()
  },
  methods: {
calculateProfitCurve() {
  const minStrike = Math.min(...this.localOptionsData.map(option => option.strike_price));
  const maxStrike = Math.max(...this.localOptionsData.map(option => option.strike_price));
  const range = maxStrike - minStrike;
  const startPrice = Math.max(0, minStrike - range * 0.5);
  const endPrice = maxStrike + range * 0.5;
  const step = range / 100;

  const profitCurves = this.localOptionsData.map((option) => {
    const data = [];
    for (let price = startPrice; price <= endPrice; price += step) {
      const profit = this.calculateProfitForOption(price, option);
      data.push([price, profit]);
    }
    return {
      name: `${option.type} ${option.strike_price} (${option.long_short})`,
      data: data
    };
  });

  const totalProfitCurve = {
    name: 'Total Profit/Loss',
    data: []
  };

  for (let i = 0; i < profitCurves[0].data.length; i++) {
    const price = profitCurves[0].data[i][0];
    const totalProfit = profitCurves.reduce((sum, curve) => sum + curve.data[i][1], 0);
    totalProfitCurve.data.push([price, totalProfit]);
  }

  this.chartSeries = [...profitCurves, totalProfitCurve];

  const allProfits = totalProfitCurve.data.map(point => point[1]);
  this.maxProfit = Math.max(...allProfits);
  this.maxLoss = Math.min(...allProfits);
  this.breakEvenPoints = this.findBreakEvenPoints(totalProfitCurve.data);
},

calculateProfitForOption(underlyingPrice, option) {
  const optionPrice = option.ask;
  let optionProfit = 0;

  if (option.type === 'Call') {
    optionProfit = Math.max(0, underlyingPrice - option.strike_price) - optionPrice;
  } else if (option.type === 'Put') {
    optionProfit = Math.max(0, option.strike_price - underlyingPrice) - optionPrice;
  }

  return option.long_short === 'long' ? optionProfit : -optionProfit;
},

findBreakEvenPoints(profitCurve) {
  const breakEvenPoints = [];
  for (let i = 1; i < profitCurve.length; i++) {
    const prevPoint = profitCurve[i - 1];
    const currentPoint = profitCurve[i];
    if ((prevPoint[1] <= 0 && currentPoint[1] >= 0) || (prevPoint[1] >= 0 && currentPoint[1] <= 0)) {
      const breakEvenPrice = this.interpolateBreakEven(prevPoint, currentPoint);
      breakEvenPoints.push(breakEvenPrice.toFixed(2));
    }
  }
  return breakEvenPoints;
},

interpolateBreakEven(point1, point2) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return x1 + (0 - y1) * (x2 - x1) / (y2 - y1);
},
}
}
</script>

<style scoped>
.coding-challenge {
max-width: 1000px;
margin: 0 auto;
padding: 20px;
font-family: Arial, sans-serif;
}

h1 {
color: #333;
text-align: center;
margin-bottom: 30px;
}
</style>