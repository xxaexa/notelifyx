<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { createNoteApi, getNotesApi } from 'src/api/notes'
import { useNoteStore } from 'src/stores/noteStore'

const $q = useQuasar()
const router = useRouter()
const noteStore = useNoteStore()

const form = reactive({
  title: '',
  description: '',
})

const handleCreate = async () => {
  try {
    await createNoteApi({ ...form })
    const res = await getNotesApi()
    noteStore.setNotes(res.data)

    $q.notify({
      type: 'positive',
      message: 'Note created successfully!',
      position: 'top',
    })

    setTimeout(() => {
      router.push('/notes')
    }, 1000)
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Failed to create note!',
      position: 'top',
    })
    console.log(err)
  }
}
</script>

<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <div class="row items-center q-pb-md">
        <q-btn flat color="black" icon="arrow_back" @click="router.push('/notes')" />
        <p class="text-h4 text-primary text-center q-ml-md q-mb-none">Create New Note</p>
      </div>

      <q-btn color="primary" icon="save" label="Save" type="submit" />
    </div>

    <q-form @submit="handleCreate" class="q-gutter-md">
      <q-input filled v-model="form.title" label="Title" />
      <q-input filled v-model="form.description" type="textarea" label="Description" />
    </q-form>
  </div>
</template>
