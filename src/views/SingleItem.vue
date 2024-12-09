<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import apiService from '@/service/api.service';
import type { ItemType } from '@/type/Item.type';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const route = useRoute();
const router = useRouter();
const itemId = ref<string>(route.params.id as string);
const item = ref<ItemType | null>(null);

const goToUserProfile = (userId: string) => {
  console.log("Redirecting to public profile of user:", userId);
  router.push(`/user/${userId}/public`);
};

onMounted(async () => {
  item.value = await apiService.getItem(itemId.value) as ItemType;
});
</script>


<template>
  <div class="flex flex-col gap-8 w-full p-8 rounded-3xl bg-white items-center">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{{ item?.name }}</h1>
    <p>{{ item?.description }}</p>
    <p class="text-xl font-semibold tracking-tight transition-colors">{{ item?.price }}€</p>
    <Button class="mt-12">Buy this item</Button>
    <div class="flex flex-wrap mt-8 gap-2">
      <Badge v-for="category in item?.categories" :key="category.id">
        {{ category.name }}
      </Badge>
    </div>
    <img v-if="item?.imageUrl" class="w-full h-96 rounded-2xl object-cover" :src="item.imageUrl"  alt=""/>
    <div class="mt-4 flex gap-1">
      <p>Added by :</p>
      <div>
        <p class="font-semibold">{{ item?.user.firstname }} {{ item?.user.lastname }}</p>
        <Button
          v-if="item?.user.id"
          class="mt-2"
          @click="goToUserProfile(item.user.id)"
        >
          Visiter
        </Button>
      </div>
    </div>
  </div>
</template>
