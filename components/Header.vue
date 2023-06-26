<template>
    <div class="flex justify-between items-center">
      <CompanyLogo />
      <div class="flex gap-4">
        <SignInButton />
        <SignUpButton @click="redirectToSignUp"/>
      </div>
    </div>
  </template>  

<script setup>
const router = useRouter();

const redirectToSignUp = () => {
  router.push('/signup')
}

</script>

<style scoped></style>