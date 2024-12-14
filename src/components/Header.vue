<template>
  <header
    :class="[
      'header-container-home',
      isScrolled || !isHomePage ? 'scrolled' : '',
      isHomePage ? 'transparent-header' : 'white-header'
    ]"
  >
    <div class="main-header">
      <button class="burger-menu" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="logo-section">
        <router-link to="/home">
          <img src="@/assets/vestinova_logo.png" alt="Vestinova Logo" class="logo-image" />
        </router-link>
      </div>

      <nav class="nav-links">
        <router-link to="/">Mode Femme</router-link>
        <router-link to="/">Mode Homme</router-link>
        <router-link to="/">Enfant</router-link>
        <router-link to="/store">Store</router-link>
      </nav>

      <div class="actions-section">
        <search-bar @update:items="updateItems" />
        <router-link to="/profile">
          <v-icon scale="1.5" name="co-user" class="icon-user" />
        </router-link>
        <router-link to="/cart">
          <v-icon scale="1.5" name="co-cart" class="icon-cart" />
        </router-link>
        <create-item-modal :categories="apiResponseStore.data" />
      </div>
    </div>

    <div v-if="isMenuOpen" class="burger-menu-content">
      <nav class="burger-nav-links">
        <router-link to="/">Mode Femme</router-link>
        <router-link to="/">Mode Homme</router-link>
        <router-link to="/">Enfant</router-link>
        <router-link to="/store">Store</router-link>
      </nav>
      <div class="burger-actions-section">
        <search-bar @update:items="updateItems" />
        <router-link to="/profile">
          <v-icon scale="1.5" name="co-user" class="icon-user" />
        </router-link>
        <router-link to="/cart">
          <v-icon scale="1.5" name="co-cart" class="icon-cart" />
        </router-link>
        <create-item-modal :categories="apiResponseStore.data" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import { useCategoryStore } from "@/stores/category";
import SearchBar from "@/components/modal/Search-bar.vue";
import { useItemsStore } from "@/stores/item";

const apiResponseStore = useCategoryStore();
const itemsStore = useItemsStore();

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const isHomePage = computed(() => route.name === "home");

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  apiResponseStore.fetchData();
  if (isHomePage.value) {
    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  if (isHomePage.value) {
    window.removeEventListener("scroll", handleScroll);
  }
});

const updateItems = (newItems) => {
  itemsStore.data = newItems;
};
</script>
