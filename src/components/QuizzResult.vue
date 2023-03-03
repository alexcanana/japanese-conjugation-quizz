<script setup>
import { computed, inject } from "vue";

const optionsStore = inject("optionsStore");

const props = defineProps({
  answer: {
    type: String,
    required: true,
    default: "",
  },
  correctAnswers: {
    type: Array,
    required: true,
  },
  isAnswerCorrect: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const resultEmoji = computed(() => (props.isAnswerCorrect ? "✅" : "🚫"));
</script>

<template>
  <div
    class="border-2 p-2 rounded-xl"
    :class="{
      'bg-emerald-100 border-emerald-700 text-emerald-700 ': isAnswerCorrect,
      'bg-red-100 border-red-700 text-red-700': !isAnswerCorrect,
    }"
  >
    <h2
      class="flex items-center justify-center font-semibold md:mb-4 text-lg md:text-2xl tracking-wide uppercase"
    >
      <span class="mr-3">{{ resultEmoji }}</span>
      {{ answer }}
    </h2>

    <div v-if="optionsStore.options.ui.show_correct_answers">
      <ul class="list-disc list-inside ml-2 pt-2 md:text-2xl">
        <li
          v-for="answer in props.correctAnswers"
          :key="answer"
          v-html="answer"
          class="mb-2 md:last:mb-4"
          :class="{ 'font-semibold': answer === props.answer }"
        ></li>
      </ul>
    </div>
  </div>
</template>
