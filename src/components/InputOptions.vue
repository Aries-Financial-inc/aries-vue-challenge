<template>
  <div class="input-options-wrapper">
    <h2>Options Input</h2>
    <ul>
      <li v-for="(option, index) in options" :key="index">
        {{ option.type }} {{ option.long_short }} at ${{ option.strike_price }} (Bid: ${{ option.bid }}, Ask: ${{
          option.ask }})
      </li>
    </ul>
    <el-button type="primary" plain @click="updateOptions">Generate graph</el-button>
  </div>
</template>

<script>
export default {
  props: ['options'],
  methods: {
    updateOptions() {
      this.$emit('update-options', this.options);
    }
  }
};
</script>

<style scoped>
.input-options-wrapper {
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>