<template>
  <div class="option">
    <input :value="option.strike_price" @input="updateOption('strike_price', $event.target.value)" placeholder="Strike Price" type="number" class="input-field" />
    <select :value="option.type" @change="updateOption('type', $event.target.value)" class="select-field">
      <option value="Call">Call</option>
      <option value="Put">Put</option>
    </select>
    <input :value="option.bid" @input="updateOption('bid', $event.target.value)" placeholder="Bid" type="number" step="0.01" class="input-field" />
    <input :value="option.ask" @input="updateOption('ask', $event.target.value)" placeholder="Ask" type="number" step="0.01" class="input-field" />
    <select :value="option.long_short" @change="updateOption('long_short', $event.target.value)" class="select-field">
      <option value="long">Long</option>
      <option value="short">Short</option>
    </select>
    <button @click="removeOption" class="remove-button">Remove</button>
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
.input-field,
.select-field {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.remove-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.remove-button:hover {
  background-color: #c0392b;
}
</style>