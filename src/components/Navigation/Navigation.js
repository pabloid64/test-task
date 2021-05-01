import Vue from "vue";
import template from "./Navigation.html";

export default Vue.extend({
  template,
  name: "Navigation",
  data() {
    return {
      name: "Pavel",
    };
  },
  methods: {
    goToAcc() {
      this.$router.push("/");
    },
    goToOp() {
      this.$router.push("operations");
    },
    goToOpD() {
      this.$router.push("operatingdays");
    },
  },
});
