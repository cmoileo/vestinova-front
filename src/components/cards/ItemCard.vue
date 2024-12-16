<template>
  <div
    class="product-card cursor-pointer transition bg-white shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 relative flex flex-col"
  >
  <button
  @click.stop="toggleLike"
  class="absolute top-4 right-4 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
>
  <v-icon
    :name="isLiked ? 'ri-hearts-fill' : 'co-heart'"
    :class="[
      'transition-all duration-200',
      isLiked ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'
    ]"
    scale="1.5"
  />
</button>

    <img
      v-if="props.item.imageUrl"
      :src="props.item.imageUrl"
      :alt="props.item.name"
      class="w-full h-40 object-cover"
    />

    <div class="p-4 flex flex-col gap-2 flex-grow">

      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-bold text-gray-800 truncate">{{ props.item.name }}</h3>
        <p class="text-primary font-semibold">{{ props.item.price }}€</p>
      </div>

      <p class="text-gray-500 text-sm line-clamp-2">{{ props.item.description }}</p>

      <div class="flex flex-wrap gap-2 mt-auto">
        <Badge
          v-for="category in props.item?.categories"
          :key="category.id"
          class="bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-xs"
        >
          {{ category.name }}
        </Badge>
      </div>
    </div>

    <div class="flex gap-2 px-4 py-3 bg-gray-50 border-t">
      <router-link
        :to="`/item/${props.item.id}`"
        class="flex-1 text-center text-brown py-2 rounded-md transition"
      >
        Voir le produit
      </router-link>
      <button
        @click.stop="addToCart"
        class="flex-1 bg-accent text-white py-2 rounded-md hover:bg-accent-hover transition"
      >
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ItemType } from "@/type/Item.type";
import { Badge } from "@/components/ui/badge";
import apiService from "@/service/api.service";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  item: ItemType;
}>();

const isLiked = ref(false);

const toggleLike = async () => {
  try {
    await apiService.likeItem(props.item.id);
    isLiked.value = !isLiked.value;
    console.log("isLiked:", isLiked.value);
  } catch (error) {
    console.error("Erreur lors du like :", error);
  }
};

const cartStore = useCartStore();
const addToCart = async () => {
  try {
    await cartStore.addItemToCart(props.item.id);
    alert("Article ajouté au panier !");
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
  }
};
</script>
