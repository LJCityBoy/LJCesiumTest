import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import  "cesium/Widgets/widgets.css";


Vue.config.productionTip = false

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
