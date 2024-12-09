import {defineStore} from "pinia";
import type {ItemType} from "@/type/Item.type";
import apiService from "@/service/api.service";

export const useItemsStore = defineStore("itemsStore", {
  state: () => ({
    data: <ItemType>[] | null,
    page: 1,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const items = await apiService.getItems(this.page);
        if (items) {
          this.data = items;
        }
      } catch (err) {
        this.error = (err as Error).message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    async searchItems(query: string) {
      this.loading = true;
      this.error = null;
      try {
        const items = await apiService.searchItems(query);
        if (items) {
          this.data = items;
        }
      } catch (err) {
        this.error = (err as Error).message || "An error occurred";
      } finally {
        this.loading = false;
      }
    }
  }
})
