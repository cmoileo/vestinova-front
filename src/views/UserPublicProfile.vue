<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiService from "@/service/api.service";

const route = useRoute();
const userId = ref<string>(route.params.userId as string);
const userProfile = ref<any | null>(null);

onMounted(async () => {
  console.log("Fetching public profile for user:", userId.value);
  try {
    userProfile.value = await apiService.getUserProfile(userId.value);
    console.log("User public profile data:", userProfile.value);
  } catch (error) {
    console.error("Failed to fetch user public profile:", error);
  }
});
</script>

<template>
  <div class="flex flex-col items-center gap-8 p-8 bg-white rounded-3xl">
    <div v-if="userProfile?.avatar" class="w-32 h-32 rounded-full overflow-hidden">
      <img :src="userProfile.avatar" alt="Avatar" class="object-cover w-full h-full" />
    </div>
    <div v-else class="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-full">
      <span class="text-2xl font-bold text-gray-700">
        {{ userProfile?.firstname.charAt(0) || '' }}{{ userProfile?.lastname.charAt(0) || '' }}
      </span>
    </div>

    <h1 class="text-3xl font-extrabold">{{ userProfile?.firstname }} {{ userProfile?.lastname }}</h1>

    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-2xl font-semibold">Items:</h2>
      <div v-if="userProfile?.items?.length">
        <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in userProfile.items" :key="item.id" class="p-4 border rounded-lg shadow">
            <img v-if="item.imageUrl" :src="item.imageUrl" alt="Item Image" class="object-cover w-full h-40 rounded-lg mb-4" />
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="font-bold">{{ item.price }}€</p>
          </li>
        </ul>
      </div>
      <p v-else class="text-gray-500">Cet utilisateur n'a aucun article à afficher.</p>
    </div>
  </div>
</template>
