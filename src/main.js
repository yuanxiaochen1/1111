import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
axios.defaults.baseURL = "/api";
// Vue.prototype.host = ;
axios.interceptors.response.use(function(res) {
  return res.data;
});
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
