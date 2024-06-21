<template>
  <div>
    <h1 class="text-5xl font-bold text-primary mb-20">Options Profit Calculator</h1>
    <div class="grid grid-cols-1 2xl:grid-cols-2 px-20 gap-10">
      <div>
        <div class="text-2xl font-bold text-center mb-10">Risk-Reward Graph</div>
        <RiskRewardGraph :option="localOptionsData[selectedOption]" v-if="localOptionsData.length > 0" />
        <div v-if="localOptionsData.length === 0">
          <div class="text-title-text font-bold text-3xl">Please input Contract Details</div>
        </div>
      </div>
      <div>
        <div class="text-2xl font-bold text-center mb-10">Strategy</div>
        <StrategyForm
          :optionsData="localOptionsData"
          :selectedOption.sync="selectedOption"
          @updateOptions="updateOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RiskRewardGraph from '@/components/RiskRewardGraph.vue';
import StrategyForm from '@/components/StrategyForm.vue';

export default {
  name: 'CodingChallenge',
  components: {
    RiskRewardGraph,
    StrategyForm,
  },
  props: {
    optionsData: Array,
  },
  data() {
    return {
      selectedOption: 0,
      localOptionsData: [...this.optionsData],
    };
  },
  methods: {
    updateOptions(newOptions) {
      this.localOptionsData = newOptions;
      this.$emit('update:optionsData', newOptions);
    },
  },
  watch: {
    optionsData: {
      handler(newOptions) {
        this.localOptionsData = [...newOptions];
      },
      deep: true,
    },
  },
};
</script>
