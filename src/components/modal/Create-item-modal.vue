<template>
  <Dialog>
    <DialogTrigger>
      <li class="bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">
        <v-icon scale="1.5" color="white" name="px-plus" />
      </li>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new item</DialogTitle>
        <DialogDescription>
          <form class="mt-4" @submit="handleCreateItem">
            <div class="flex flex-col gap-4">
              <Label for="name">Name</Label>
              <Input required type="text" name="name" placeholder="Item name" />
              <Label for="description">Description</Label>
              <Textarea name="description" placeholder="Write the description here" />
              <Label for="price">Price</Label>
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
            <Button
              type="submit"
              class="mx-auto mt-8 w-full" color="primary">Create</Button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
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


const props = defineProps<{
  categories: CategoryType[]
}>();

const handleCreateItem = async (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  // Handle multiple files
  const images = formData.getAll('image');
  formData.delete('image'); // Remove the existing single file entry

  images.forEach((file, index) => {
    formData.append(`image[${index}]`, file);
  });

  const mergedCategories = props.categories.map((category) => {
    const selectedCategory = Object.entries(Object.fromEntries(formData.entries())).find(([key]) => key === category.name);
    if (!selectedCategory) return null;
    return Number(selectedCategory[1]);
  }).filter((category) => category !== null);

  const newItem = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categories: mergedCategories,
    images: images,
  };

  try {
    const response = await apiService.createItem(newItem);
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
};
</script>
