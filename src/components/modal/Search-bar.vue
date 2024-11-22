<template>
  <div class="fit mx-auto bg-white p-4 rounded-full px-12 flex gap-4 items-center">
    <Dialog>
      <DialogTrigger>
        <Button class="w-fit h-fit p-2">
          <v-icon scale="2" name="co-search" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form @submit="handleSearch" class="flex flex-col gap-4">
          <Input type="text" name="search" placeholder="Search item" />
          <div class="grid grid-cols-3 gap-4">
            <div class="w-full" v-for="category in categoriesRef" :key="category.id">
              <Select :name="category.name">
                <SelectTrigger>
                  <SelectValue :placeholder="`Select ${category.name}`" />
                </SelectTrigger>
                <SelectContent>
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
            <Button type="submit">Search items</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
    <p class="text-lg font-semibold">Search item</p>
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
import {defineProps, onMounted, ref} from "vue";
import type {CategoryType} from "@/type/Category.type";
import {Input} from "@/components/ui/input";
import type {ItemType} from "@/type/Item.type";
import apiService from "@/service/api.service";

const categoriesRef = ref<CategoryType[]>([]);

const apiResponseStore = useCategoryStore();

const props = defineProps<{
  items: ItemType[]
}>();

onMounted(async () => {
  await apiResponseStore.fetchData();
  categoriesRef.value = apiResponseStore.data;
});

const handleSearch = async (e: Event) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const itemName = formData.get("search") as string;

  const mergedCategories = categoriesRef?.value.map((category) => {
    const selectedCategory = Object.entries(Object.fromEntries(formData.entries())).find(([key]) => key === category.name);
    console.log(selectedCategory)
    if (!selectedCategory) return null;
    return `${selectedCategory[0].toLowerCase()}=${selectedCategory[1].toLowerCase()}`;
  }).filter((category) => category !== null).join("&");

  const searchQuery = `?search=${itemName}${mergedCategories ? `&${mergedCategories}` : ""}`;

  console.log(searchQuery)

  console.log(await apiService.searchItems(searchQuery))
}
</script>
