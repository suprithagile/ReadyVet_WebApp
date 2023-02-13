import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { languages, defaultLocale } from './assets/i18n/index.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n';
import store from "./store";
import FlashMessage from "@smartweb/vue-flash-message";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(FlashMessage);
Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);
const messages = Object.assign(languages)

Vue.use(VueI18n);
const i18n = new VueI18n({

  locale: defaultLocale,
  messages
})
document.documentElement.lang = defaultLocale;


axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.status === 'E') {
      store.commit("setErrors", error.response.data);
    } else if (error.response.status === 401) {
      store.commit("auth/setUserData", null);
      localStorage.removeItem("authToken");
      router.push({ name: "Login" });
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.use(function (config) {
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  config.headers['Accept-Language'] = localStorage.getItem("selected");

  return config;
});
new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
