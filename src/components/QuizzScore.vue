<script setup>
import { watch } from "vue";

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
});

let maxScore = 0;

watch(
  () => props.score,
  (newScore) => (maxScore = newScore > maxScore ? newScore : maxScore)
);
</script>

<template>
  <div class="flex justify-between">
    <div class="text-center text-sm md:text-base">
      <h3 class="font-bold">Score</h3>
      <p>{{ score }}</p>
    </div>

    <div class="text-center text-sm md:text-base">
      <h3 class="font-bold">Max score</h3>
      <p>{{ maxScore }}</p>
    </div>
  </div>
</template>
