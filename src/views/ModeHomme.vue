<template>
  <div class="bg-gray-100">
    <section class="hero-section relative flex items-center justify-center text-white text-center py-24" :style="`background-image: url(${heroImage});`">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-5xl font-bold uppercase">Mode Homme</h1>
        <p class="text-lg mt-4">Découvrez notre sélection de vêtements pour homme, alliant style et confort.</p>
      </div>
    </section>

    <div class="container mx-auto mt-8 flex justify-end">
      <button
        class="bg-accent text-black px-6 py-2 rounded-md hover:bg-accent-hover transition"
        @click="toggleFilterModal"
      >
        Filtrer
      </button>
    </div>

    <search-bar v-if="isFilterModalOpen" @update:items="updateItems" @close="closeFilterModal" />

    <section class="container mx-auto py-12 px-4">
      <h2 class="text-3xl font-bold mb-6 text-center">Nos Produits</h2>
      <div v-if="loading" class="text-center">
        <p>Chargement des articles...</p>
      </div>
      <div v-else-if="error" class="text-red-600 text-center">
        <p>{{ error }}</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img :src="item.imageUrl" :alt="item.name" class="w-full h-60 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold truncate">{{ item.name }}</h3>
            <p class="text-gray-500 text-sm">{{ item.category }}</p>
            <p class="text-primary font-bold mt-2">€ {{ item.price }}</p>
            <button class="mt-4 w-full bg-accent text-white py-2 rounded-md hover:bg-accent-hover transition">
              Voir le produit
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="promotion-banner bg-accent text-white text-center py-12">
      <div class="container mx-auto">
        <h2 class="text-4xl font-bold">Offre Spéciale</h2>
        <p class="text-lg mt-2">Jusqu'à <span class="font-bold">50% de réduction</span> sur notre collection d'hiver !</p>
        <button class="mt-6 px-8 py-3 bg-white text-accent font-semibold rounded-md hover:bg-gray-200 transition">
          Découvrir les offres
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBar from "@/components/modal/Search-bar.vue";
import apiService from "@/service/api.service";
import heroImage from "@/assets/images/man-category.jpg";

const items = ref<any[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const isFilterModalOpen = ref(false);

const toggleFilterModal = () => {
  isFilterModalOpen.value = true;
};

const closeFilterModal = () => {
  isFilterModalOpen.value = false;
};

const fetchItems = async () => {
  loading.value = true;
  error.value = null;
  try {
    const results = await apiService.getItemsByCategory("homme");
    items.value = results;
  } catch (err) {
    error.value = "Erreur lors de la récupération des articles.";
  } finally {
    loading.value = false;
  }
};

const updateItems = (filteredItems) => {
  items.value = filteredItems;
};

onMounted(fetchItems);
</script>

<style>
.hero-section {
  background-size: cover;
  background-position: center;
  position: relative;
  height: 80vh;
}

.promotion-banner {
  background-image: linear-gradient(to right, #6a11cb, #2575fc);
}
</style>
