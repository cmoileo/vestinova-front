<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import apiService from '@/service/api.service';
import type { ItemType } from '@/type/Item.type';
import {Button} from "@/components/ui/button";

const route = useRoute();
const itemId = ref<string>(route.params.id as string);
const item = ref<ItemType | null>(null);

onMounted(async () => {
  item.value = await apiService.getItem(itemId.value) as ItemType;
  console.log(item);
});
</script>


<template>
  <div class="flex flex-col gap-8 w-full p-8 rounded-3xl bg-white items-center">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{{ item?.name }}</h1>
    <p>{{ item?.description }}</p>
    <p class="text-xl font-semibold tracking-tight transition-colors">{{ item?.price }}€</p>
    <Button class="mt-12">Buy this item</Button>
  </div>
</template>
