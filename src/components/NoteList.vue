<script setup lang="ts">
  import type {Note} from "../types/notes.ts";
  import NoteCard from "./NoteCard.vue";

  defineProps<{
    notes: Note[];
  }>();

  const emit = defineEmits<{
    delete: [id: number];
    filter: [tag: string];
  }>();
</script>

<template>
  <div class="note-grid">
    <NoteCard v-for="element in notes" :key="element.id" :note="element"
              @delete="(id) => emit('delete', id)"
              @filter="(tag) => emit('filter', tag)"
    />
  </div>
</template>

<style scoped>
.note-grid {
  display: grid;
  /* Automatically creates columns that are at least 300px wide */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
  width: 100%;
  margin-top: var(--space-lg);
}
</style>