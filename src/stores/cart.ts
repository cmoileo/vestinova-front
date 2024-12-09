import {defineStore} from "pinia";
import apiService from "@/service/api.service";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    data: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCart() {
      this.loading = true;
      this.error = null;
      try {
        this.data = await apiService.getCart();
      } catch (err: any) {
        this.error = (err as Error).message || "An error occurred";
      } finally {
        this.loading
      }
    }
  },
});
