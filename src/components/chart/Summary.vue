<template lang="">
    <div>
        <div class="summary">
        <div class="summary-item">
          <p class="summary-label">Max Profit:</p>
          <p class="summary-value">{{ data.maxProfit }}</p>
        </div>
        <div class="summary-item">
          <p class="summary-label">Max Loss:</p>
          <p class="summary-value">{{ data.maxLoss }}</p>
        </div>
        <div class="summary-item">
          <p class="summary-label">Break Even Points:</p>
          <p class="summary-value">{{ data.breakEvenPoints.join(', ') }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:"SummaryComponent",
    props:{
        data: {
            type: Array,
            required: true
      },
    }
}
</script>

<style scoped>
.summary {
    margin-top: 50px;
}

.summary-item {
    display: flex;
    justify-content: center;
}

.summary-label {
    font-weight: bold;
}

.summary-value {
    margin-left: 10px;
    color: #333;
    font-size: 16px;
}
</style>