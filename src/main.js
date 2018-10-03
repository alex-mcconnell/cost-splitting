import Vue from 'vue'
import App from './App.vue'
import 'bootswatch/dist/minty/bootstrap.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
