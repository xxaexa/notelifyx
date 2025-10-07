<script setup>
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import { registerApi } from 'src/api/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  username: '',
})

const onSubmit = async () => {
  try {
    const res = await registerApi({
      email: form.email,
      password: form.password,
      username: form.username,
    })

    $q.notify({
      type: 'positive',
      message: 'Register Success!',
      position: 'top',
    })

    console.log('User data:', res.data)

    setTimeout(() => {
      $q.notify({
        type: 'info',
        message: 'Redirecting to login page...',
        position: 'top',
      })

      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }, 1000)
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Register Failed',
      position: 'top',
    })
    console.error(err.response?.data || err.message)
  }
}
</script>

<template>
  <div class="column justify-center items-center" style="height: 100vh">
    <div class="q-pa-md bg-blue-grey-1 rounded-borders" style="width: 450px">
      <p class="q-py-md text-h4 text-center text-bold text-primary">REGISTER</p>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="username"
          v-model="form.username"
          label="Your Username *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

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
        Have account?
        <router-link to="/login" class="text-primary hover:underline"> Login </router-link>
      </p>
    </div>
  </div>
</template>
