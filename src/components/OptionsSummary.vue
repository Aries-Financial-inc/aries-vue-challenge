<template>
  <div class="options-summary">
    <h2>Summary</h2>
    <div v-if="showGraph">
      <p>Max Profit: {{ maxProfit }}</p>
      <p>Max Loss: {{ maxLoss }}</p>
      <p>Break-even Points: {{ breakEvenPoints.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxProfit: {
      type: Number,
      required: true
    },
    maxLoss: {
      type: Number,
      required: true
    },
    breakEvenPoints: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(point => typeof point === 'number');
      }
    },
    showGraph: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.options-summary {
  text-align: left;
}
</style>