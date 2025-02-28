<template>
  <Header />
  <Banner />
  <Lists v-if="isApiKeySet" />
  <SetApiKey v-else />
  <Footer />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import Banner from './components/Banner.vue';
import Header from './components/Header.vue';
import Lists from './components/Lists.vue';
import SetApiKey from './components/SetApiKey.vue';
import {fetchLoggedInUser, isApiKeySet, setNotificationPermission} from './services/apiService';
import Footer from './components/Footer.vue';

onMounted(async () => {
  await fetchLoggedInUser();
  setNotificationPermission();
});

onBeforeUnmount(() => {
  // clearChainCheckInterval();
})
</script>