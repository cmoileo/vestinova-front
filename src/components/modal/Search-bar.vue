<template>
  <div class="fit mx-auto  rounded-full flex gap-4 items-center">
    <Dialog>
      <DialogTrigger>
        <button class="search-button">
          <v-icon scale="1.5" name="co-search" class="icon-search" />
        </button>
      </DialogTrigger>
      <DialogContent class="bg-white">
        <form @submit="handleSearch" class="flex flex-col gap-4">
          <Input type="text" name="search" placeholder="Search item" />
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full" v-for="category in categoriesRef" :key="category.id">
              <Select :model-value="selectedCategoriesRef[category.name]" :name="category.name">
                <SelectTrigger>
                  <SelectValue :placeholder="`Select ${category.name}`" />
                </SelectTrigger>
                <SelectContent class="bg-white">
                  <SelectGroup>
                    <SelectLabel>{{ category.name }}</SelectLabel>
                    <div
                      v-for="child in category.children"
                      key="child.id"
                    >
                      <SelectItem :value="child.name">{{ child.name }}</SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogClose>
            <Button class="mt-4 w-full sell-button" @click="handleEraseFilters">Erase filters</Button>
            <Button class="mt-4 w-full sell-button" type="submit">Search items</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useCategoryStore } from "@/stores/category";
import {defineProps, onMounted, ref, defineEmits} from "vue";
import type {CategoryType} from "@/type/Category.type";
import {Input} from "@/components/ui/input";
import type {ItemType} from "@/type/Item.type";
import apiService from "@/service/api.service";

const categoriesRef = ref<CategoryType[]>([]);
const selectedCategoriesRef = ref<string[]>([]);
const apiResponseStore = useCategoryStore();

const emit = defineEmits(['update:items']);

onMounted(async () => {
  await apiResponseStore.fetchData();
  categoriesRef.value = apiResponseStore.data;
  selectedCategoriesRef.value = window.location.search
    .split("&")
    .filter((category) => category.includes("="))
    .map((category) => {
      const [key, value] = category.split("=");
      return { key, value };
    });
});

const handleSearch = async (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const itemName = formData.get("search") as string;

  const mergedCategories = categoriesRef?.value.map((category) => {
    const selectedCategory = Object.entries(Object.fromEntries(formData.entries())).find(([key]) => key === category.name);
    if (!selectedCategory) return null;
    return `${selectedCategory[0].toLowerCase()}=${selectedCategory[1]}`;
  }).filter((category) => category !== null).join("&");

  const searchQuery = `?search=${itemName}${mergedCategories ? `&${mergedCategories}` : ""}`;

  window.history.pushState({}, "", searchQuery);

  selectedCategoriesRef.value = window.location.search
    .split("&")
    .filter((category) => category.includes("="))
    .map((category) => {
      const [key, value] = category.split("=");
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      return { key: formattedKey, value };
    });

  const searchResults = await apiService.searchItems(searchQuery);
  console.log(searchResults);
  emit('update:items', searchResults);
}

const handleEraseFilters = async () => {
  window.history.pushState({}, "", "/home");
  selectedCategoriesRef.value = [];
  const searchResults = await apiService.getItems(100);
  emit('update:items', searchResults);
}
</script>
