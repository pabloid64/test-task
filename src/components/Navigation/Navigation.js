import Vue from "vue";
import template from "./Navigation.html";

export default Vue.extend({
  template,
  name: "Navigation",
  methods: {
    goToAcct() {
      this.$router.push("/")
      .catch(() => {});
    },
    goToOp() {
      this.$router.push("operations")
      .catch(() => {});
    },
    goToOpDays() {
      this.$router.push("operatingdays")
      .catch(() => {});
    },
  },
});
