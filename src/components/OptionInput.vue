<template>
  <v-form class="d-flex flex-column align-center">
    <v-data-table :headers="headers" :items="options" item-key="index" :editable="true" @item-edited="submitOptions">
      <template v-slot:[`item.index`]="{ item }">
        <span>{{ item.index }}</span>
      </template>
      <template v-slot:[`item.strike_price`]="{ item }">
        <v-text-field v-model.number="item.strike_price" label="Strike Price" type="number" />
      </template>
      <template v-slot:[`item.type`]="{ item }">
        <v-select v-model="item.type" :items="['Call', 'Put']" label="Type" />
      </template>
      <template v-slot:[`item.long_short`]="{ item }">
        <v-select v-model="item.long_short" :items="['long', 'short']" label="Long/Short" />
      </template>
      <template v-slot:[`item.bid`]="{ item }">
        <v-text-field v-model.number="item.bid" label="Bid" type="number" />
      </template>
      <template v-slot:[`item.ask`]="{ item }">
        <v-text-field v-model.number="item.ask" label="Ask" type="number" />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="error" @click="deleteOption(item)">Delete</v-btn>
      </template>
      <template v-slot:top>
        <v-btn color="primary" @click="addOption">Add Option</v-btn>
      </template>
    </v-data-table>
    <v-btn color="success" @click="submitOptions" class="mt-4" style="width: 200px"> Submit </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'OptionInput',
  props: {
    initialOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: [],
      headers: [
        { text: 'Index', align: 'start', value: 'index' },
        { text: 'Strike Price', value: 'strike_price' },
        { text: 'Type', align: 'start', value: 'type' },
        { text: 'Bid', value: 'bid' },
        { text: 'Ask', value: 'ask' },
        { text: 'Long/Short', value: 'long_short' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  created() {
    this.options = this.initialOptions.map((option, index) => ({
      ...option,
      index: index + 1, // Start index from 1
    }));
  },
  methods: {
    addOption() {
      const newIndex = this.options.length + 1;
      this.options.push({ index: newIndex, strike_price: '', type: 'Call', bid: '', ask: '', long_short: 'long' });
    },
    deleteOption(option) {
      const index = this.options.indexOf(option);
      if (index !== -1) {
        this.options.splice(index, 1);
        this.updateIndices(); // Update indices after deletion
      }
    },
    submitOptions() {
      this.$emit('update-options', this.options);
    },
    updateIndices() {
      this.options.forEach((option, index) => {
        option.index = index + 1; // Update indices
      });
    },
  },
  watch: {
    initialOptions(newOptions) {
      this.options = newOptions.map((option, index) => ({
        ...option,
        index: index + 1, // Reset indices when initial options change
      }));
    },
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-center {
  align-items: center;
}
</style>
