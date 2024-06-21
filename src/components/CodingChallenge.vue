<template>
  <el-row class="coding-challenge-wrapper">
    <el-col :span="6">
      <input-options :options="options" @update-options="updateOptions" />
    </el-col>
    <el-col :span="6">
      <options-summary :showGraph="showGraph" :maxProfit="maxProfit" :maxLoss="maxLoss"
        :breakEvenPoints="breakEvenPoints" />
    </el-col>
    <el-col :span="12">
      <risk-reward-graph :showGraph="showGraph" :options="options" />
    </el-col>
  </el-row>
</template>

<script>
import InputOptions from './InputOptions.vue';
import RiskRewardGraph from './RiskRewardGraph.vue';
import OptionsSummary from './OptionsSummary.vue';
import { validateOptionsArray } from '@/validators';
import { Row, Col } from 'element-ui';

export default {
  components: {
    InputOptions, RiskRewardGraph, OptionsSummary,
    'el-row': Row,
    'el-col': Col
  },
  props: {
    optionsData: {
      type: Array,
      required: true,
      validator: validateOptionsArray
    }
  },
  data() {
    return {
      options: this.optionsData,
      maxProfit: (0).toFixed(2),
      maxLoss: (0).toFixed(2),
      breakEvenPoints: [],
      showGraph: false
    };
  },
  methods: {
    updateOptions(options) {
      this.options = options;
      this.calculateRiskReward();
      this.showGraph = true;
    },
    calculateRiskReward() {
      let maxProfit = -Infinity;
      let maxLoss = Infinity;
      const breakEvenPoints = new Set();

      const prices = [];
      const profits = [];
      const minPrice = Math.min(...this.options.map(o => o.strike_price)) - 20;
      const maxPrice = Math.max(...this.options.map(o => o.strike_price)) + 20;

      for (let price = minPrice; price <= maxPrice; price += 1) {
        let profit = 0;
        this.options.forEach(option => {
          const premium = (option.bid + option.ask) / 2;
          if (option.type === 'Call') {
            if (option.long_short === 'long') {
              profit += Math.max(0, price - option.strike_price) - premium;
            } else {
              profit -= Math.max(0, price - option.strike_price) - premium;
            }
          } else {
            if (option.long_short === 'long') {
              profit += Math.max(0, option.strike_price - price) - premium;
            } else {
              profit -= Math.max(0, option.strike_price - price) - premium;
            }
          }
        });
        prices.push(price);
        profits.push(profit);

        if (profit > maxProfit) {
          maxProfit = profit;
        }
        if (profit < maxLoss) {
          maxLoss = profit;
        }

        if (profits.length > 1 && (profits[profits.length - 2] < 0 && profit >= 0 || profits[profits.length - 2] > 0 && profit <= 0)) {
          breakEvenPoints.add(price);
        }
      }

      this.maxProfit = maxProfit.toFixed(2);
      this.maxLoss = maxLoss.toFixed(2);
      this.breakEvenPoints = Array.from(breakEvenPoints);
    }
  },
  mounted() {
    this.calculateRiskReward();
  }
};
</script>

<style scoped>
.coding-challenge-wrapper {
  margin: 0 60px;
}
</style>