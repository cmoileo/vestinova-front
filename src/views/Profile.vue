<template>
  <div class="profile-page container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">Profil Utilisateur</h1>

    <div class="user-info grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="info-box bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Vos informations</h2>
        <div v-if="loading" class="text-center">Chargement...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
          <p class="mb-2"><strong>Prénom :</strong> {{ userProfile.firstname }}</p>
          <p class="mb-2"><strong>Nom :</strong> {{ userProfile.lastname }}</p>
          <p class="mb-2"><strong>Email :</strong> {{ userProfile.email }}</p>
          <img
            v-if="userProfile.avatar"
            :src="userProfile.avatar"
            alt="Avatar"
            class="w-24 h-24 rounded-full mt-4 shadow-md"
          />
        </div>
      </div>

      <div class="form-box bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Mettre à jour vos informations</h2>
        <form @submit.prevent="handleUpdate">
          <div class="mb-4">
            <label for="firstname" class="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              id="firstname"
              v-model="form.firstname"
              class="w-full p-2 border rounded"
              placeholder="Entrez votre prénom"
            />
          </div>
          <div class="mb-4">
            <label for="lastname" class="block text-sm font-medium">Nom</label>
            <input
              type="text"
              id="lastname"
              v-model="form.lastname"
              class="w-full p-2 border rounded"
              placeholder="Entrez votre nom"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full p-2 border rounded"
              placeholder="Entrez votre email"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Mettre à jour
          </button>
        </form>
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

const form = ref({
  firstname: "",
  lastname: "",
  email: "",
});

onMounted(async () => {
  try {
    const userId = apiService.getUserId();
    const profileData = await apiService.getUserProfile(userId);
    userProfile.value = profileData;
    form.value = {
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      email: profileData.email,
    };
  } catch (err: any) {
    error.value = err.message || "Erreur inconnue lors de la récupération du profil.";
  } finally {
    loading.value = false;
  }
});

const handleUpdate = async () => {
  try {
    loading.value = true;
    await apiService.updateUserProfile(form.value);
    alert("Profil mis à jour avec succès !");
  } catch (err: any) {
    error.value = err.message || "Erreur lors de la mise à jour du profil.";
  } finally {
    loading.value = false;
  }
};
</script>
