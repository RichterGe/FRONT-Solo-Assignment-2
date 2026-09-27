import {computed, type Ref} from 'vue'
import { useLocalStorage } from './useLocalStorage.ts'
import type {Note} from "../types/notes.ts";

export function useNotes() {
  const notes:Ref<Note[]> = useLocalStorage('quicknotes', [])

  function addNote(noteData: Omit<Note, 'id'>) {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [] // Default to an empty array if no tags are provided
    }
    notes.value.push(newNote)
  }

  function deleteNote(id:number) {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  // Accepts a reactive ref (searchTerm) and returns a computed array
  function filteredNotes(searchTerm: Ref<string>) {
    return computed(() => {
      const term = searchTerm.value.toLowerCase().trim()

      // If the search bar is empty, return all notes
      if (!term) return notes.value

      // Filter by checking if the term exists in title, content, or any tag
      return notes.value.filter(note => {
        const inTitle = note.title.toLowerCase().includes(term)
        const inContent = note.content.toLowerCase().includes(term)
        const inTags = note.tags.some((tag: string) => tag.toLowerCase().includes(term))

        return inTitle || inContent || inTags
      })
    })
  }

  return { notes, addNote, deleteNote, filteredNotes }
}