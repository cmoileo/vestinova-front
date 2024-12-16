<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import apiService from '@/service/api.service';
import type { ItemType } from '@/type/Item.type';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart";
import bannerImage2 from '@/assets/images/banner-5.jpg';

const route = useRoute();
const router = useRouter();
const itemId = ref<string>(route.params.id as string);
const item = ref<ItemType | null>(null);
const cartStore = useCartStore();

const goToUserProfile = (userId: string) => {
  router.push(`/user/${userId}/public`);
};

onMounted(async () => {
  item.value = await apiService.getItem(itemId.value) as ItemType;
});

const handleAddToCart = () => {
  if (item.value) {
    cartStore.addItemToCart(item.value);
    alert("Article ajouté au panier !");
  }
};
</script>

<template>
    <div class="bg-gray-100">
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
        </div>
      </section>

      <div class="container mx-auto py-12 px-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8 p-6">
          <div class="w-full lg:w-1/2 flex justify-center items-center">
            <img
              v-if="item?.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              class="rounded-lg object-cover w-full h-full max-h-[500px]"
            />
          </div>

          <div class="w-full lg:w-1/2 flex flex-col gap-6">
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-800">{{ item?.name }}</h1>
            <p class="text-gray-600 text-lg">{{ item?.description }}</p>
            <p class="text-2xl font-semibold text-brown">{{ item?.price }} €</p>
            
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="category in item?.categories"
                :key="category.id"
                class="bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-xs"
              >
                {{ category.name }}
              </Badge>
            </div>

            <div class="flex gap-4 mt-6">
              <Button
                @click="handleAddToCart"
                class="sell-button text-white px-6 py-2 rounded-md transition"
              >
                Ajouter au panier
              </Button>
              <Button
                v-if="item?.user.id"
                @click="goToUserProfile(item.user.id)"
                class="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Profil du vendeur
              </Button>
            </div>

            <div class="flex items-center gap-4 mt-6">
              <div class="bg-gray-100 p-4 rounded-full flex-shrink-0">
                <v-icon name="co-user" scale="1.5" class="text-gray-500"></v-icon>
              </div>
              <div>
                <p class="text-gray-700 font-semibold">
                  Ajouté par : {{ item?.user.firstname }} {{ item?.user.lastname }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
