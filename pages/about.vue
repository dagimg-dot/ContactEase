<template>
  <h1>About page</h1>
  <div class="flex flex-col">
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
