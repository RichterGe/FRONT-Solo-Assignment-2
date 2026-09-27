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
  <NoteList :notes="displayedNotes" @delete="deleteNote" />
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