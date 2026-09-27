<script setup lang="ts">

  import type {Note} from "../types/notes.ts";
  import BaseCard from "./BaseCard.vue";

  defineProps<{
    note: Note;
  }>();

  const emit = defineEmits<{
    delete: [id: number];
    filter: [tag: string];
  }>();
</script>

<template>
  <BaseCard>
    <template #title>
      {{note.title}}
    </template>
    <template #content>
      {{note.content}}
      <div class="tags-container" v-if="note.tags && note.tags.length > 0">
        <span class="tag" v-for="tag in note.tags" :key="tag" @click="emit('filter', tag)">
          #{{ tag }}
        </span>
      </div>
    </template>
    <template #actions>
      <button @click="emit('delete', note.id)">🗑️</button>
    </template>
  </BaseCard>
</template>

<style scoped>
.tags-container {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer; /* Changes the mouse cursor to a pointer */
  transition: background-color 0.2s ease, transform 0.1s ease;
}

/* Visually highlights the tag when hovered */
.tag:hover {
  background-color: var(--accent-color);
}

/* Optional: Adds a slight "click" pressing effect */
.tag:active {
  transform: scale(0.95);
}
</style>