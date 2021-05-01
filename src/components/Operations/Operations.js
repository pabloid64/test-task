import Vue from "vue";
import template from "./Operations.html";
import Tables from "../Table/Table";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  template,
  name: "Account",
  components: {
    Tables,
  },
  data() {
    return {
      columns1: ["AcctNum", "Balance", "OpDate"],
      date: "2018-03-05",
      columns2: ["AcctNumCr", "AcctNumDB", "Amount", "OpDate"],
    };
  },
  async created() {
    this.getAcctPos();
    this.getOpEntry();
  },
  computed: {
    ...mapGetters({
      localActtPos: "localActtPos",
      localOpEntry: "localOpEntry",
    }),
    dateLocal: {
      get: function () {
        return this.date;
      },
      set: function (val) {
        this.date = val;
        console.log(this.date);
      },
    },
  },
  methods: {
    ...mapActions({
      getAcctPos: "getAcctPos",
      getOpEntry: "getOpEntry",
    }),
  },
});
