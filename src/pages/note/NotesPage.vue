<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useNoteStore } from 'src/stores/noteStore'
import { getNotesApi, updateNoteApi, deleteNoteApi } from 'src/api/notes'
import BaseModal from 'src/components/BaseModal.vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const noteStore = useNoteStore()
const form = reactive({ title: '', description: '' })
const editingId = ref(null)
const showUpdate = ref(false)

onMounted(async () => {
  const res = await getNotesApi()
  noteStore.setNotes(res.data)
})

// reset form
const resetForm = () => {
  Object.assign(form, { title: '', description: '' })
  editingId.value = null
}

// buka modal update
const openUpdate = (note) => {
  editingId.value = note._id
  Object.assign(form, note)
  showUpdate.value = true
}

// update note
const handleUpdate = async () => {
  try {
    await updateNoteApi({ ...form })
    const res = await getNotesApi()
    noteStore.setNotes(res.data)

    $q.notify({
      type: 'positive',
      message: 'Note updated successfully!',
      position: 'top',
    })

    showUpdate.value = false
    resetForm()
  } catch (err) {
    ;``
    $q.notify({
      type: 'negative',
      message: 'Failed to update note!',
      position: 'top',
    })
    console.log(err)
  }
}

const handleDelete = async (_id) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this note?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      await deleteNoteApi({ _id })
      const res = await getNotesApi()
      noteStore.setNotes(res.data)
      $q.notify({
        type: 'positive',
        message: 'Note deleted successfully!',
        position: 'top',
      })
    })
    .onCancel(() => {
      $q.notify({
        type: 'info',
        message: 'Delete cancelled',
        position: 'top',
      })
    })
}
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-between items-center">
      <p class="text-h3">YOUR NOTES</p>
      <q-btn label="CREATE NOTE" color="primary" @click="router.push('/notes/add')" />
    </div>

    <q-list bordered separator>
      <q-item v-for="note in noteStore.notes" :key="note._id">
        <q-item-section>
          <q-item-label>{{ note.title }}</q-item-label>
          <q-item-label caption>{{ note.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="flex gap-2">
            <q-btn flat dense round color="primary" icon="edit" @click="openUpdate(note)" />
            <q-btn
              flat
              dense
              round
              color="negative"
              icon="delete"
              @click="handleDelete(note._id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <!-- Update Modal -->
  <BaseModal
    v-model="showUpdate"
    title="Update Note"
    confirm-text="Update"
    cancel-text="Cancel"
    @confirm="handleUpdate"
  >
    <q-input filled v-model="form.title" label="Title" />
    <q-input filled v-model="form.description" label="Description" type="textarea" />
  </BaseModal>
</template>
