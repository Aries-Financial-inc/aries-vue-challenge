import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import vuetify from './plugins/vuetify'; // Ensure Vuetify is set up correctly

Vue.config.productionTip = false;

new Vue({
  router, // Use the router
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
