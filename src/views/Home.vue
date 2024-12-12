<script setup lang="ts"> 
import { ref, onMounted } from "vue";
import manCategoryImage from '@/assets/images/man-category.jpg';
import womanCategoryImage from '@/assets/images/woman-category.jpg';
import kidsCategoryImage from '@/assets/images/kids-category.jpg';
import bannerImage from '@/assets/images/banner-3.jpg';
import bannerImage2 from '@/assets/images/banner-5.jpg';
import { useItemsStore } from "@/stores/item";
import ItemList from "@/components/lists/ItemList.vue";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/service/api.service";

const itemsStore = useItemsStore();
const likedProducts = ref([]);
const loadingLikedProducts = ref(true);

const categories = ref([
  { id: 1, name: 'Homme', image: manCategoryImage },
  { id: 2, name: 'Femme', image: womanCategoryImage },
  { id: 3, name: 'Enfant', image: kidsCategoryImage },
]);

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

onMounted(async () => {
  const searchQuery = window.location.search;
  if (searchQuery) {
    await itemsStore.searchItems(searchQuery);
    return;
  } else {
    await itemsStore.fetchData();
  }
});
</script>

<template>
  <main class="w-full">
    <section class="hero-section relative flex items-center justify-center text-white" :style="`background-image: url(${bannerImage});`">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="container mx-auto flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="text-[10vw] font-extrabold tracking-tight leading-none uppercase drop-shadow-lg">Vestinova</h1>
        <p class="text-xl mt-4 max-w-3xl drop-shadow-lg">
          Découvrez la nouvelle manière de consommer la mode. <br />
          Achetez, vendez et donnez une seconde vie à vos vêtements tout en économisant jusqu'à 80% par rapport aux prix en magasin.
        </p>
        <button class="mt-6 py-3 px-8 border border-white text-white font-semibold rounded-md transition-all">Vendre</button>
        <button class="mt-3 py-3 px-8 sell-button font-semibold rounded-md transition-all">Explorer les collections →</button>
      </div>
    </section>

    <section class="liked-products py-16 bg-gray-100">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-4xl font-bold">Vos produits favoris</h2>
        </div>
        <div v-if="loadingLikedProducts" class="flex gap-6">
          <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
          <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
          <Skeleton class="w-[100%] h-80 rounded-xl" style="background: grey" />
        </div>
        <div v-else-if="likedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in likedProducts"
            :key="product.id"
            class="product-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              :src="product.imageUrl || '/placeholder.jpg'"
              :alt="product.name"
              class="w-full h-60 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold truncate">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 truncate">
                {{ product.categories?.map(c => c.name).join(", ") || "Sans catégorie" }}
              </p>
              <p class="text-lg font-bold mt-2">€ {{ product.price }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-600">
          Vous n'avez pas encore liké de produits.
        </div>
      </div>
    </section>

    <section class="new-collection py-16 text-center">
      <h2 class="text-4xl font-bold mb-8">NOUVELLE COLLECTION</h2>
      <p class="text-lg text-gray-600 mb-12">
        Notre dernière collection, où les styles classiques et contemporains se rencontrent en parfaite harmonie.
      </p>
      <div v-if="itemsStore.loading" class="flex gap-12">
        <Skeleton class="w-[100%] h-80 rounded-xl " style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl " style="background: grey" />
        <Skeleton class="w-[100%] h-80 rounded-xl " style="background: grey" />
      </div>
      <div v-if="!itemsStore.loading">
        <Item-list :items="itemsStore.data" />
      </div>
    </section>

    <section
      class="wear-to-wedding relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center text-white"
      :style="`background-image: url(${bannerImage2})`"
    >
      <div class="wear-content bg-black bg-opacity-50 p-8 rounded-md text-center">
        <h2 class="wear-title text-4xl font-bold mb-4">Vestinova</h2>
        <p class="text-xl mb-6">
          L'application de seconde main pour acheter et revendre des affaires pour toute la famille. <br />
          Jusqu'à 80% moins chers qu'en magasin.
        </p>
        <button class="wear-button bg-white text-black py-3 px-6 rounded-md hover:bg-gray-300 transition-all">
          Voir Détails
        </button>
      </div>
    </section>

    <section class="category-section py-16 flex flex-wrap gap-8 justify-center">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-card w-full sm:w-[30%] relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2"
      >
        <img :src="category.image" :alt="category.name" class="w-full h-[350px] object-cover" />
        <div class="category-content absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-center text-white">
          <h3 class="text-2xl font-bold">{{ category.name }}</h3>
          <button
            class="category-button mt-4 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-300 transition-all"
          >
            Voir Détails
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
