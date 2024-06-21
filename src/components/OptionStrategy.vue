<template>
    <div
      class="grid grid-cols-6 text-left border border-gray-300 rounded-lg py-4 px-8 mb-4 cursor-pointer hover:bg-green-300"
      :class="active && ' border-2 border-blue-500 rounded-lg  bg-green-300'"
      @click="selectStrategy"
    >
      <div>
        <div >Strike Price</div>
        <div class="text-lg font-bold">
          {{ option.strike_price  }}  {{ currency }} 
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
          {{ option.bid  }}  {{ currency }} 
        </div>
      </div>
      <div>
        <div>Ask Price</div>
        <div class="text-lg font-bold">
          {{ option.ask  }}  {{ currency }} 
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
  import moment from 'moment';
  
  export default {
    name: 'OptionStrategy',
    data() {
        return {
            currency: 'USD'
        }
    },

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
  };
  </script>
  