import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {CoCart, CoDelete, CoHome, CoHeart, FaHeart, CoSearch, CoUser, FaFlag, PxPlus, RiZhihuFill, IoNotificationsCircleOutline} from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, CoCart, CoHome, CoHeart, FaHeart, CoUser, PxPlus, CoSearch, CoDelete, IoNotificationsCircleOutline);

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component("v-icon", OhVueIcon);
app.use(router)

app.mount('#app')
