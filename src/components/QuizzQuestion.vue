<script setup>
import { inject } from "vue";

const optionsStore = inject("optionsStore");

defineProps({
  furigana: {
    type: String,
    required: true,
    default: "",
  },
  meanings: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <div class="flex flex-col gap-3 md:gap-6">
    <h1
      class="text-jade-500 font-medium text-4xl md:text-5xl text-center tracking-widest"
    >
      <ruby
        :class="{
          'hide-furigana': !optionsStore.options.ui.show_furigana,
        }"
        v-html="furigana"
      ></ruby>
    </h1>

    <h2
      v-if="optionsStore.options.ui.show_word_type"
      class="md:text-xl text-center"
    >
      {{ type }}
    </h2>

    <h2
      v-if="optionsStore.options.ui.show_meanings"
      class="h-8 italic mt-2 md:text-2xl text-center"
    >
      {{ meanings }}
    </h2>
  </div>
</template>

<style scope>
ruby.hide-furigana rt {
  display: none;
}
</style>
