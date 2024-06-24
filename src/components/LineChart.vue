<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { defineComponent, onMounted, ref } from "vue";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const canvas = ref(null);

    onMounted(() => {
      new Chart(canvas.value, {
        type: "line",
        data: props.chartData,
        options: props.options,
      });
    });

    return {
      canvas,
    };
  },
});
</script>
