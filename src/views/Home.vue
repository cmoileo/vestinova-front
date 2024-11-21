<template>
  <h1>TEST</h1>
</template>

<script setup lang="ts">
import apiService from "@/service/api.service";
import { onMounted } from "vue";

onMounted(async () => {
  const items = await apiService.getItems(20);
  console.log(items);
});
</script>
