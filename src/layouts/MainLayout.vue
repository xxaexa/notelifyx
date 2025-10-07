<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Notelifyx </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="fit column justify-between">
        <!-- Bagian atas: menu list -->
        <q-list>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>

        <!-- Bagian bawah: tombol logout -->
        <div class="q-pa-md">
          <q-btn
            color="negative"
            label="Logout"
            icon="logout"
            unelevated
            class="full-width"
            @click="handleLogout"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/authStore'

const router = useRouter()
const auth = useAuthStore()
const $q = useQuasar()
const linksList = [
  {
    title: 'Notes',
    caption: 'Your note',
    icon: 'book',
    link: 'notes',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const handleLogout = () => {
  auth.logout()
  $q.notify({
    type: 'positive',
    message: 'Logout Successfully',
    position: 'top',
  })
  router.push('/login')
}
</script>
