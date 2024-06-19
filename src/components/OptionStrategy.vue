<template>
  <div
    class="grid grid-cols-6 text-left border border-gray-300 rounded-lg py-4 px-8 mb-4 cursor-pointer hover:bg-primary/30"
    :class="active && 'shadow-active border-primary/70 bg-primary/30'"
    @click="selectStrategy"
  >
    <div>
      <div class="mb-1">Strike Price</div>
      <div class="text-lg font-bold">
        {{ option.strike_price | currency }}
      </div>
    </div>
    <div>
      <div>Option Type</div>
      <div class="text-lg font-bold">
        {{ option.type }}
      </div>
    </div>
    <div>
      <div>Bid Price</div>
      <div class="text-lg font-bold">
        {{ option.bid | currency }}
      </div>
    </div>
    <div>
      <div>Ask Price</div>
      <div class="text-lg font-bold">
        {{ option.ask | currency }}
      </div>
    </div>
    <div>
      <div>Long / Short</div>
      <div class="text-lg font-bold">
        {{ option.long_short }}
      </div>
    </div>
    <div>
      <div>Expiration Date</div>
      <div class="text-lg font-bold">
        {{ expirationDate(option.expiration_date) }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'OptionStrategy',
  props: {
    option: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },
  methods: {
    selectStrategy() {
      this.$emit('click');
    },
    expirationDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }
}
</script>
