<template>
  <div class="landing-page flex flex-col h-screen">
    <Header class="mx-11 my-5" />
    <div class="flex flex-col justify-center flex-grow gap-10">
      <LandingText />
      <GetStartedButton @click="redirectToSignUp"/>
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