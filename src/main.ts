import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {CoCart, CoDelete, CoHome, CoSearch, CoUser, FaFlag, PxPlus, RiZhihuFill, IoNotificationsCircleOutline} from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, CoCart, CoHome, CoUser, PxPlus, CoSearch, CoDelete, IoNotificationsCircleOutline);

const app = createApp(App)

app.use(createPinia())
app.component("v-icon", OhVueIcon);
app.use(router)

app.mount('#app')
