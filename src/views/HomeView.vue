<script setup lang="ts">
import { RouterView } from 'vue-router'
import {cookieManager} from "@/service/cookie.service";
import router from "@/router";

if (!cookieManager.getCookie('token')) {
  router.push('/login')
}

</script>

<template>
  <header>
  </header>
  <RouterView />
</template>
