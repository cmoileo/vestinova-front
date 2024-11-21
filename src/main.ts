import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {CoHome, CoUser, FaFlag, PxPlus, RiZhihuFill} from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, CoHome, CoUser, PxPlus);

const app = createApp(App)

app.use(createPinia())
app.component("v-icon", OhVueIcon);
app.use(router)

app.mount('#app')
