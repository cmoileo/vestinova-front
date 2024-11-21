<template>
  <div>
    <p>{{ props.item.name }}</p>
    <p>{{ props.item.price }}€</p>
    <p>{{ props.item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import defineProps from 'vue'
import type {ItemType} from "@/type/Item.type";

const props = defineProps<{
  item: ItemType
}>();
</script>
