<template>
  <q-dialog v-model="localDialog">
    <q-card style="min-width: 400px">
      <!-- Header -->
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <!-- Content (slot biar reusable) -->
      <q-card-section class="q-gutter-md">
        <slot />
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn flat :label="cancelText" color="grey" @click="handleCancel" />
        <q-btn flat :label="confirmText" color="primary" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Modal' },
  confirmText: { type: String, default: 'OK' },
  cancelText: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const localDialog = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => (localDialog.value = val),
)

watch(localDialog, (val) => emit('update:modelValue', val))

const handleConfirm = () => {
  emit('confirm')
  localDialog.value = false
}

const handleCancel = () => {
  emit('cancel')
  localDialog.value = false
}
</script>
