<template>
  <div class="options-table">
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Strike Price</th>
          <th>Long/Short</th>
          <th>Max Profit</th>
          <th>Max Loss</th>
          <th>Breakeven</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="option in options" :key="option.strike_price + option.type + option.long_short">
          <td>{{ option.type }}</td>
          <td>{{ option.strike_price }}</td>
          <td>{{ option.long_short }}</td>
          <td>{{ calculateOptionMetrics(option).maxProfit }}</td>
          <td>{{ calculateOptionMetrics(option).maxLoss }}</td>
          <td>{{ calculateOptionMetrics(option).breakeven }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {calculateOptionMetrics} from "../utils/dataGenerator"

export default {
  name: "OptionsTable",
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  methods: {
    calculateOptionMetrics(option) {
      return calculateOptionMetrics(option)
    }
  },
};
</script>

<style scoped>
.options-table {
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
  max-width: 60%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  word-wrap: break-word;
}

th {
  background-color: #4CAF50;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  position: sticky;
  top: 0;
}

td {
  font-size: 12px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

tbody tr:last-child td {
  border-bottom: none;
}

thead th:first-child {
  border-top-left-radius: 10px;
}

thead th:last-child {
  border-top-right-radius: 10px;
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}
</style>