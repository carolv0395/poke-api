import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App)
}).$mount("#app");
