<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="search-wrapper">
    <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        placeholder="🔍 Search notes, tags, or content..."
    >
  </div>
</template>

<style scoped>
.search-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  width: 80%;
  max-width: 600px;
}
</style>