<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-1/3 bg-white shadow p-6 rounded">
        <h2 class="text-2xl mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">email</label>
            <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required>
          </div>
          <div class="flex items-center justify-end mb-4">
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
          <div class="flex items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
          </div>
          <div class="flex items-center justify-center mt-4">
            <p class="text-sm text-gray-600">Don't have an account? <a class="text-blue-500 hover:text-blue-800" href="#">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>

  const router = useRouter();
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    // Perform login logic here
    console.log('Email:', email.value);
    console.log('Password:', password.value);

    // // Clear the form
    // username.value = '';
    // password.value = '';

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
      if(data.success) {
        // redirect to dashboard
        router.push('/about')
      } else {
        // show error message
        alert("Invalid credentials");
      }

    })
    .catch(err => console.log(err));    
  };

  </script>
  
  <style>
  </style>
  