<template>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type {ItemType} from "@/type/Item.type";

const props = defineProps<{
  item: ItemType[]
}>();
</script>
