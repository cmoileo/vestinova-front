<template>
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
</template>

<script setup lang="ts">
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import {onMounted} from "vue";
const baseIconStyle = "opacity-50 transition hover:opacity-100 cursor-pointer";
import { useCategoryStore } from "@/stores/category";

const apiResponseStore = useCategoryStore();

onMounted(() => {
  apiResponseStore.fetchData();
});
</script>
