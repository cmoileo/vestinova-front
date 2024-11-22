<script setup lang="ts">
import { onMounted } from "vue";
import { cookieManager } from "@/service/cookie.service";
import router from "@/router";
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import { useCategoryStore } from "@/stores/category";

const baseIconStyle = "opacity-50 transition hover:opacity-100 cursor-pointer";

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
  <div class="md:mx-16 mx-8 h-screen py-4">
    <main class="h-[90%] overflow-y-auto no-scrollbar pb-8 px-4">
      <RouterView />
    </main>
    <footer class="w-fit mx-auto md:px-12 md:py-4 px-8 py-2 rounded-full bg-white z-10">
      <ul class="flex md:gap-16 gap-8 items-center">
        <router-link to="/">
          <li :class="baseIconStyle">
            <v-icon scale="1.5" name="co-home" />
          </li>
        </router-link>
        <create-item-modal :categories="apiResponseStore.data" />
        <router-link to="/profile">
          <li :class="baseIconStyle">
            <v-icon scale="1.5" name="co-user" />
          </li>
        </router-link>
      </ul>
    </footer>
  </div>
</template>
