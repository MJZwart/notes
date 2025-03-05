<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submitLogin">
            <SimpleInput
                id="username"
                v-model="login.username"
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
            />
            <SimpleInput
                id="password"
                v-model="login.password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
            />
            <SubmitButton id="login-button" block>Login</SubmitButton>
            <BaseFormError name="error" />
        </form>
        <!-- <span class="d-flex">
            <router-link class="ml-auto mt-1 clear-link" to="/forgot-password">Forgot password?</router-link>
        </span> -->
        
        <hr />
        
        <div flex flex-col>
            No account?
            <router-link to="/register" decoration-none>
                <button block items-center mt-3>
                    Register
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {router} from '../main';
import axios from 'axios';

const login = ref({
    username: '',
    password: '',
});

async function submitLogin() {
    const {data} = await axios.post('/login', login.value);
    if (!data.user) router.push('/error'); //TODO Throw error that user is not set correctly
    // setUser(data.user)
    router.push('/');
}
</script>