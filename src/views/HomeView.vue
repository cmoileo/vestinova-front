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
  <div>
    <main>
      <RouterView />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
