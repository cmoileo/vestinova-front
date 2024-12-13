<template>
  <footer class="py-10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">À propos</h3>
        <p class="text-sm">
          Vestinova est votre plateforme de mode de seconde main pour acheter et vendre des vêtements uniques.
        </p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/home" class="hover:underline">Accueil</router-link></li>
          <li><router-link to="/profile" class="hover:underline">Profil</router-link></li>
          <li><router-link to="/cart" class="hover:underline">Panier</router-link></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Contact</h3>
        <p>Email : <a href="mailto:support@vestinova.com" class="hover:underline">support@vestinova.com</a></p>
        <p>Téléphone : <a href="tel:+330000000000" class="hover:underline">+33 0 00 00 00 00</a></p>
        <p>Adresse : Bordeaux, France</p>
      </div>

      <div class="flex justify-center items-center">
        <img src="@/assets/vestinova_logo.png" alt="Vestinova Logo">
      </div>
    </div>

    <div class="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
      <p>&copy; 2024 Vestinova. Tous droits réservés.</p>
      <p>
        <router-link to="/legal" class="hover:underline">Mentions légales</router-link> |
        <router-link to="/privacy" class="hover:underline">Politique de confidentialité</router-link>
      </p>
    </div>
  </footer>
</template>


<style>
footer a {
  transition: color 0.3s;
}
</style>
