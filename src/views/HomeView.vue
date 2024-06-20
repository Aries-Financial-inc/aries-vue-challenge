<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <OptionInput :initialOptions="optionsData" @update-options="updateOptions" />
      </v-col>
      <v-col cols="12">
        <ChartComponent :optionsData="optionsData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OptionInput from '@/components/OptionInput.vue';
import ChartComponent from '@/components/ChartComponent.vue';

export default {
  name: 'HomeView',
  components: {
    OptionInput,
    ChartComponent,
  },
  data() {
    return {
      optionsData: [
        { strike_price: 100, type: 'Call', bid: 10.05, ask: 12.04, long_short: 'long' },
        { strike_price: 102.5, type: 'Call', bid: 12.1, ask: 14, long_short: 'long' },
        { strike_price: 103, type: 'Put', bid: 14, ask: 15.5, long_short: 'short' },
        { strike_price: 105, type: 'Put', bid: 16, ask: 18, long_short: 'long' },
      ],
    };
  },
  methods: {
    updateOptions(newOptions) {
      this.optionsData = newOptions;
    },
  },
};
</script>

<style scoped></style>
