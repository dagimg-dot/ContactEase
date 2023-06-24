<template>
    <button
        class="px-[26px] py-[10px] bg-gradient-to-r from-red-700 to-red-600 rounded-lg shadow shadow-inner justify-start items-start gap-[10px] inline-flex text-white text-[20px] font-semibold shadow-md hover:bg-red-800 hover:from-red-800 hover:to-red-700"
        @click="redirect">
        Sign In
    </button>
</template>

<script setup>
const router = useRouter();

const redirect = () => {
    // To be implemented later
    // if (localStorage.getItem("token")) {
    //     console.log("token exists");
    //     router.push("/about");
    // } else {
    //     router.push("/login");
    // }

    // for now
    router.push("/login");
};

</script>

<style scoped></style>