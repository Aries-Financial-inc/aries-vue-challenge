<template>
  <div>
    <form class="w-full mb-4" @submit.prevent="calculateAll">
      <div class="flex flex-row mb-2">
        <div class="w-14" />
        <div class="flex-1">
          <div class="grid grid-cols-7 gap-4">
            <h5>Strike Price</h5>
            <h5>Bid</h5>
            <h5>Ask</h5>
            <h5>Option Type</h5>
            <h5>Long / Short</h5>
          </div>
        </div>
      </div>
      <div
        v-for="(option, key) in currentOptions"
        :key="key"
        class="flex flex-row items-end mb-2"
      >
        <div class="flex-none w-14">
          <p>
            №{{ key + 1 }}
          </p>
        </div>
        <div class="flex-1">
          <StrategyOption
            :option-index="key + 1"
            :option="option"
            class="grid grid-cols-7 gap-4"
            @change="(data) => updateOption(data, key)"
            @update:is-editing="(value) => updateIsEditing(value, key)"
            @remove-option="() => removeOption(key)"
          />
        </div>
      </div>
      <div class="flex flex-row gap-4 justify-center items-center">
        <button
          type="submit"
          class="text-center align-middle text-white bg-emerald-700 rounded p-3 hover:bg-emerald-800"
        >
          Calculate All
        </button>
        <button
          v-if="currentOptions.length < 4"
          type="button"
          class="text-center align-middle text-white bg-slate-400 rounded p-3 hover:bg-slate-500"
          @click="addNewOption"
        >
          Add new option
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import StrategyOption from "@/components/strategy-option.vue";
import {isOptionFilled} from "@/common/risk-reward-options";

const optionInitial = {
  ask: null,
  bid: null,
  expiration_date: new Date().toISOString(),
  long_short: "short",
  strike_price: null,
  type: "Put",
};

export default {
  name: "StrategyForm",
  components: {
    StrategyOption,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    optionsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentOptions: JSON.parse(JSON.stringify(this.optionsData)).map(el => ({...el, isEditing: false})),
    };
  },
  methods: {
    addNewOption() {
      this.currentOptions.push(JSON.parse(JSON.stringify(optionInitial)));
    },
    calculate() {
      if (!this.currentOptions.every(isOptionFilled)) {
        this.$notify({
          group: "riskReward",
          text: "All fields in the options should be filled in correctly!",
          title: "Option is not filled",
          type: "error",
        });

        return;
      }

      this.$emit(
        "update-options",
        JSON.parse(
          JSON.stringify(
            this.currentOptions,
            (key, value) => {
              return key !== "isEditing" ? value : undefined;
            },
          ),
        ),
      );
    },
    async calculateAll() {
      this.currentOptions.forEach((option) => {
        this.$set(option, "isEditing", false);
      });
      await this.$nextTick();
      this.calculate();
    },
    removeOption(idx) {
      this.currentOptions.splice(idx, 1);
      this.calculate();
    },
    updateIsEditing(value, idx) {
      if (!this.currentOptions[idx]) return;
      this.$set(this.currentOptions[idx], "isEditing", value);
    },
    updateOption(option, idx) {
      this.currentOptions.splice(idx, 1, option);
      this.calculate();
    },
  },
};
</script>
