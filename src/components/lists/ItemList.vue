<template>
  <div>
    <div v-for="item in props.items" :key="item.id">
      <ItemCard :item="props.items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type {ItemType} from "@/type/Item.type";
import ItemCard from "@/components/cards/ItemCard.vue";
import {onMounted} from "vue";

const props = defineProps<{
  items: ItemType[]
}>();

</script>
