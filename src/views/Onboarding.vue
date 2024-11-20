<template>
  <div class="max-md:flex-col flex w-full h-screen items-center gap-24">
    <div class="max-md:w-full max-md:h-1/2 w-1/2 h-full">
      <img class="object-cover h-full w-full" src="../assets/images/onboardingImage.jpg" alt="People selling their unused clothes">
    </div>
    <div class="max-md:items-center flex flex-col gap-16">
      <h1 class="max-md:text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:w-3/4">
        Sell your unused clothes with Vestinova.
      </h1>
      <div class="flex gap-8 w-1/2">
        <router-link class="w-full" to="/login">
          <Button class="w-full">Login</Button>
        </router-link>
        <router-link class="w-full" to="/register">
          <Button variant="secondary" class="w-full">Register</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Button} from "@/components/ui/button";
</script>
