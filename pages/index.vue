<template>
  <div class="flex flex-wrap">
    <div v-for="user in users">
      <p>{{ user.username }}</p>
    </div>
  </div>
</template>

<script setup>

import user from '../apollo/queries/fetchUser.gql'

const { data } = await useAsyncQuery(user)

const users = data.value.user

try {
  console.log(data.value.user[0].username)
} catch (error) {
  console.log(error)
}
</script>