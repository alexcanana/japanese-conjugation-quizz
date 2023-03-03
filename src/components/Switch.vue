<script setup>
import { computed } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const enabled = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <SwitchGroup>
    <div :class="{ 'flex justify-between w-full': label }">
      <SwitchLabel v-if="label" class="mr-4">
        {{ label }}
      </SwitchLabel>

      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-jade-500' : 'bg-gray-400'"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring focus:ring-jade-500 focus:ring-opacity-50"
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        />
      </Switch>
    </div>
  </SwitchGroup>
</template>
