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
  props: ['maxProfit', 'maxLoss', 'breakEvenPoints', 'showGraph']
};
</script>

<style scoped>
.options-summary {
  text-align: left;
}
</style>