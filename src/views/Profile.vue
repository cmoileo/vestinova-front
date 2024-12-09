<template>
  <div>
    <h1>Profil Utilisateur</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p><strong>Prénom :</strong> {{ userProfile.firstname }}</p>
      <p><strong>Nom :</strong> {{ userProfile.lastname }}</p>
      <p><strong>Email :</strong> {{ userProfile.email }}</p>
      <img v-if="userProfile.avatar" :src="userProfile.avatar" alt="Avatar" />
      <div v-if="userProfile.items && userProfile.items.length">
        <h2>Articles :</h2>
        <ul>
          <li v-for="item in userProfile.items" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun article associé.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import apiService from "@/service/api.service";

const userProfile = ref<any>(null);
const error = ref<string | null>(null);
const loading = ref<boolean>(true);

onMounted(async () => {
  try {
    const userId = apiService.getUserId();
    userProfile.value = await apiService.getUserProfile(userId);
  } catch (err: any) {
    error.value = err.message || "Erreur inconnue lors de la récupération du profil.";
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.error {
  color: red;
}
</style>
