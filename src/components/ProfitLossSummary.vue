<template>
  <div :class="$style.Root">
    <p><label>Max Profit:</label> {{ formatPrice(maxProfit) }}</p>
    <p><label>Max Loss:</label> {{ formatPrice(maxLoss) }}</p>
    <p><label>Break-even Points:</label> {{ breakEvenPoints.join(', ') }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/* import models */
import { Option } from '@/models/Option'

/* import utils */
import {
  getBreakEvenPoints,
  getMaxProfit,
  getMaxLoss
} from '@/utils/OptionUtils'
import { formatPrice } from '@/utils/FormatUtils'

export default Vue.extend({
  props: {
    optionsData: {
      type: Array as () => Option[],
      required: true
    }
  },

  computed: {
    formatPrice() {
      return formatPrice
    },
    breakEvenPoints(): number[] {
      return getBreakEvenPoints(this.optionsData)
    },
    maxProfit(): number {
      return getMaxProfit(this.optionsData)
    },
    maxLoss(): number {
      return getMaxLoss(this.optionsData)
    }
  }
})
</script>

<style module>
.Root {
  text-align: center;

  label {
    font-weight: bold;
  }
}
</style>
