<template>
  <div class="option">
    <input :value="option.strike_price" @input="updateOption('strike_price', $event.target.value)" placeholder="Strike Price" type="number" />
    <select :value="option.type" @change="updateOption('type', $event.target.value)">
      <option value="Call">Call</option>
      <option value="Put">Put</option>
    </select>
    <input :value="option.bid" @input="updateOption('bid', $event.target.value)" placeholder="Bid" type="number" step="0.01" />
    <input :value="option.ask" @input="updateOption('ask', $event.target.value)" placeholder="Ask" type="number" step="0.01" />
    <select :value="option.long_short" @change="updateOption('long_short', $event.target.value)">
      <option value="long">Long</option>
      <option value="short">Short</option>
    </select>
    <button @click="removeOption">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'OptionForm',
  props: {
    option: {
      type: Object,
      required: true
    },
    removeOption: {
      type: Function,
      required: true
    }
  },
  methods: {
    updateOption(key, value) {
      this.$emit('update-option', { key, value });
    }
  }
}
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.option input,
.option select {
  margin-right: 10px;
}
</style>