import Vue from "vue";
import template from "./Account.html";
import Tables from "../Table/Table";
import { mapActions, mapGetters, mapMutations } from "vuex";

const labelAcctPos = ["Номер счета", "Остаток"];
const labelOpEntry = ["Счет кредита", "Счет дебета", "Сумма", "Дата операционного дня"];

export default Vue.extend({
  template,
  name: "Account",
  components: {
    Tables,
  },
  data() {
    return {
      date: "",
      selectedAcct: "",
    };
  },
  async created() {
    await this.getOpDate();
    this.date = this.maxDate;
    this.getAcctPos();
    this.getOpEntry();
  },
  computed: {
    ...mapGetters({
      localAcctPos: "localAcctPos",
      localOpEntry: "localOpEntry",
      localOpDate: "localOpDate",
      loading: "localLoading",
    }),
    dateLocal: {
      get: function () {
        return this.date;
      },
      set: function (val) {
        this.date = val;
        this.selectedAcct = "";
      },
    },
    maxDate: function () {
      let res = "";
      if(this.localOpDate.length != 0) {
        res = this.localOpDate[0].OpDate
      }
      return res;
    },
    rowAcctPos: function () {
      return this.localAcctPos.filter(i => i.OpDate == this.dateLocal);
    },
    rowOpEntry: function () {
      return this.localOpEntry.filter(i => i.AcctNumCr == this.selectedAcct || i.AcctNumDB == this.selectedAcct)
        .filter(i => i.OpDate == this.dateLocal);
    },
    columnAcctPos: function () {
      let res = Object.keys(this.localAcctPos[0]);
      let index = res.indexOf("OpDate");
      if (index > -1) {
        res.splice(index, 1);
      }
      return res;
    },
    labelAcctPos: function () {
      return labelAcctPos;
    },
    columnOpEntry: function () {
      let res = Object.keys(this.localOpEntry[0]);
      return res;
    },
    labelOpEntry: function () {
      return labelOpEntry;
    },
  },
  methods: {
    ...mapMutations({
      setAcctPos: "setAcctPos",
      setOpEntry: "setOpEntry",
    }),
    ...mapActions({
      getAcctPos: "getAcctPos",
      getOpEntry: "getOpEntry",
      getOpDate: "getOpDate",
    }),
    selectRow(val) {
      this.selectedAcct = this.rowAcctPos[val].AcctNum;
    },
    deleteRowAcctPos(val) {
      let newVal = this.localAcctPos.filter(i => !(i.AcctNum == val.AcctNum && i.OpDate == val.OpDate));
      this.setAcctPos(newVal);
    },
    deleteRowOpEntry(val) {
      let newVal = this.localOpEntry.filter(i => !(i.AcctNumCr == val.AcctNumCr && i.OpDate == val.OpDate));
      this.setOpEntry(newVal);
    },
    editRowAcctPos(val, currentVal, isEdit) {
      let newVal;
      if(isEdit) {
        newVal = this.localAcctPos.map((i) => {
          if(i.AcctNum == currentVal.AcctNum &&i.OpDate == currentVal.OpDate) {
            i = val;
          }
          return i;
        });
      } else {
        val.OpDate = this.dateLocal;
        newVal = this.localAcctPos.concat({ ...val });
      }
      this.setAcctPos(newVal);
    },
    editRowOpEntry(val, currentVal, isEdit) {
      let newVal;
      if (isEdit) {
        newVal = this.localOpEntry.map((i) => {
          if (i.AcctNumCr == currentVal.AcctNumCr &&i.OpDate == currentVal.OpDate) {
            i = val;
          }
          return i;
        });
      } else {
        val.OpDate = this.dateLocal;
        newVal = this.localOpEntry.concat({ ...val });
      }
      this.setOpEntry(newVal);
    },
  },
});
