<template>
  <div id="app">
    <CodingChallenge :options-data="sampleData" />
  </div>
</template>

<script>
import CodingChallenge from "./components/CodingChallenge.vue";

export default {
  name: "App",
  components: {
    CodingChallenge,
  },
  data() {
    return {
      sampleData: [
        {
          "ask": 12.04,
          "bid": 10.05,
          "expiration_date": "2025-12-17T00:00:00Z",
          "long_short": "long",
          "strike_price": 100,
          "type": "Call",
        },
        {
          "ask": 14,
          "bid": 12.10,
          "expiration_date": "2025-12-17T00:00:00Z",
          "long_short": "long",
          "strike_price": 102.50,
          "type": "Call",
        },
        {
          "ask": 15.50,
          "bid": 14,
          "expiration_date": "2025-12-17T00:00:00Z",
          "long_short": "short",
          "strike_price": 103,
          "type": "Put",
        },
        {
          "ask": 18,
          "bid": 16,
          "expiration_date": "2025-12-17T00:00:00Z",
          "long_short": "long",
          "strike_price": 105,
          "type": "Put",
        },
      ],
    };
  },
};
</script>
