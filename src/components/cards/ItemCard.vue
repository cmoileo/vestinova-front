<template>
  <router-link :to="`/item/${props.item.id}`">
    <div class="cursor-pointer transition flex flex-col gap-4 w-full shadow-[rgba(0,_0,_0,_0)_0px_0px_20px_0px] hover:shadow-[rgba(0,_0,_0,_0.25)_0px_0px_20px_0px] bg-white p-4 rounded-3xl">
      <div class="flex justify-between items-center">
        <p>{{ props.item.name }}</p>
        <p>{{ props.item.price }}€</p>
      </div>
      <p>{{ props.item.description }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import defineProps from 'vue'
import type {ItemType} from "@/type/Item.type";

const props = defineProps<{
  item: ItemType
}>();
</script>
