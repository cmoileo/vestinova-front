<template>
  <header class="header-container">
    <div class="promo-banner">
      <p class="promo-message">
        -30% sur TOUT avec le code JOYEUX30 valable jusqu'au 16 décembre 23h59 (15€ offerts max)
      </p>
    </div>

    <div class="main-header">
      <div class="logo-section">
        <router-link to="/home">
          <img src="@/assets/vestinova_logo.png" alt="Vestinova Logo" class="logo-image" />
        </router-link>
      </div>

      <div class="actions-section">
        <div class="search-section">
          <search-bar @update:items="updateItems" />
        </div>

        <router-link to="/profile">
          <v-icon scale="1.5" name="co-user" class="icon-user" />
        </router-link>

        <button class="notification-button">
          <v-icon scale="1.5" name="co-ioNotificationsCircleOutline" class="icon-notification" />
        </button>

        <router-link to="/cart">
          <v-icon scale="1.5" name="co-cart" class="icon-cart" />
        </router-link>

        <create-item-modal :categories="apiResponseStore.data" />
      </div>
    </div>

    <hr class="accent" />

    <nav class="nav-links">
      <a href="/">Mode Femme</a>
      <a href="/">Mode Homme</a>
      <a href="/">Enfant</a>
      <a href="/">Maison</a>
      <a href="/">Jeux & Jouets</a>
      <a href="/">Marques</a>
      <a href="/">Notre Sélection</a>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import { useCategoryStore } from "@/stores/category";
import SearchBar from "@/components/modal/Search-bar.vue";
import { useItemsStore } from "@/stores/item";

const apiResponseStore = useCategoryStore();
const itemsStore = useItemsStore();

onMounted(() => {
  apiResponseStore.fetchData();
});

const updateItems = (newItems) => {
  itemsStore.data = newItems;
};
</script>
