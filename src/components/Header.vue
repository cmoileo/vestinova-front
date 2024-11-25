<template>
  <header class="header-container">
    <div class="promo-banner">
      <p class="promo-message">
        -30% sur TOUT avec le code JOYEUX30 valable jusqu'au 16 décembre 23h59 (15€ offerts max)
      </p>
    </div>

    <div class="main-header">
      <div class="logo-section">
        <img src="@/assets/vestinova_logo.png" alt="Vestinova Logo" class="logo-image" />
      </div>

      <div class="actions-section">
        <div class="search-section">
          <button @click="toggleSearchBar" class="search-button">
            <v-icon scale="1.5" name="co-search" class="icon-search" />
          </button>
          <transition name="fade">
            <input v-if="showSearch" type="text" class="search-bar" placeholder="Rechercher des articles..." />
          </transition>
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

        <button @click="openCreateItemModal" class="sell-button">Vendre un article</button>
      </div>
    </div>

    <hr class="header-separator" />

    <nav class="nav-links">
      <a href="/">Mode Femme</a>
      <a href="/">Mode Homme</a>
      <a href="/">Enfant</a>
      <a href="/">Maison</a>
      <a href="/">Jeux & Jouets</a>
      <a href="/">Marques</a>
      <a href="/">Notre Sélection</a>
    </nav>

    <create-item-modal :categories="apiResponseStore.data" v-if="showCreateItemModal" @close="closeCreateItemModal" />
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import { useCategoryStore } from "@/stores/category";

const showSearch = ref(false);
const showCreateItemModal = ref(false);

const apiResponseStore = useCategoryStore();

const toggleSearchBar = () => {
  showSearch.value = !showSearch.value;
};

const openCreateItemModal = () => {
  showCreateItemModal.value = true;
};

const closeCreateItemModal = () => {
  showCreateItemModal.value = false;
};

onMounted(() => {
  apiResponseStore.fetchData();
});
</script>