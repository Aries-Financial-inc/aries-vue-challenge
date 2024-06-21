<template>
  <div class="container mx-auto">
    <StrategyForm
      :options-data="options"
      :chart-data="chartData"
      class="mb-6"
      @update-options="updateOptions"
    />
    <RiskRewardGraph :chart-data="chartData" />
    <notifications group="riskReward" position="bottom center" />
  </div>
</template>

<script>
import RiskRewardGraph from "@/components/risk-reward-graph.vue";
import StrategyForm from "@/components/strategy-form.vue";

import {calculateRiskReward} from "@/common/risk-reward";

export default {
  name: "CodingChallenge",
  components: {
    RiskRewardGraph,
    StrategyForm,
  },
  props: {
    optionsData: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        dataset: [],
        labels: [],
      },
      options: JSON.parse(JSON.stringify(this.optionsData || [])),
    };
  },
  mounted() {
    this.calculateOptions();
  },
  methods: {
    calculateOptions() {
      this.chartData = calculateRiskReward(this.options);
    },
    updateOptions(newOptionsData) {
      this.options = newOptionsData;
      this.calculateOptions();
    },
  },
};
</script>
