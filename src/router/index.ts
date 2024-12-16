import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Onboarding from "@/views/Onboarding.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Home.vue";
import SingleItem from "@/views/SingleItem.vue";
import Cart from "@/views/Cart.vue";
import UserPublicProfile from '@/views/UserPublicProfile.vue';
import LikedProducts from '@/views/LikedProducts.vue';
import ModeHomme from '@/views/ModeHomme.vue';
import ModeFemme from '@/views/ModeFemme.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeView',
      component: HomeView,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/item/:id',
          name: 'item',
          component: SingleItem
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        },
        {
          path: '/user/:userId/public',
          name: 'UserPublicProfile',
          component: UserPublicProfile,
        },
        {
          path: "/liked-products",
          name: "liked-products",
          component: () => import("@/views/LikedProducts.vue"),
        },
        { path: "/mode-homme", name: "modeHomme", component: ModeHomme },
        { path: "/mode-femme", name: "modeFemme", component: ModeFemme },
      ]
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
})

export default router
