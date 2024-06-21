<template>
    <div class="analysis">
      <p><strong>Max Profit:</strong> ${{ maxProfit.toFixed(2) }}</p>
      <p><strong>Max Loss:</strong> ${{ maxLoss.toFixed(2) }}</p>
      <p><strong>Break-even Points:</strong> {{ breakEvenPoints.join(', ') }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AnalysisSummary',
    props: {
      maxProfit: Number,
      maxLoss: Number,
      breakEvenPoints: Array
    }
  }
  </script>
  
  <style scoped>
  .analysis {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-top: 20px;
  }
  
  .analysis p {
    margin: 10px 0;
    font-size: 16px;
  }
  
  .analysis strong {
    font-weight: 600;
    color: #333;
  }
  </style>