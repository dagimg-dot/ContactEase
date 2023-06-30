<template>
    <div class="grid lg:grid-cols-10">
        <!-- main -->
        <div class="col-span-8 grid grid-rows-20 h-screen">
            <!-- header -->
            <div class="row-span-2 grid grid-cols-3 mx-3 mt-2 items-center">
                <!-- <SignUpButton class="items-center" /> -->
                <CompanyLogo class="mr-auto col-span-1" />
                <div class="flex border p-3 items-center rounded-3xl gap-4 mr-auto col-span-2">
                    <SearchIcon class="w-6 h-6" />
                    <input type="text" name="search" class="outline-none">
                </div>
            </div>
            <Divider />
            <!-- body -->
            <div v-if="!isCreatingContact && !isEditingContact" class="row-span-18 mt-8 ml-5 grid grid-rows-10">
                <div class="flex mr-3 mb-4 text-3xl font-extrabold text-red-800 justify-center row-span-1">
                    <span>Your Contacts</span>
                </div>
                <div class="mr-3 py-4 border-b border-gray-400 row-span-1">
                    <ul class="flex gap-48 text-gray-600 ">
                        <li>Name</li>
                        <li>Email</li>
                        <li>Phone Number</li>
                        <li>Address</li>
                        <li>Group</li>
                    </ul>
                </div>
                <!-- contact list -->
                <div class="overflow-y-auto row-span-8 h-[770px]">
                    <div v-for="i in 15" :key="i" class="flex flex-col mt-5 gap-4">
                        <!-- this will be the for loop -->
                        <SingleContact @is-editing="getBoolean" />
                    </div>
                </div>
            </div>
            <div v-else-if="isCreatingContact">
                <div class="flex w-full p-4 items-center">
                    <div class="rounded-full hover:bg-gray-200 p-2 mr-auto">
                        <BackButton @click="handleBackButton" class="flex w-10 h-10" />
                    </div>
                    <div class="mr-auto text-2xl font-bold text-red-800">
                        <span>Create New Contact</span>
                    </div>
                </div>
                <div class="grid grid-cols-3 justify-center">
                    <div class="col-span-1"></div>
                    <form class="mt-8 space-y-5 col-span-1" @submit.prevent="onSubmit">
                        <div>
                            <label class="font-medium">
                                First Name
                            </label>
                            <input type="text" required v-model="firstname" name="firstname"
                                :class="{ 'border-red-600': errors.firstname }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[0]" class=" text-red-800 px-1 text-sm">{{ errors.firstname }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Last Name
                            </label>
                            <input type="text" required v-model="lastname" name="lastname"
                                :class="{ 'border-red-600': errors.lastname }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[1]" class="text-red-800 px-1 text-sm">{{ errors.lastname }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Email
                            </label>
                            <input type="email" required v-model="email" name="email"
                                :class="{ 'border-red-600': errors.email }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[2]" class="text-red-800 px-1 text-sm">{{ errors.email }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Phone Number
                            </label>
                            <input type="text" required v-model="phoneNumber" name="phoneNumber"
                                :class="{ 'border-red-600': errors.phoneNumber }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[3]" class="text-red-800 px-1 text-sm">{{ errors.phoneNumber }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Address
                            </label>
                            <input type="text" v-model="address" name="address" required
                                :class="{ 'border-red-600': errors.address }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[4]" class="text-red-800 px-1 text-sm">{{ errors.address }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Group
                            </label>
                            <input type="text" required v-model="group" name="group"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[5]" class="text-red-800 px-1 text-sm">{{ errors.group }}</span>
                        </div>
                        <button type="submit" v-if="!processing"
                            class="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg duration-150">
                            Create Contact
                        </button>
                        <button type="submit" v-else
                            class="flex w-full justify-center items-center rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-white"
                            disabled>
                            <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span class="font-medium"> Creating... </span>
                        </button>
                    </form>
                </div>
            </div>
            <div v-else-if="isEditingContact">
                <div class="flex w-full p-4 items-center">
                    <div class="rounded-full hover:bg-gray-200 p-2 mr-auto">
                        <BackButton @click="handleBackButton" class="flex w-10 h-10" />
                    </div>
                    <div class="mr-auto text-2xl font-bold text-red-800">
                        <span>Edit Contact</span>
                    </div>
                </div>
                <div class="grid grid-cols-3 justify-center">
                    <div class="col-span-1"></div>
                    <form class="mt-8 space-y-5 col-span-1" @submit.prevent="onSubmit">
                        <div>
                            <label class="font-medium">
                                First Name
                            </label>
                            <input type="text" required v-model="firstname" name="firstname"
                                :class="{ 'border-red-600': errors.firstname }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[0]" class=" text-red-800 px-1 text-sm">{{ errors.firstname }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Last Name
                            </label>
                            <input type="text" required v-model="lastname" name="lastname"
                                :class="{ 'border-red-600': errors.lastname }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[1]" class="text-red-800 px-1 text-sm">{{ errors.lastname }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Email
                            </label>
                            <input type="email" required v-model="email" name="email"
                                :class="{ 'border-red-600': errors.email }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[2]" class="text-red-800 px-1 text-sm">{{ errors.email }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Phone Number
                            </label>
                            <input type="text" required v-model="phoneNumber" name="phoneNumber"
                                :class="{ 'border-red-600': errors.phoneNumber }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[3]" class="text-red-800 px-1 text-sm">{{ errors.phoneNumber }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Address
                            </label>
                            <input type="text" v-model="address" name="address" required
                                :class="{ 'border-red-600': errors.address }"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[4]" class="text-red-800 px-1 text-sm">{{ errors.address }}</span>
                        </div>
                        <div>
                            <label class="font-medium">
                                Group
                            </label>
                            <input type="text" required v-model="group" name="group"
                                class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                            <span v-if="!isFieldEmpty[5]" class="text-red-800 px-1 text-sm">{{ errors.group }}</span>
                        </div>
                        <button type="submit" v-if="!processing"
                            class="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg duration-150">
                            Create Contact
                        </button>
                        <button type="submit" v-else
                            class="flex w-full justify-center items-center rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-white"
                            disabled>
                            <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span class="font-medium"> Creating... </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <!-- sidebar -->
        <div class="col-span-2 flex flex-col bg-gradient-to-b from-red-600 to-red-600 h-screen justify-center items-center">
            <div class="flex px-2 py-2 border rounded-lg mb-auto gap-3">
                <!-- <img class="w-14 h-14" src="../public/profile.png" /> -->
                <div>
                    <span>{{ username }}</span>
                </div>
            </div>
            <button @click="handleCreateContact"
                class="flex mb-auto p-3 gap-4 bg-white rounded-lg font-bold text-red-600 lg:text-2xl sm:text-lg">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 0C7.16129 0 0 7.16129 0 16C0 24.8387 7.16129 32 16 32C24.8387 32 32 24.8387 32 16C32 7.16129 24.8387 0 16 0ZM25.2903 17.8065C25.2903 18.2323 24.9419 18.5806 24.5161 18.5806H18.5806V24.5161C18.5806 24.9419 18.2323 25.2903 17.8065 25.2903H14.1935C13.7677 25.2903 13.4194 24.9419 13.4194 24.5161V18.5806H7.48387C7.05806 18.5806 6.70968 18.2323 6.70968 17.8065V14.1935C6.70968 13.7677 7.05806 13.4194 7.48387 13.4194H13.4194V7.48387C13.4194 7.05806 13.7677 6.70968 14.1935 6.70968H17.8065C18.2323 6.70968 18.5806 7.05806 18.5806 7.48387V13.4194H24.5161C24.9419 13.4194 25.2903 13.7677 25.2903 14.1935V17.8065Z"
                        fill="#E44549" />
                </svg>
                <span>Create Contact</span>
            </button>
            <button>
                <!-- There are import and export buttons -->
                <!-- to be implemented later -->
            </button>
        </div>
    </div>
</template>

<script setup>

// route controller
definePageMeta({
    middleware: ["user"],
});

// imports  

import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// composables

const route = useRoute();
const { handleSubmit, errors } = useForm();

// accept route params

const { userId } = route.params;

// reactives

const username = ref('');
const processing = ref(false);
const isCreatingContact = ref(false);
const isEditingContact = ref(false);
const group = ref('');



// fetch the username using graphql using the userId 

const query = gql`
  query {
    user(where: { user_id: { _eq: "${userId}" } }) {
      username
    }
  }
`;

const { data, loading, error } = await useAsyncQuery(query);

// normal variables

const uname = data.value.user[0].username;
username.value = uname;

if (loading) {
    console.log('loading')
}

if (error) {
    console.log(error)
}

// form validation

const { value: firstname } = useField(
    'firstname',
    yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'First name must contain only alphabets')
);

const { value: lastname } = useField(
    'lastname',
    yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Last name must contain only alphabets')
);

const { value: phoneNumber } = useField(
    'phoneNumber',
    yup
        .string()
        .trim()
        .matches(/([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/, 'please enter a valid phone number')
);

const { value: email } = useField(
    'email',
    yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'please enter a valid email')
);

const { value: address } = useField(
    'address',
    yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9\s,'-]*$/, 'please enter a valid address')
);

// methods

const handleCreateContact = () => {
    isCreatingContact.value = true;
}

const handleBackButton = () => {
    isCreatingContact.value = false;
    isEditingContact.value = false;
}

const getBoolean = (value) => {
    isEditingContact.value = value;
}

const isFieldEmpty = ref([false, false, false, false, false, false, false]);

const isEmpty = (value, index) => value.value === '' ? isFieldEmpty.value[index] = true : isFieldEmpty.value[index] = false;


// Listen for changes in input values

watchEffect(() => {
    isEmpty(firstname, 0);
    isEmpty(lastname, 1);
    isEmpty(email, 2);
    isEmpty(phoneNumber, 3);
    isEmpty(address, 4);
    isEmpty(group, 5)
});

</script>

<style scoped></style>