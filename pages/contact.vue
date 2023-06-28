<template>
    <div class="flex">
        <!-- main -->
        <div class="w-[80%]">
            <!-- header -->
            <div class="flex m-3 ml-5 justify-between">
                <div class="flex px-2 py-2 border rounded-lg items-center gap-3">
                    <img class="w-14 h-14" src="../public/profile.png" />
                    <div class="">
                        <span>Dagim Gizachew</span>
                    </div>
                </div>
                <div class="search-wrapper flex justify-end border p-3 items-center rounded-lg gap-4">
                    <SearchIcon class="w-6 h-6" />
                    <input type="text" name="search" class="outline-none">
                </div>
                <SignUpButton class="items-center" />
            </div>
            <!-- body -->
            <div class="flex flex-col mt-8 ml-5">
                <div class="mr-3 py-4 border-b border-gray-400">
                    <ul class="flex gap-48 text-gray-600 ml-3">
                        <li>Name</li>
                        <li>Email</li>
                        <li>Phone Number</li>
                        <li>Address</li>
                        <li>Group</li>
                    </ul>
                </div>
                <!-- contact list -->
                <div class="max-h-screen overflow-y-auto">
                    <div v-for="i in 15" :key="i" class="flex flex-col mt-5 gap-4">
                        <!-- this will be the for loop -->
                        <SingleContact />
                    </div>
                </div>
            </div>
        </div>
        <!-- sidebar -->
        <div class="flex flex-col bg-gradient-to-b from-red-600 to-red-600  w-[20%] justify-center items-center">
            <button class="flex items-center p-3 gap-4 bg-white rounded-lg font-bold text-red-600 text-2xl">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 0C7.16129 0 0 7.16129 0 16C0 24.8387 7.16129 32 16 32C24.8387 32 32 24.8387 32 16C32 7.16129 24.8387 0 16 0ZM25.2903 17.8065C25.2903 18.2323 24.9419 18.5806 24.5161 18.5806H18.5806V24.5161C18.5806 24.9419 18.2323 25.2903 17.8065 25.2903H14.1935C13.7677 25.2903 13.4194 24.9419 13.4194 24.5161V18.5806H7.48387C7.05806 18.5806 6.70968 18.2323 6.70968 17.8065V14.1935C6.70968 13.7677 7.05806 13.4194 7.48387 13.4194H13.4194V7.48387C13.4194 7.05806 13.7677 6.70968 14.1935 6.70968H17.8065C18.2323 6.70968 18.5806 7.05806 18.5806 7.48387V13.4194H24.5161C24.9419 13.4194 25.2903 13.7677 25.2903 14.1935V17.8065Z"
                        fill="#E44549" />
                </svg>
                <span>Create Contact</span>
            </button>
            <button>
                <!-- hello -->
            </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>