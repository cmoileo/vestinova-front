<template>
  <div class="grid grid-cols-3 gap-8">
    <ItemCard v-for="item in props.items" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type {ItemType} from "@/type/Item.type";
import ItemCard from "@/components/cards/ItemCard.vue";

const props = defineProps<{
  items: ItemType[]
}>();

</script>
