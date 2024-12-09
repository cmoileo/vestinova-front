<script lang="ts">
import { useCartStore } from "@/stores/cart";
import { onMounted, ref } from "vue";
import ItemCard from "@/components/cards/ItemCard.vue";
import {Button} from "@/components/ui/button";
import apiService from "@/service/api.service";

export default {
  components: {Button, ItemCard},
  setup() {
    const cartStore = useCartStore();
    const cartRef = ref<any>(null);

    onMounted(() => {
      cartRef.value = cartStore.data;
      console.log(cartRef.value);
    });

    const handleRemoveItemFromCart = async (itemId) => {
      console.log("Removing item from cart", itemId);
      await apiService.removeItemFromCart(itemId)
      await cartStore.fetchCart();
      cartRef.value = cartStore.data;
    }

    return { cartStore, cartRef, handleRemoveItemFromCart };
  },
};
</script>

<template>
  <div v-if="cartRef && cartRef.items.length === 0">
    Your cart is empty
  </div>
  <div v-else>
    <div class="felx items-center gap-8" v-for="item in cartRef?.items" :key="item.id">
      <item-card :item="item" />
      <Button @click="handleRemoveItemFromCart(item.cart_item.CartEntityId)">Remove</Button>
    </div>
  </div>
</template>
