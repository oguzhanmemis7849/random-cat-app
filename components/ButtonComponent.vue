<script setup lang="ts">
import { ref, computed } from "vue";

type ButtonType = "primary" | "danger";

const props = defineProps<{
  type: ButtonType;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();

const getButtonTypeClass = (type: ButtonType) => {
  switch (type) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case "danger":
      return "bg-red-500 hover:bg-red-600 text-white";
    default:
      break;
  }
};

const getButtonDisabledClass = (disabled: boolean) => {
  if (disabled) {
    return "bg-blue-200 hover:bg-blue-200 text-gray-400";
  }
};

const getButtonClass = computed(() => {
  return (type: ButtonType) => {
    return [
      props.disabled
        ? getButtonDisabledClass(props.disabled ?? false)
        : getButtonTypeClass(type),
    ];
  };
});

const handleClickButton = () => {
  emits("click");
};
</script>

<template>
  <button
    :class="getButtonClass(type)"
    class="px-2 py-1 rounded-md"
    @click="handleClickButton"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
