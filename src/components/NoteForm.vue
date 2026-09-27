<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "./BaseCard.vue";

const emit = defineEmits<{
  add: [noteData: { title: string; content: string; tags: string[] }];
}>();

const title = ref('');
const content = ref('');
const tagsInput = ref('');

function handleAdd() {
  if (content.value === '' || title.value === '') {
    return;
  }

  const processedTags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

  emit('add', {
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
  <BaseCard>
    <template #title>
      <input type="text" v-model="title" placeholder="Title" />
    </template>
    <template #content>
      <input type="text" v-model="content" placeholder="Content" />
      <br />
      <input type="text" v-model="tagsInput" placeholder="Tag, Tag" />
    </template>
    <template #actions>
      <button @click="handleAdd">Add Note</button>
    </template>
  </BaseCard>
</template>