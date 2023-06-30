<template>
    <div class="w-full h-screen flex flex-col items-center justify-center px-4">
        <div class="max-w-sm w-full">
            <div class=" text-gray-600">
                <div class="flex flex-col text-center items-center">
                    <CompanyLogoIcon class="scale-150" />
                    <div class="mt-5 space-y-2">
                        <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p class="">Don't have an account? <a @click="redirectToSignUp"
                                class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Sign up</a></p>
                    </div>
                </div>
                <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
                    <div>
                        <label class="font-medium">
                            Email
                        </label>
                        <input type="email" required v-model="email" name="email"
                            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                        <span v-if="!isFieldEmpty[0]" class="text-red-800 px-1 text-sm">{{ errors.email }}</span>
                    </div>
                    <div>
                        <label class="font-medium">
                            Password
                        </label>
                        <input type="password" required v-model="password" name="password"
                            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                        <span v-if="!isFieldEmpty[1]" class="text-red-800 px-1 text-sm">{{ errors.password }}</span>
                    </div>
                    <div v-if="showDialog" class="w-full border-2 border-red-400 flex rounded-lg px-4 py-2 justify-between">
                        <span>Incorrect email or password.</span>
                        <div>
                            <CloseIcon class="cursor-pointer" @click="closeDialog" />
                        </div>
                    </div>
                    <button type="submit" v-if="!processing"
                        class="w-full px-4 py-2 my-8 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg duration-150">Login
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
                        <span class="font-medium"> Logging in... </span>
                    </button>
                    <!-- <MyModalPreview :showModal="showModal" /> -->
                    <!-- <div class="text-center">
                            <a class="hover:text-red-600">Forgot password?</a>
                        </div> -->
                </form>
            </div>
        </div>
    </div>
</template>
  
<script setup>

// imports 

import { useModal } from 'vue-final-modal'
import Modal from '../modals/Modal.vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

// reactives

const isFieldEmpty = ref([false, false]);
const processing = ref(false);
const showDialog = ref(false);

// composables

const router = useRouter();
const { handleSubmit, errors } = useForm();

// modal

const { open } = useModal({
    component: Modal,
    attrs: {
        title: 'Error',
    },
    slots: {
        default: '<p>Server timed out !</p>',
    },

});

// client side validation

const { value: email } = useField(
    'email',
    yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'please enter a valid email')
);

const { value: password } = useField(
    'password',
    yup.string()
        .trim()
        .min(8, 'password must be at least 8 characters')
);

// methods

const isEmpty = (value, index) => value.value === '' ? isFieldEmpty.value[index] = true : isFieldEmpty.value[index] = false;

watchEffect(() => {
    isEmpty(email, 0);
    isEmpty(password, 1);
});

const redirectToSignUp = () => {
    router.push('/signup');
};

const closeDialog = () => {
    showDialog.value = false;
};

const openModal = () => {
    open();
};

const onSubmit = handleSubmit((values) => {
    console.log(values);
    processing.value = true;
    showDialog.value = false;
    login();
});

const login = () => {
    console.log('Email:', email.value);
    console.log('Password:', password.value);

    // make api call to express server
    fetch('http://localhost:2001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value, password: password.value })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // redirect to contacts dynamic route
                router.push(`/contacts/${data.accessToken}`);
                // generate a jwt token for hasura and store it in session storage
                sessionStorage.setItem('token', data.accessToken);
            } else {
                // show error message
                showDialog.value = true;
                processing.value = false;
            }

        })
        .catch(() => {
            processing.value = false;
            openModal();
        });
};

</script>
  
<style scoped></style>
  