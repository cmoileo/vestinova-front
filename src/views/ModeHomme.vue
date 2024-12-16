<template>
  <div class="bg-gray-100">
    <section
      class="hero-section relative flex items-center justify-center text-white text-center py-24"
      :style="`background-image: url(${heroImage});`"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-5xl font-bold uppercase">Mode Homme</h1>
        <p class="text-lg mt-4">Découvrez notre sélection de vêtements pour homme, alliant style et confort.</p>
      </div>
    </section>

    <section class="px-4 lg:px-16 py-6">
      <button
        @click="isFilterOpen = true"
        class="sell-button text-white px-6 py-2 rounded-md transition"
      >
        Filtrer
      </button>
    </section>

    <SearchBar
      :open-externally="isFilterOpen"
      :hide-trigger="true"
      @update:items="updateItems"
      @close="isFilterOpen = false"
    />

    <section class="new-collection text-center flex-grow px-4 md:px-8 lg:px-16 py-6">
      <h2 class="text-4xl font-bold mb-8">NOUVELLE COLLECTION</h2>
      <p class="text-lg text-gray-600 mb-12">
        Notre dernière collection, où les styles classiques et contemporains se rencontrent en parfaite harmonie.
      </p>
      <div v-if="loading" class="flex gap-12">
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
      </div>
      <div v-if="!loading">
        <Item-list :items="items" />
      </div>
    </section>

    <section class="newsletter-banner bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-4">Restez Informé des Offres Exclusives</h2>
        <p class="text-lg mb-6">
          Abonnez-vous à notre newsletter pour découvrir les dernières collections, promotions et offres exclusives.
        </p>
        <form @submit.prevent="handleSubscription" class="flex justify-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Entrez votre email"
            class="w-full px-4 py-2 text-black rounded-md focus:outline-none"
            v-model="email"
            required
          />
          <button
            type="submit"
            class="bg-white text-brown font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition"
          >
            S'abonner
          </button>
        </form>
        <p v-if="isSubscribed" class="mt-4 text-green-300">Merci de vous être abonné !</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBar from "@/components/modal/Search-bar.vue";
import ItemList from "@/components/lists/ItemList.vue";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/service/api.service";
import heroImage from "@/assets/images/man-category.jpg";

const items = ref([]);
const loading = ref(true);
const isFilterOpen = ref(false);
const email = ref("");
const isSubscribed = ref(false);

const handleSubscription = () => {
  isSubscribed.value = true;
  setTimeout(() => (isSubscribed.value = false), 5000);
  email.value = "";
};

const fetchItems = async () => {
  loading.value = true;
  try {
    items.value = await apiService.getItemsByCategory("homme");
  } finally {
    loading.value = false;
  }
};

const updateItems = (newItems) => {
  items.value = newItems;
};

onMounted(fetchItems);
</script>
