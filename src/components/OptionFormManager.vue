<template>
  <div class="options">
    <OptionForm
      v-for="(option, index) in localOptionsData"
      :key="index"
      :option="option"
      :removeOption="() => removeOption(index)"
      @update-option="updateOption(index, $event)"
    />
    <button @click="addOption" :disabled="localOptionsData.length >= 4" class="add-button">Add Option</button>
  </div>
</template>

<script>
import OptionForm from './OptionForm.vue';

export default {
  name: 'OptionFormManager',
  components: {
    OptionForm
  },
  props: {
    optionsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localOptionsData: JSON.parse(JSON.stringify(this.optionsData))
    }
  },
  methods: {
    addOption() {
      if (this.localOptionsData.length < 4) {
        this.localOptionsData.push({
          strike_price: '',
          type: 'Call',
          bid: '',
          ask: '',
          long_short: 'long',
          expiration_date: ''
        });
        this.emitUpdate();
      }
    },
    removeOption(index) {
      this.localOptionsData.splice(index, 1);
      this.emitUpdate();
    },
    updateOption(index, payload) {
      this.$set(this.localOptionsData[index], payload.key, payload.value);
      this.emitUpdate();
    },
    emitUpdate() {
      this.$emit('update-options', this.localOptionsData);
    }
  },
  watch: {
    optionsData: {
      immediate: true,
      handler(newVal) {
        this.localOptionsData = JSON.parse(JSON.stringify(newVal));
      }
    }
  }
}
</script>

<style scoped>
.options {
  margin-bottom: 20px;
}
.add-button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #2980b9;
}
.add-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>