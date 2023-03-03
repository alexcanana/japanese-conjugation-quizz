<script setup>
import { onMounted, ref } from "vue";
import * as wanakana from "wanakana";

const input = ref(null);
const answer = ref("");

onMounted(() => {
  wanakana.bind(input.value);
  input.value.focus();
});

const emit = defineEmits(["submitAnswer", "focusOnInput"]);

const submit = () => {
  if (answer.value === "") {
    return;
  }

  emit("submitAnswer", answer.value);
};

const focus = () => {
  if (answer.value === "") {
    return;
  }

  answer.value = "";

  emit("focusOnInput");
};
</script>

<template>
  <div>
    <form @submit.prevent="submit" class="mt-6">
      <div class="flex flex-row text-center w-full">
        <input
          class="block border grow p-3 md:p-4 text-xl md:text-2xl text-neutral-900 tracking-wide w-full"
          ref="input"
          type="text"
          required
          v-model.trim="answer"
          @focus="focus"
        />

        <button
          class="border font-medium px-4 py-3 md:px-8 md:py-4 rounded-r-lg text-lg md:text-2xl tracking-wide disabled:opacity-25"
          :disabled="answer === ''"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
