<template>
  <header :class="['header-container', isScrolled ? 'scrolled' : '']">
    <!-- <div v-if="showPromoBanner" class="promo-banner">
      <p class="promo-message">
        -30% sur TOUT avec le code JOYEUX30 valable jusqu'au 16 décembre 23h59 (15€ offerts max)
      </p>
      <button class="close-banner" @click="closePromoBanner">✕</button>
    </div> -->

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
        <!-- <button class="notification-button">
          <v-icon scale="1.5" name="co-ioNotificationsCircleOutline" class="icon-notification" />
        </button> -->
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
        <button class="notification-button">
          <v-icon scale="1.5" name="co-ioNotificationsCircleOutline" class="icon-notification" />
        </button>
        <router-link to="/cart">
          <v-icon scale="1.5" name="co-cart" class="icon-cart" />
        </router-link>
        <create-item-modal :categories="apiResponseStore.data" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CreateItemModal from "@/components/modal/Create-item-modal.vue";
import { useCategoryStore } from "@/stores/category";
import SearchBar from "@/components/modal/Search-bar.vue";
import { useItemsStore } from "@/stores/item";

const apiResponseStore = useCategoryStore();
const itemsStore = useItemsStore();

// const showPromoBanner = ref(true);
const isMenuOpen = ref(false);
const isScrolled = ref(false);

// const closePromoBanner = () => {
//   showPromoBanner.value = false;
// };

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  apiResponseStore.fetchData();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const updateItems = (newItems) => {
  itemsStore.data = newItems;
};
</script>
