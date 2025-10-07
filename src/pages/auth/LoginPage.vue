<script setup>
import { useQuasar } from 'quasar'
import { reactive } from 'vue'

import { useAuthStore } from 'src/stores/authStore'
import { loginApi } from 'src/api/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()
const form = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  try {
    const res = await loginApi({
      email: form.email,
      password: form.password,
    })

    auth.setAuth(res.data)

    $q.notify({
      type: 'positive',
      message: 'Login Success',
      position: 'top',
    })

    router.push('/notes')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Login Failed',
      position: 'top',
    })
  }
}
</script>

<template>
  <div class="column justify-center items-center" style="height: 100vh">
    <div class="q-pa-md bg-blue-grey-1 rounded-borders" style="width: 450px">
      <p class="q-py-md text-h4 text-center text-bold text-primary">LOGIN</p>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="email"
          v-model="form.email"
          label="Your Email *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="form.password"
          label="Your Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <div class="row justify-between items-center q-pa-md">
          <q-btn label="Submit" type="submit" color="primary" class="full-width" rounded />
        </div>
      </q-form>
      <p class="text-center">
        Don't have account?
        <router-link to="/register" class="text-primary hover:underline"> Register </router-link>
      </p>
    </div>
  </div>
</template>
