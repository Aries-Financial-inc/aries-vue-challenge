<template>
  <div>
    <h1 class="text-5xl font-bold text-primary mb-20">Options Profit Calculator</h1>
    <div class="grid grid-cols-1 2xl:grid-cols-2 px-20 gap-10">
      <div>
        <div class="text-2xl font-bold text-center mb-10">Risk-Reward Graph</div>
        <RiskRewardGraph :option="optionsData[selectedOption]"/>
      </div>
      <div>
        <div class="text-2xl font-bold text-center mb-10">Strategy</div>
        <OptionStrategy
          v-for="(option, index) in optionsData"
          :key="index"
          :option="option"
          :active="selectedOption === index"
          @click="displayClicking(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OptionStrategy from '@/components/OptionStrategy.vue'
import RiskRewardGraph from '@/components/RiskRewardGraph.vue'


export default {
  name: 'CodingChallenge',
  components: {
    OptionStrategy,
    RiskRewardGraph
  },
  props: {
    optionsData: Array
  },
  methods: {
    displayClicking(index) {
      this.selectedOption = index;
    }
  },
  data() {
    return {
      selectedOption: 0,
    }
  },
}
</script>
