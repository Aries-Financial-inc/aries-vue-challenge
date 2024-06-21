<template>
  <div>
    <div class="option-input-wrapper">
      <input
        :id="`strike_price${optionIndex}`"
        :value="currentOption.strike_price"
        :disabled="!isChanging"
        name="strike_price"
        type="number"
        step="any"
        placeholder="Strike Price"
        class="h-8"
        @input="(event) => onNumberInput(event, 'strike_price')"
      />
    </div>
    <div class="option-input-wrapper">
      <input
        :id="`bid${optionIndex}`"
        :value="currentOption.bid"
        :disabled="!isChanging"
        name="bid"
        type="number"
        step="any"
        placeholder="Bid Price"
        class="h-8"
        @input="(event) => onNumberInput(event, 'bid')"
      />
    </div>
    <div class="option-input-wrapper">
      <input
        :id="`ask${optionIndex}`"
        :value="currentOption.ask"
        :disabled="!isChanging"
        name="ask"
        type="number"
        step="any"
        placeholder="Ask Price"
        class="h-8"
        @input="(event) => onNumberInput(event, 'ask')"
      />
    </div>
    <div class="option-input-wrapper">
      <select
        :id="`type${optionIndex}`"
        :value="currentOption.type"
        :disabled="!isChanging"
        class="h-8"
        @change="(event) => onSelectUpdate(event, 'type')"
      >
        <option value="Call">
          Call
        </option>
        <option value="Put">
          Put
        </option>
      </select>
    </div>
    <div class="option-input-wrapper">
      <select
        :id="`long_short${optionIndex}`"
        :value="currentOption.long_short"
        :disabled="!isChanging"
        class="h-8"
        @change="(event) => onSelectUpdate(event, 'long_short')"
      >
        <option value="long">
          Long
        </option>
        <option value="short">
          Short
        </option>
      </select>
    </div>
    <div class="flex flex-row items-end justify-between gap-1 col-span-2">
      <button
        v-if="!isChanging"
        type="button"
        class="text-center align-middle text-white bg-sky-700 rounded h-8 hover:bg-sky-800 w-1/3"
        @click="turnOnChanging"
      >
        Change
      </button>
      <template v-if="isChanging">
        <button
          class="text-center align-middle text-white bg-emerald-700 rounded h-8 hover:bg-emerald-800 w-1/3"
          type="button"
          @click="onSubmitChanging"
        >
          Submit
        </button>
        <button
          class="text-center align-middle text-white bg-rose-700 rounded h-8 hover:bg-rose-800 w-1/3"
          type="button"
          @click="removeOption"
        >
          Remove
        </button>
        <button
          class="text-center align-middle text-white bg-slate-400 rounded h-8 hover:bg-slate-500 w-1/3"
          type="button"
          @click="turnOffChanging"
        >
          Cancel
        </button>
      </template>
    </div>
  </div>
</template>
<script>
import {isOptionFilled} from "@/common/risk-reward-options";

export default {
  name: "StrategyOption",
  model: {
    prop: "option",
    event: "change",
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
    optionIndex: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      currentOption: JSON.parse(JSON.stringify(this.option)),
    };
  },
  computed: {
    isChanging() {
      return this.option.isEditing;
    },
  },
  methods: {
    onNumberInput(event, keyName) {
      this.currentOption[keyName] = Number(event.target.value || 0);
    },
    onSelectUpdate(event, keyName) {
      this.currentOption[keyName] = event.target.value;
    },
    onSubmitChanging() {
      if (!isOptionFilled(this.currentOption)) {
        this.$notify({
          group: "riskReward",
          text: "All fields in the option should be filled in correctly!",
          title: "Option is not filled",
          type: "error",
        });

        return;
      }
      this.$emit("change", this.currentOption);
      this.turnOffChanging();
    },
    removeOption() {
      this.$emit("remove-option");
    },
    setCurrentOptionByInitial() {
      this.currentOption = JSON.parse(JSON.stringify(this.option));
    },
    turnOffChanging() {
      this.$emit("update:is-editing", false);
    },
    turnOnChanging() {
      this.$emit("update:is-editing", true);
    },
  },
  watch: {
    "option.isEditing": function(val) {
      if (val) return;
      this.setCurrentOptionByInitial();
    },
  },
};
</script>

<style scoped>
.option-input-wrapper input,
.option-input-wrapper select {
  border: 1px solid #e8e8e8;
  width: 100%;
  padding: 0 6px;
  border-radius: 4px;
}

.option-input-wrapper input:disabled,
.option-input-wrapper select:disabled {
  border-color: transparent;
  background: transparent;
}

.option-input-wrapper select:disabled {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}
</style>
