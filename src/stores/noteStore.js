import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useNoteStore = defineStore('note', () => {
  const notes = ref([])
  const note = reactive({
    _id: null,
    user_id: null,
    title: null,
    description: null,
  })

  const setNotes = (data) => {
    notes.value = data
  }

  const setNote = (data) => {
    Object.assign(note, data)
  }

  const clearNote = () => {
    Object.assign(note, {
      _id: '',
      user_id: '',
      title: '',
      description: '',
    })
  }

  return {
    notes,
    note,
    setNotes,
    setNote,
    clearNote,
  }
})
