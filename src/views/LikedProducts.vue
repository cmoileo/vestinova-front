<template>
    <div class="liked-products-page container mx-auto py-16">
      <h1 class="text-4xl font-bold mb-8">Tous vos produits favoris</h1>
      <div v-if="loadingLikedProducts" class="flex gap-6">
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
      </div>
      <div v-else-if="likedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in likedProducts"
          :key="product.id"
          class="product-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          @click="goToProduct(product.id)"
        >
          <img :src="product.imageUrl" :alt="product.name" class="w-full h-60 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold truncate">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 truncate">{{ product.category }}</p>
            <p class="text-lg font-bold mt-2">€ {{ product.price }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        Vous n'avez pas encore liké de produits.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import apiService from '@/service/api.service';
  
  const likedProducts = ref([]);
  const loadingLikedProducts = ref(true);
  const router = useRouter();
  
  const fetchLikedProducts = async () => {
    try {
      loadingLikedProducts.value = true;
      likedProducts.value = await apiService.getLikedItems();
    } catch (error) {
      console.error('Erreur lors de la récupération des produits aimés :', error);
    } finally {
      loadingLikedProducts.value = false;
    }
  };
  
  const goToProduct = (productId: string) => {
    router.push({ name: 'item', params: { id: productId } });
  };
  
  onMounted(async () => {
    await fetchLikedProducts();
  });
  </script>
  