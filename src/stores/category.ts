import { defineStore } from "pinia";
import apiService from "@/service/api.service";
import type {CategoryType} from "@/type/Category.type";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    data: <CategoryType>[] | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        this.data = await apiService.getCategories();
      } catch (err) {
        this.error = (err as Error).message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
  },
});
