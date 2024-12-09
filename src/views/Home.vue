<script setup lang="ts">
import { ref, onMounted } from "vue";
import manCategoryImage from '@/assets/images/man-category.jpg';
import womanCategoryImage from '@/assets/images/woman-category.jpg';
import kidsCategoryImage from '@/assets/images/kids-category.jpg';
import bannerImage from '@/assets/images/banner-3.jpg';
import bannerImage2 from '@/assets/images/banner-4.jpg';
import { useItemsStore} from "@/stores/item";

const itemsStore = useItemsStore();

const categories = ref([
  { id: 1, name: 'Homme', image: manCategoryImage },
  { id: 2, name: 'Femme', image: womanCategoryImage },
  { id: 3, name: 'Enfant', image: kidsCategoryImage },
]);

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
    <section class="hero-section relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
    :style="`background-image: url(${bannerImage})`">
      <div class="hero-content bg-black bg-opacity-50 p-8 rounded-md text-center">
        <h1 class="text-5xl font-bold mb-4">Vestinova SPRING COLLECTION</h1>
        <p class="text-xl mb-6">Découvrez notre meilleure collection de printemps. Proposant nos meilleurs produits dans une collection unique.</p>
        <button class="hero-button bg-white text-black py-3 px-6 rounded-md hover:bg-gray-300 transition-all">
          Acheter Maintenant
        </button>
      </div>
    </section>

    <section class="new-collection py-16 text-center">
      <h2 class="text-4xl font-bold mb-8">NOUVELLE COLLECTION</h2>
      <p class="text-lg text-gray-600 mb-12">Notre dernière collection, où les styles classiques et contemporains se rencontrent en parfaite harmonie.</p>
      <div class="collection-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in itemsStore.data" :key="item.id" class="collection-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2">
          <img :src="item.image" :alt="item.name" class="collection-image w-full h-64 object-cover rounded-md mb-4"/>
          <div class="collection-info">
            <h3 class="collection-title text-2xl font-bold">{{ item.name }}</h3>
            <p class="collection-price text-xl text-gray-600">{{ item.price }}€</p>
          </div>
        </div>
      </div>
    </section>

    <section class="wear-to-wedding relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center text-white"
            :style="`background-image: url(${bannerImage2})`">
      <div class="wear-content bg-black bg-opacity-50 p-8 rounded-md text-center">
        <h2 class="wear-title text-4xl font-bold mb-4">Vestinova</h2>
        <p class="text-xl mb-6">L'application de seconde main pour acheter et revendre des affaires pour toute la famille. <br> Jusqu'à 80% moins chers qu'en magasin.</p>
        <button class="wear-button bg-white text-black py-3 px-6 rounded-md hover:bg-gray-300 transition-all">
          Voir Détails
        </button>
      </div>
    </section>

    <section class="category-section py-16 flex flex-wrap gap-8 justify-center">
      <div v-for="category in categories" :key="category.id" class="category-card w-full sm:w-[30%] relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2">
        <img :src="category.image" :alt="category.name" class="w-full h-[350px] object-cover"/>
        <div class="category-content absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-center text-white">
          <h3 class="text-2xl font-bold">{{ category.name }}</h3>
          <button class="category-button mt-4 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-300 transition-all">
            Voir Détails
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
