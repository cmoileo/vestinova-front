<script setup lang="ts">
import { onMounted } from "vue";
import { cookieManager } from "@/service/cookie.service";
import router from "@/router";
import { useCategoryStore } from "@/stores/category";
import Header from "@/components/Header.vue";
import {useItemsStore} from "@/stores/item";
import {useCartStore} from "@/stores/cart";

const apiResponseStore = useCategoryStore();
const itemsStore = useItemsStore();
const cartStore = useCartStore();

onMounted(async () => {
  if (!cookieManager.getCookie("token")) {
    await router.push("/login");
  } else {
    await router.push("/home")
    await apiResponseStore.fetchData();
    await itemsStore.getMaxPagesCount()
    await cartStore.fetchCart()
  }
});
</script>

<template>
  <Header />
  <div class="md:mx-16 mx-8 h-screen">
    <main class="py-4 pb-8 px-4 flex flex-col gap-8">
      <RouterView />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
