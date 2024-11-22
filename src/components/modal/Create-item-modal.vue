<template>
  <Dialog>
    <DialogTrigger as-child>
      <router-link to="/home">
        <li class="bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">
          <v-icon scale="1.5" color="white" name="px-plus" />
        </li>
      </router-link>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Create new item</DialogTitle>
        <DialogDescription>
          <form class="mt-4" @submit="handleCreateItem">
            <div class="flex flex-col gap-4">
              <Label for="name">Name<span class="text-red-500">*</span></Label>
              <Input required type="text" name="name" placeholder="Item name" />
              <Label for="description">Description<span class="text-red-500">*</span></Label>
              <Textarea required name="description" placeholder="Write the description here" />
              <Label for="price">Price<span class="text-red-500">*</span></Label>
              <Input required type="number" name="price" placeholder="Price" />
              <Label for="categorie">Categories</Label>
              <div class="grid grid-cols-3 gap-4">
                <div class="w-full" v-for="category in categories" :key="category.id">
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
                          <SelectItem :value="child.id.toString()">{{ child.name }}</SelectItem>
                        </div>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Label for="images">Images</Label>
              <Input type="file" name="image" multiple accept=".jpg,.jpeg,.png" />
            </div>
            <DialogClose>
              <Button
                type="submit"
                class="mx-auto mt-8 w-full" color="primary"
              >
                Create
              </Button>
            </DialogClose>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryType } from "@/type/Category.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import apiService from "@/service/api.service";
import {ref} from "vue";

const isDialogOpen = ref(false);


const props = defineProps<{
  categories: CategoryType[]
}>();

const handleCreateItem = async (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const imagesInput = form.querySelector('input[name="image"]') as HTMLInputElement;
  const files = imagesInput.files;
  let images

  if (files) {
    images = await Promise.all(
      Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = () => reject(new Error("Error reading file"));
          reader.readAsDataURL(file);
        });
      })
    );
  }


  const mergedCategories = props.categories.map((category) => {
    const selectedCategory = Object.entries(Object.fromEntries(formData.entries())).find(([key]) => key === category.name);
    if (!selectedCategory) return null;
    return Number(selectedCategory[1]);
  }).filter((category) => category !== null);

  const newItem = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryIds: mergedCategories,
    images: images,
  };

  try {
    await apiService.createItem(newItem);
    isDialogOpen.value = false;
  } catch (error) {
    throw new Error(error);
  }
};
</script>
