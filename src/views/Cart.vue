<script lang="ts">
import { useCartStore } from "@/stores/cart";
import { onMounted } from "vue";
import ItemCard from "@/components/cards/ItemCard.vue";
import { Button } from "@/components/ui/button";

export default {
  components: { Button, ItemCard },
  setup() {
    const cartStore = useCartStore();

    onMounted(() => {
      cartStore.fetchCart();
    });

    const handleRemoveItemFromCart = (itemId: string) => {
      cartStore.removeItemFromCart(itemId);
    };

    const handleClearCart = () => {
      cartStore.clearCart();
    };

    return { cartStore, handleRemoveItemFromCart, handleClearCart };
  },
};
</script>

<template>
  <div class="container mt-32 bg-gray-100 px-6 py-8 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-center mb-8">Votre Panier</h1>

    <div v-if="cartStore.items.length === 0" class="text-center text-gray-500">
      Votre panier est vide.
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in cartStore.items" :key="item.id" class="relative">
          <ItemCard :item="item" />
          <button
            @click="handleRemoveItemFromCart(item.id)"
            class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div class="text-center mt-6">
        <Button @click="handleClearCart" class="bg-red-500 text-white hover:bg-red-600">
          Vider le panier
        </Button>
      </div>
    </div>
  </div>
</template>
