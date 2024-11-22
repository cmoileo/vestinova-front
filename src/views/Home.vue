<template>
  <ItemList :items="items" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import apiService from "@/service/api.service";
import ItemList from "@/components/lists/ItemList.vue";

const items = ref([]);

onMounted(async () => {
  items.value = await apiService.getItems(30);
});
</script>
