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
    <button v-if="modelValue" @click="emit('update:modelValue', '')">
      Clear
    </button>
  </div>
</template>

<style scoped>
.search-wrapper {
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: var(--space-sm);
}

.search-wrapper input{
  margin-bottom: 0;
}
</style>