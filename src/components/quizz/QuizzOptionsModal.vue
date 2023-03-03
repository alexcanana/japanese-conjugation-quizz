<script setup>
import { computed, inject, ref, watch } from "vue";
import Modal from "@/components/Modal.vue";
import Switch from "@/components/Switch.vue";

const optionsStore = inject("optionsStore");

const showModal = ref(false);
const optionsForm = ref({});
const optionsFormErrors = ref({ adjectives: [] });

const isFormErrored = computed(
  () => optionsFormErrors.value.adjectives.length !== 0
);

const validateForm = () => {
  optionsFormErrors.value = { adjectives: [] };

  if (
    !optionsForm.value.adjectives.types.i &&
    !optionsForm.value.adjectives.types.na
  ) {
    optionsFormErrors.value.adjectives.push("types");
  }

  if (
    !optionsForm.value.adjectives.tenses.present &&
    !optionsForm.value.adjectives.tenses.past
  ) {
    optionsFormErrors.value.adjectives.push("tenses");
  }

  if (
    !optionsForm.value.adjectives.positive.affirmative &&
    !optionsForm.value.adjectives.positive.negative
  ) {
    optionsFormErrors.value.adjectives.push("positive");
  }

  if (
    !optionsForm.value.adjectives.forms.plain &&
    !optionsForm.value.adjectives.forms.polite
  ) {
    optionsFormErrors.value.adjectives.push("forms");
  }
};

const openModal = () => {
  showModal.value = true;
  optionsForm.value = JSON.parse(JSON.stringify(optionsStore.options));
};

const closeModal = () => (showModal.value = false);

const submit = () => {
  if (isFormErrored.value) {
    return;
  }

  optionsStore.applyOptions(optionsForm.value);
  closeModal();
};

watch(
  () => optionsForm.value,
  () => validateForm(),
  { deep: true }
);
</script>

<template>
  <button
    type="button"
    class="inline-flex justify-center items-center space-x-2 rounded border font-medium focus:outline-none px-3 py-2 leading-6 text-white hover:text-white focus:ring focus:ring-opacity-50 bg-neutral-900 hover:bg-neutral-700/20"
    @click="openModal"
  >
    <svg
      class="hi-mini hi-adjustments-vertical inline-block w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z"
      />
    </svg>
    <span>Options</span>
  </button>

  <Teleport to="body">
    <Modal :show="showModal" @close="closeModal">
      <template #title>Options</template>

      <template #body>
        <form id="options-form" @submit.prevent="submit">
          <fieldset>
            <legend class="text-jade-500 text-lg tracking-wide">UI</legend>

            <ul class="pb-4">
              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.ui.show_furigana"
                  label="Show Furigana"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.ui.show_word_type"
                  label="Show word type"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.ui.show_meanings"
                  label="Show meanings"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.ui.show_emojis"
                  label="Show instructions' emojis"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.ui.show_correct_answers"
                  label="Show correct answers"
                />
              </li>
            </ul>
          </fieldset>

          <!-- Adjective options -->
          <fieldset>
            <legend class="text-jade-500 text-lg tracking-wide">
              Adjectives
            </legend>

            <ul class="border-b border-white/10 py-2">
              <p
                v-if="optionsFormErrors.adjectives.includes('types')"
                class="mb-2 text-red-500 tracking-wide"
              >
                You must select at least one option.
              </p>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.types.i"
                  label="い adjectives"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.types.na"
                  label="な adjectives"
                />
              </li>
            </ul>

            <ul class="border-b border-white/10 py-2">
              <p
                v-if="optionsFormErrors.adjectives.includes('tenses')"
                class="mb-2 text-red-500 tracking-wide"
              >
                You must select at least one option.
              </p>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.tenses.present"
                  label="Present"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.tenses.past"
                  label="Past"
                />
              </li>
            </ul>

            <ul class="border-b border-white/10 py-2">
              <p
                v-if="optionsFormErrors.adjectives.includes('positive')"
                class="mb-2 text-red-500 tracking-wide"
              >
                You must select at least one option.
              </p>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.positive.affirmative"
                  label="Affirmative"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.positive.negative"
                  label="Negative"
                />
              </li>
            </ul>

            <ul class="pt-2">
              <p
                v-if="optionsFormErrors.adjectives.includes('forms')"
                class="mb-2 text-red-500 tracking-wide"
              >
                You must select at least one option.
              </p>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.forms.plain"
                  label="Plain"
                />
              </li>

              <li class="py-2 flex justify-between items-center space-x-3">
                <Switch
                  v-model="optionsForm.adjectives.forms.polite"
                  label="Polite"
                />
              </li>
            </ul>
          </fieldset>
        </form>
      </template>

      <template #footer>
        <div class="flex gap-4 justify-end">
          <button
            class="inline-flex justify-center items-center space-x-2 rounded focus:outline-none px-3 py-2 leading-6 text-white hover:text-white focus:ring focus:ring-opacity-50 hover:bg-neutral-700/20"
            @click="closeModal"
          >
            <span>Cancel</span>
          </button>

          <button
            type="submit"
            form="options-form"
            class="inline-flex justify-center items-center space-x-2 rounded border focus:outline-none px-4 py-2 leading-6 text-white hover:text-white focus:ring focus:ring-opacity-50 disabled:opacity-25 bg-neutral-900 hover:bg-neutral-900/20"
            :disabled="isFormErrored"
          >
            <span>Save</span>
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>
