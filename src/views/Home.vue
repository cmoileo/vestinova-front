<script setup lang="ts">
import { ref, onMounted } from "vue";
import apiService from "@/service/api.service";
import ItemList from "@/components/lists/ItemList.vue";
import SearchBar from "@/components/modal/Search-bar.vue";

const items = ref([]);

onMounted(async () => {
  const searchQuery = window.location.search;
  if (searchQuery) {
    items.value = await apiService.searchItems(searchQuery);
    return;
  } else {
    items.value = await apiService.getItems(100);
  }
});

const updateItems = (newItems) => {
  items.value = newItems;
};
</script>

<template>
  <SearchBar :items="items" @update:items="updateItems" />
  <div class="h-[90%] py-4 overflow-y-auto no-scrollbar pb-8 px-4">
    <ItemList :items="items" />
  </div>
</template>
