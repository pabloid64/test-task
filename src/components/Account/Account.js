import Vue from "vue";
import template from "./Account.html";
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
      date: "",
      columns2: ["AcctNumCr", "AcctNumDB", "Amount", "OpDate"],
    };
  },
  async created() {
    this.getAcctPos();
    await this.getOpDate();
    this.date = this.maxDate
    this.getOpEntry();
    console.log(this.date)
  },
  computed: {
    ...mapGetters({
      localActtPos: "localActtPos",
      localOpEntry: "localOpEntry",
      localOpDate: "localOpDate",
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
    maxDate: function () {
      return this.localOpDate[0].OpDate
    },
    rowAcctPos: function() {
      return this.localActtPos.filter(i => i.OpDate == this.dateLocal)
    }
  },
  methods: {
    ...mapActions({
      getAcctPos: "getAcctPos",
      getOpEntry: "getOpEntry",
      getOpDate: "getOpDate"
    }),
    selectRow(val){
      console.log(val);
    }
  },
});
