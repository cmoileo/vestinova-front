<template>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-4xl font-bold mb-6 text-center">Mode Homme</h1>
  
      <div v-if="loading" class="text-center">
        <p>Chargement des articles...</p>
      </div>
  
      <div v-else-if="error" class="text-center text-red-600">
        <p>{{ error }}</p>
      </div>
  
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="item in items" :key="item.id" class="product-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img :src="item.imageUrl" alt="item.name" class="w-full h-60 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold truncate">{{ item.name }}</h3>
              <p class="text-sm text-gray-500 truncate">{{ item.category }}</p>
              <p class="text-lg font-bold mt-2">€ {{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import apiService from "@/service/api.service";
  
  const items = ref<any[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  
  const fetchItems = async () => {
    try {
      items.value = await apiService.getItemsByCategory("homme");
    } catch (err: any) {
      error.value = err.message || "Erreur lors de la récupération des articles.";
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchItems);
  </script>
  