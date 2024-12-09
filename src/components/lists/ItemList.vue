<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <ItemCard v-for="item in props.items" :key="item.id" :item="item" />
    <p v-if="props.items.length === 0">No items found.</p>
  </div>
  <div class="mx-auto mt-12 w-fit">
    <Pagination @update:page="handlePageChange" class="w-fit" v-slot="{ page }" v-model:page="pageRef" :total="100" :sibling-count="1" show-edges :default-page="1">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="w-10 h-10 p-0" :variant="item.value == page ? 'outline' : 'default'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { ItemType } from "@/type/Item.type";
import ItemCard from "@/components/cards/ItemCard.vue";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { useItemsStore } from "@/stores/item";

const itemStore = useItemsStore();

const pageRef = ref(1);

const props = defineProps<{
  items: ItemType[] | []
}>();

const handlePageChange = async (newPage: number) => {
  pageRef.value = newPage;
  itemStore.page = newPage;
  await itemStore.fetchData();
};
</script>
