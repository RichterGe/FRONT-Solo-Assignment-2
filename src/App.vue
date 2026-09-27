<script setup lang="ts">
  import BaseCard from "./components/BaseCard.vue";
  import {ref} from "vue";
  import NoteList from "./components/NoteList.vue";
  import SearchBar from "./components/searchBar.vue";
  import { useNotes } from "./composables/useNotes.ts";

  const { addNote, deleteNote, filteredNotes } = useNotes();

  const title = ref('');
  const content = ref('');
  const tagsInput = ref(''); // New ref for the tags input field
  const searchTerm = ref(''); // Ref to track what the user types in the search bar

  const displayedNotes = filteredNotes(searchTerm);

  function handleAdd() {
    if (content.value === '' || title.value === '') {
      //TODO show error
      return;
    }
    const processedTags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

    addNote({
      title: title.value,
      content: content.value,
      tags: processedTags
    });

    title.value = '';
    content.value = '';
    tagsInput.value = '';
  }

</script>

<template>
  <h1>QuickNotes</h1>

  <SearchBar v-model="searchTerm" />

  Create a new Note:
  <BaseCard >
    <template #title>
      <input type="text" v-model="title" placeholder="Title" />
    </template>
    <template #content>
      <input type="text" v-model="content" placeholder="Content" />
      <br />
      <input type="text" v-model="tagsInput" placeholder="Tag, Tag" />
    </template>
    <template #actions>
      <button @click="handleAdd">add</button>
    </template>
  </BaseCard>
  <NoteList :notes="displayedNotes" @delete="deleteNote" @filter="searchTerm = $event"/>
</template>

<style>
:root {
  /* Colors */
  --card-bg: #1e1e1e;
  --card-header: #f5f5f5; /* Softened from pure white */
  --card-actions: #171717;
  --card-body: #b0b0b0;
  --app-background: #0a0a0a;
  --accent-color: #ff5722;

  /* Spacing System */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
}

body {
  background-color: var(--app-background);
  color: var(--card-body);
  font-family: sans-serif;
  margin: 0;
  padding: var(--space-md);
}

h1 {
  color: var(--card-header);
  margin-bottom: var(--space-md);
}

/* Global Input Styling */
input[type="text"] {
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #ffffff;
  padding: var(--space-sm) var(--space-md);
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: var(--space-sm);
}

input[type="text"]:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.2);
}

/* Global Button Styling */
button {
  background-color: var(--accent-color);
  color: #ffffff;
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
  background-color: #e64a19;
}

button:active {
  transform: scale(0.98);
}
</style>