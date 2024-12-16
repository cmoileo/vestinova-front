import { defineStore } from "pinia";
import apiService from "@/service/api.service";
import type { ItemType } from "@/type/Item.type";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: [] as ItemType[],
  }),
  actions: {
    fetchCart() {
      this.items = apiService.getCartFromLocalStorage();
    },
    addItemToCart(item: ItemType) {
      apiService.addItemToCart(item);
      this.fetchCart();
    },
    removeItemFromCart(itemId: string) {
      apiService.removeItemFromCart(itemId);
      this.fetchCart();
    },
    clearCart() {
      apiService.clearCart();
      this.fetchCart();
    },
  },
});
