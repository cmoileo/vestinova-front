<template>
  <router-link :to="`/item/${props.item.id}`">
    <div class="cursor-pointer transition flex flex-col gap-4 w-full shadow-[rgba(0,_0,_0,_0)_0px_0px_20px_0px] hover:shadow-[rgba(0,_0,_0,_0.25)_0px_0px_20px_0px] bg-white p-4 rounded-3xl">
      <div class="flex justify-between items-center">
        <p>{{ props.item.name }}</p>
        <p>{{ props.item.price }}€</p>
      </div>
      <p>{{ props.item.description }}</p>
      <div class="flex flex-wrap mt-8 gap-2">
        <Badge v-for="category in props.item?.categories" :key="category.id">
          {{ category.name }}
        </Badge>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import defineProps from 'vue'
import type {ItemType} from "@/type/Item.type";
import {Badge} from "@/components/ui/badge";

const props = defineProps<{
  item: ItemType
}>();
</script>
