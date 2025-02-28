<template>
    <AuthBase>
        <h2>{{ $t('register') }}</h2>

        <div v-if="guestAccount" class="mb-3 guest-account-warning">
            <Icon icon="fa6-solid:circle-exclamation" class="warning-icon small" /> 
            {{ $t('already-have-guest-account-register-warning') }}
        </div>

        <form @submit.prevent="submitRegister">
            <div class="form-group">
                <label for="username">{{ $t('username') }}</label>
                <span class="d-flex flex-row">
                    <input
                        id="username" 
                        v-model="register.username" 
                        type="text" 
                        name="username"
                        :placeholder="$t('username')" 
                        :class="{ invalid: hasError('username') }"
                    />
                    <Tooltip :text="$t('random-name')" class="dice-button">
                        <Icon icon="fa-solid:dice" @click="generateRandomName" />
                    </Tooltip>
                </span>
                <BaseFormError name="username" />
            </div>
            <SimpleInput 
                id="email" 
                v-model="register.email"
                type="text" 
                name="email" 
                :label="$t('email')"
                :placeholder="$t('email')"  />
            <SimpleInput 
                id="password"  
                v-model="register.password"
                type="password" 
                name="password" 
                :label="$t('password')"
                :placeholder="$t('password')" />
            <SimpleInput 
                id="password_confirmation" 
                v-model="register.password_confirmation" 
                type="password" 
                name="password_confirmation" 
                :label="$t('repeat-password')"
                :placeholder="$t('repeat-password')" />
            <div class="form-group">
                <SimpleCheckbox 
                    id="agree_to_tos" 
                    v-model="register.agree_to_tos" 
                    name="agree_to_tos" />
                <label for="agree_to_tos" class="pointer" @click="register.agree_to_tos = !register.agree_to_tos">
                    {{$t('agree-to-tos-pre')}}
                    <router-link to="/tos" target="_blank">{{$t('tos')}}</router-link>
                </label>
                <BaseFormError name="agree_to_tos" />
            </div>
            <SubmitButton block>{{ $t('register-new-account') }}</SubmitButton>
        </form> 

        <hr />
    
        <div class="d-flex flex-col">
            {{ $t('already-an-account-prompt') }}
            <router-link to="/login" class="text-decoration-none">
                <button class="block center mt-3">
                    {{ $t('login') }}
                </button>
            </router-link>
            <h3 class="center mt-3">- {{ $t('or') }} -</h3>
            <router-link v-if="!guestAccount" to="/guest-account"  class="text-decoration-none">
                <button class="block center mt-3">
                    {{ $t('create-guest-account') }}
                </button>
            </router-link>
            <button v-else class="block center mt-3" @click="continueGuestAccount()">
                {{ $t('continue-guest-account') }}
            </button>
        </div>
    </AuthBase>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Register} from 'resources/types/user';
import {currentLang} from '/js/services/languageService';
import {clearErrors, hasError} from '/js/services/errorService';
import AuthBase from './components/AuthBase.vue';
import {Icon} from '@iconify/vue';
import {getRandomUsername} from '/js/helpers/randomNames';
import { continueGuestAccount, setUser } from '/js/services/userService';
import axios from 'axios';
import router from '/js/router/router';

const register = ref<Register>({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    agree_to_tos: false,
    language: currentLang.value,
});
async function submitRegister() {
    clearErrors();

    const {data} = await axios.post('/register', register.value);
    setUser(data.data.user);
    router.push('/dashboard');
}

const guestAccount = ref(false);

onMounted(() => {
    const localToken = localStorage.getItem('guestToken');
    guestAccount.value = !!localToken;
});

function generateRandomName() {
    register.value.username = getRandomUsername();
}
</script>

<style lang="scss" scoped>
.guest-account-warning {
    background-color: var(--button);
    padding: 0.75rem;
    border-radius: 0.5rem;
}
</style>