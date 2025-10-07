<template>
  <q-item clickable tag="router-link" :to="`/${link}`" :class="{ 'active-link': isActive }">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  title: String,
  caption: String,
  link: String,
  icon: String,
})

const route = useRoute()

const isActive = computed(() => route.path.startsWith(`/${props.link}`))
</script>

<style scoped>
.active-link {
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 8px;
}
</style>
