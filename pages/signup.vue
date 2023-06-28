<template>
    <main class="w-full flex flex-col items-center justify-center px-4 h-screen">
        <div class="sign-up-form">
            <div class="max-w-sm w-full text-gray-600">
                <div class="flex flex-col text-center items-center">
                    <CompanyLogoIcon class="scale-150" />
                    <div class="mt-5 space-y-2">
                        <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up for an account</h3>
                        <p class="">Already have an account? <a @click="redirectToLogin"
                                class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Log in</a></p>
                    </div>
                </div>
                <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
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
                            User Name
                        </label>
                        <input type="text" required v-model="username" name="username"
                            :class="{ 'border-red-600': errors.username }"
                            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                        <span v-if="!isFieldEmpty[3]" class="text-red-800 px-1 text-sm">{{ errors.username }}</span>
                    </div>
                    <div>
                        <label class="font-medium">
                            Password
                        </label>
                        <input type="text" v-model="password" name="password" required 
                            :class="{ 'border-red-600': errors.password }"
                            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                        <span v-if="!isFieldEmpty[4]" class="text-red-800 px-1 text-sm">{{ errors.password }}</span>
                    </div>
                    <div>
                        <label class="font-medium">
                            Confirm Password
                        </label>
                        <input type="text" required v-model="confirmPassword" name="confirmPassword" 
                            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg" />
                        <span v-if="!isFieldEmpty[5]" class="text-red-800 px-1 text-sm">{{ errorPassword }}</span>
                    </div>
                    <button type="submit" v-if="!processing"
                        class="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg duration-150">
                        Sign up
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
                        <span class="font-medium"> Signing up... </span>
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>

<script setup>

// routing to login page
const router = useRouter();
const redirectToLogin = () => {
    router.push('/login');
}

// form validation
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const { handleSubmit, errors } = useForm();

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

const { value: email } = useField(
    'email',
    yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'please enter a valid email')
);

const { value: username } = useField(
    'username',
    yup
        .string()
        .trim()
        .min(5, 'username must be at least 5 characters')
        .matches(/^[a-zA-Z]+$/, 'Username must contain only alphabet')
)

const { value: password } = useField(
    'password',
    yup
        .string()
        .trim()
        .min(8, 'password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'password must contain at least one uppercase letter, one lowercase letter and one number')
)

const confirmPassword = ref('');

const errorPassword = ref('');


const isFieldEmpty = ref([false, false, false, false, false, false]);

const isEmpty = (value, index) => value.value === '' ? isFieldEmpty.value[index] = true : isFieldEmpty.value[index] = false;

const doesMatch = (value1, value2) => value1.value === '' || value2.value === '' ? errorPassword.value = '' : errorPassword.value = 'passwords must match';

// Listen for changes in input values
watchEffect(() => {
    isEmpty(firstname, 0);
    isEmpty(lastname, 1);
    isEmpty(email, 2);
    isEmpty(username, 3);
    isEmpty(password, 4);
    isEmpty(confirmPassword, 5);
    doesMatch(password, confirmPassword)
});

// authentication statuses
const processing = ref(false);

const onSubmit = handleSubmit((values) => {
    if(errorPassword.value !== '') {
        return;
    }
    console.log(values);
    processing.value = true;
    console.log('clicked');
    signup();
});

const signup = () => {
    console.log('First Name: ', firstname.value);
    console.log('Last Name: ', lastname.value);
    console.log('Email: ', email.value);
    console.log('User Name: ', username.value);
    console.log('Password:', password.value);
    console.log('Confirm Password: ', confirmPassword.value);

    fetch('http://localhost:2001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.user_id) {
                console.log("User created successfully");
                alert("User created successfully");
                // router.push('/login');
            } else {
                console.log("User creation failed");
                alert("User creation failed");
            }
        })
        .catch(err => {
            console.log(err);
        })
}

</script>

<style scoped></style>