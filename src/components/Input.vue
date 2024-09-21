<template>
  <div class="flex flex-col max-w-[100%]" v-bind="$attrs">
    <label :for="name" class="mb-1 text-md text-gray-700 font-medium">
      {{ label }}
    </label>
    <input
      :name="name"
      v-model="value"
      :as="type"
      :type="type"
      :id="name"
      :disabled="disabled"
      :class="[
        'py-[.4rem] sm:py-[.625rem] px-2  text-gray-800 border-gray-200 border-2 bg-white focus:outline-none focus:border-primary rounded-lg',
        { '!border-red-400': errorMessage },
      ]"
    />
    <small
      :class="['text-red-400 opacity-0', { 'opacity-100 ': errorMessage }]"
      >{{ errorMessage ? errorMessage : "empty" }}</small
    >
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "input",
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage } = useField(() => props.name);
</script>
