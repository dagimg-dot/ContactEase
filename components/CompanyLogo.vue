<template>
    <div class="wrapper flex items-center gap-3" @click="redirectToHomePage">
        <CompanyLogoIcon />
        <div class="text-red-700 text-[30px] font-bold">Contact Ease</div>
    </div>
</template>

<script setup>
    const router = useRouter();
    const redirectToHomePage = () => {
        router.push("/");
    };

</script>

<style scoped>
.wrapper {
    cursor: pointer;
}
</style>