import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import header from '@/components/header.vue';
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component("headers", header);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
