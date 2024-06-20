import Vue from 'vue'
import App from './App.vue'
import { Button, Col, Container, Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Container)
Vue.use(Row);
Vue.use(Col)

new Vue({
  render: h => h(App),
}).$mount('#app')
