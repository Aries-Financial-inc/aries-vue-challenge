<template>
    <div>
      <form @submit.prevent="addOption">
        <div v-for="(option, index) in options" :key="index" class="mb-4">
          <OptionStrategy
            :option="option"
            :active="selectedOption === index"
            @click="displayClicking(index)"
            @remove="removeOption(index)"
          />
          <button @click.prevent="removeOption(index)" class="text-red-500">Remove</button>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-4">
          <input v-model="newOption.strike_price" placeholder="Strike Price" type="number" step="any" class="border p-2" required />
          <select id="type" v-model="newOption.type" class="bg-white focus:outline-none focus:ring-indigo-500 border">
            <option value="Call" class="text-gray-900">Call</option>
            <option value="Put">Put</option>
          </select>
          <input v-model="newOption.bid" placeholder="Bid Price" type="number" step="any" class="border p-2" required />
          <input v-model="newOption.ask" placeholder="Ask Price" type="number" step="any" class="border p-2" required />
          <select id="long_short" v-model="newOption.long_short" class="bg-white focus:outline-none focus:ring-indigo-500 border">
            <option value="Long" class="text-gray-900">Long</option>
            <option value="Short">Short</option>
          </select>
          <datepicker v-model="newOption.expiration_date" placeholder="Select Date" :format="DatePickerFormat" class="custom-datepicker" :disabledDates="disabledDates"></datepicker>
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Option</button>
      </form>
    </div>
  </template>
  
  <script>
  import OptionStrategy from '@/components/OptionStrategy.vue';
  import Datepicker from 'vuejs-datepicker';
  
  export default {
    name: 'StrategyForm',
    components: {
      OptionStrategy,
      Datepicker,
    },
    props: {
      optionsData: Array,
      selectedOption: Number,
    },
    data() {
      return {
        DatePickerFormat: 'dd/MM/yyyy',
        disabledDates: {
          to: new Date(Date.now() - 8640000),
        },
        newOption: {
          strike_price: null,
          type: 'Put',
          bid: null,
          ask: null,
          long_short: 'Long',
          expiration_date: '',
        },
        options: [...this.optionsData],
      };
    },
    methods: {
      displayClicking(index) {
        this.$emit('update:selectedOption', index);
      },
      addOption() {
        if (this.options.length < 4) {
          this.options.push({ ...this.newOption });
          this.newOption = {
            strike_price: null,
            type: 'Put',
            bid: null,
            ask: null,
            long_short: 'Long',
            expiration_date: '',
          };
          this.$emit('update:selectedOption', this.options.length - 1);
          this.$emit('updateOptions', this.options);

        } 
        
      },
      removeOption(index) {
        this.options.splice(index, 1);
        this.$emit('update:selectedOption', Math.max(this.selectedOption - 1, 0));
        this.$emit('updateOptions', this.options);

      },
    },
    watch: {
      optionsData: {
        handler(newOptions) {
          this.options = [...newOptions];
        },
        deep: true,
      },
    },
  };
  </script>
  
