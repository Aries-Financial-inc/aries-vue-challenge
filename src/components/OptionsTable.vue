<template>
    <div class="options-table">
      <table>
        <thead>
          <tr>
            <th>Strike Price</th>
            <th>Type</th>
            <th>Ask</th>
            <th>Long/Short</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(option, index) in options" :key="index">
            <td><input v-model.number="option.strike_price" type="number" step="0.01"></td>
            <td>
              <select v-model="option.type">
                <option>Call</option>
                <option>Put</option>
              </select>
            </td>
            <td><input v-model.number="option.ask" type="number" step="0.01"></td>
            <td>
              <select v-model="option.long_short">
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
            </td>
            <td><input v-model="option.expiration_date" type="date"></td>
          </tr>
        </tbody>
      </table>
      <button @click="$emit('update')" class="update-button">Update Chart</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OptionsTable',
    props: {
      options: Array
    }
  }
  </script>
  
  <style scoped>
  .options-table {
    margin-bottom: 20px;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .update-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .update-button:hover {
    background-color: #45a049;
  }
  </style>