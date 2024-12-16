<template>
  <div class="liked-products-page">
    <section
      class="hero-section relative flex items-center justify-center text-white text-center py-24"
      :style="`background-image: url(${heroImage});`"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-5xl font-bold uppercase">Vos Produits Favoris</h1>
        <p class="text-lg mt-4">
          Explorez vos articles préférés et trouvez votre style parfait.
        </p>
      </div>
    </section>

    <div class="container mx-auto py-16">
      <h1 class="text-4xl font-bold mb-8 text-center">Vos Produits Favoris</h1>

      <div v-if="loadingLikedProducts" class="flex gap-6">
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
      </div>

      <div v-else-if="likedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <ItemCard v-for="product in likedProducts" :key="product.id" :item="product" />
      </div>

      <div v-else class="text-center text-gray-600">
        <p class="text-lg">Vous n'avez pas encore liké de produits.</p>
      </div>
    </div>

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
import { useRouter } from "vue-router";
import apiService from "@/service/api.service";
import { Skeleton } from "@/components/ui/skeleton";
import ItemCard from "@/components/cards/ItemCard.vue";
const email = ref("");
const isSubscribed = ref(false);
import heroImage from "@/assets/images/banner-6.jpg";

const likedProducts = ref([]);
const loadingLikedProducts = ref(true);
const router = useRouter();

const handleSubscription = () => {
  isSubscribed.value = true;
  setTimeout(() => (isSubscribed.value = false), 5000);
  email.value = "";
};

const fetchLikedProducts = async () => {
  try {
    loadingLikedProducts.value = true;
    likedProducts.value = await apiService.getLikedItems();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits aimés :", error);
  } finally {
    loadingLikedProducts.value = false;
  }
};

onMounted(async () => {
  await fetchLikedProducts();
});
</script>
