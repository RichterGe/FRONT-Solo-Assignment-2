<script setup lang="ts">
import BaseCard from "./components/BaseCard.vue";
import {ref} from "vue";
import type {Note} from "./types/notes.ts";
import NoteList from "./components/NoteList.vue";

  const notes = ref<Note[]>([]);
  // const newNote = ref<Note>();
  const title = ref('');
  const content = ref('');
  let nextId = 0;

  function addItem(title: string, content: string): void {
    if(content == '' || title == ''){
      //TODO show error
      return;
    }
    notes.value.push( {
      id: nextId++,
      title: title,
      content: content,
      tags: [],
    });
  }

  function deleteNote(id: number): void {
    notes.value = notes.value.filter(note => note.id !== id);
  }

</script>

<template>
  <h1>QuickNotes</h1>
  Create a new Note:
  <BaseCard >
    <template #title>
      <input type="text" v-model="title" />
    </template>
    <template #content>
      <input type="text" v-model="content" />
    </template>
    <template #actions>
      <button @click="addItem(title, content)">add</button>
    </template>
  </BaseCard>
  <NoteList :notes="notes" @delete="deleteNote" />
</template>

<style>
:root {
  --card-bg: #1e1e1e;
  --card-header: #ffffff;
  --card-actions: #171717;
  --card-body: #b0b0b0;

  --app-background: #0a0a0a;
  --accent-color: #ff5722;
}
.card-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 8px;
  padding: 8px;
  background-color: var(--app-background);
}
</style>