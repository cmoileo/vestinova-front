<script setup lang="ts">
import { RouterView } from 'vue-router'
import {cookieManager} from "@/service/cookie.service";
import router from "@/router";
import {Button} from "@/components/ui/button";

if (!cookieManager.getCookie('token')) {
  router.push('/login')
}

const baseIconStyle = "opacity-50 transition hover:opacity-100 cursor-pointer"
</script>

<template>
  <div class="mx-16 h-screen">
    <main class="h-[90%]">
      <RouterView />
    </main>
    <footer class="w-fit mx-auto">
      <ul class="flex gap-16 items-center">
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
