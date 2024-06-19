import Vue from 'vue'
import App from './App.vue'

import './index.css'

Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
});

new Vue({
  render: h => h(App),
}).$mount('#app')
