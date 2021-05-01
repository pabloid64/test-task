import Vue from "vue";
import router from "./router";
import store from "./store";
import Vuex from "vuex";

import "./style/index.scss";

Vue.use(Vuex);

Vue.config.productionTip = false;

let mainView = new Vue({
  router,
  store,
  components: {},
});

mainView.$mount("#app");
