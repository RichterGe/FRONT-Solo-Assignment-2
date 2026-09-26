<script setup lang="ts">
  import type {Note} from "../types/notes.ts";
  import NoteCard from "./NoteCard.vue";

  defineProps<{
    notes: Note[];
  }>();

  const emit = defineEmits<{
    delete: [id: number];
  }>();
</script>

<template>
    <NoteCard v-for="element in notes" :key="element.id" :note="element"
              @delete="(id) => emit('delete', id)"
    />
</template>

<style scoped>

</style>