<script setup>
import { inject } from "vue";

const optionsStore = inject("optionsStore");

defineProps({
  instructions: {
    type: Array,
    required: true,
  },
});

const instructionsEmoji = {
  Present: "⬇️",
  Past: "🕰️",
  Affirmative: "👍",
  Negative: "👎",
  Plain: "👨‍👩‍👧",
  Polite: "👔",
};
</script>

<template>
  <div class="flex my-6 text-lg md:text-2xl tracking-wide">
    <div
      class="text-center w-1/3"
      v-for="instruction in instructions"
      :key="instruction"
    >
      <span :class="[optionsStore.options.ui.show_emojis ? 'block' : 'hidden']">
        {{ instructionsEmoji[instruction] }}
      </span>
      {{ instruction }}
    </div>
  </div>
</template>
