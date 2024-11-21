<script setup lang="ts">
import { RouterView } from 'vue-router'
import {cookieManager} from "@/service/cookie.service";
import router from "@/router";

if (!cookieManager.getCookie('token')) {
  router.push('/login')
}

const baseIconStyle = "opacity-50 transition hover:opacity-100 cursor-pointer"
</script>

<template>
  <div class="md:mx-16 mx-8 h-screen py-4">
    <main class="h-[90%]">
      <RouterView />
    </main>
    <footer class="w-fit mx-auto md:px-12 md:py-4 px-8 py-2 rounded-full bg-white">
      <ul class="flex md:gap-16 gap-8 items-center">
        <router-link to="/">
          <li :class="baseIconStyle">
            <v-icon scale="1.5" name="co-home" />
          </li>
        </router-link>
        <li class="bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">
          <v-icon scale="1.5" color="white" name="px-plus" />
        </li>
        <router-link to="/profile">
          <li :class="baseIconStyle">
            <v-icon scale="1.5" name="co-user" />
          </li>
        </router-link>
      </ul>
    </footer>
  </div>
</template>
