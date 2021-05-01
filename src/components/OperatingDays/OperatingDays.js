import Vue from "vue";
import template from "./OperatingDays.html";
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
      columns1: ["OpDate"],
      date: "2018-03-05",
      columns2: ["AcctNumCr", "AcctNumDB", "Amount"],
    };
  },
  async created() {
    this.getOpDate();
    this.getOpEntry();
  },
  computed: {
    ...mapGetters({
      localOpDate: "localOpDate",
      localOpEntry: "localOpEntry",
      loading: "localLoading"
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
      getOpDate: "getOpDate",
      getOpEntry: "getOpEntry",
    }),
  },
});
