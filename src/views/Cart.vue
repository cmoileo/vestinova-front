<script lang="ts">
import { useCartStore } from "@/stores/cart";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const cartStore = useCartStore();
    const cartRef = ref<any>(null);

    onMounted(() => {
      cartRef.value = cartStore.data;
      console.log(cartRef.value);
    });

    return { cartStore, cartRef };
  },
};
</script>

<template>
  <div v-if="cartRef && cartRef.items.length === 0">
    Your cart is empty
  </div>
  <div v-else>
    <div v-for="item in cartRef?.items" :key="item.id">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>
