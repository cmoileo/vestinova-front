<script setup lang="ts">
import { onMounted } from "vue";
import { cookieManager } from "@/service/cookie.service";
import router from "@/router";
import { useCategoryStore } from "@/stores/category";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

const apiResponseStore = useCategoryStore();

onMounted(async () => {
  if (!cookieManager.getCookie("token")) {
    await router.push("/login");
  } else {
    await router.push("/home")
    await apiResponseStore.fetchData();
  }
});
</script>

<template>
  <Header />
  <div class="md:mx-16 mx-8 h-screen">
    <main class="h-[90%] py-4 pb-8 px-4 flex flex-col gap-8">
      <RouterView />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
