<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const close = () => props.show && emit("close");

const onEscape = (e) => e.keyCode === 27 && close();

onMounted(() => document.addEventListener("keydown", onEscape));

onUnmounted(() => document.removeEventListener("keydown", onEscape));

watch(
  () => props.show,
  (isModalOpen) => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
);
</script>

<template>
  <Transition
    name="modal"
    enter-from-class="opacity-0 md:scale-110"
    enter-to-class="opacity-100 md:scale-100"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100 md:scale-100"
    leave-to-class="opacity-0 md:scale-125"
  >
    <div
      v-if="show"
      class="bg-black/25 flex fixed h-100 inset-0 w-100 z-20 md:py-12"
      @click.self="close"
    >
      <div
        class="bg-neutral-800 border border-neutral-900 flex flex-col m-auto md:rounded-lg shadow-md text-gray-200 z-40 h-full md:max-h-full md:h-fit w-full md:max-w-xl"
      >
        <div
          class="border-b border-neutral-900 flex justify-between px-3 md:px-6 py-4 md:py-5"
        >
          <div
            v-if="$slots.title"
            class="font-semibold max-w-full mr-8 text-lg md:text-xl tracking-wide truncate"
          >
            <slot name="title" />
          </div>

          <div>
            <button
              class="flex items-center justify-center ml-auto p-1 rounded-full hover:bg-neutral-700"
              @click="close"
            >
              <svg
                class="hi-solid hi-x-mark inline-block w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          v-if="$slots.body"
          class="grow px-3 md:px-6 py-3 md:py-5 overflow-y-auto overscroll-contain"
        >
          <slot name="body" />
        </div>

        <div
          v-if="$slots.footer"
          class="border-t border-neutral-900 px-3 md:px-6 py-4 md:py-5"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>
