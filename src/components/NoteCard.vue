<script setup lang="ts">

  import type {Note} from "../types/notes.ts";
  import BaseCard from "./BaseCard.vue";

  defineProps<{
    note: Note;
  }>();

  const emit = defineEmits<{
    delete: [id: number];
  }>();
</script>

<template>
  <BaseCard>
    <template #title>
      {{note.title}}
    </template>
    <template #content>
      {{note.content}}
    </template>
    <template #actions>
      <button @click="emit('delete', note.id)">🗑️</button>
    </template>
  </BaseCard>
</template>

<style scoped>

</style>