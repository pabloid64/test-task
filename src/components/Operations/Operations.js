import Vue from "vue";
import template from "./Operations.html";
import Tables from "../Table/Table";
import { mapActions, mapGetters, mapMutations } from "vuex";

const labelOpEntry = ["Счет кредита", "Счет дебета", "Сумма", "Дата операционного дня"];
const labelAcctPos = ["Номер счета", "Остаток", "Счет кредита и дебета"];

export default Vue.extend({
  template,
  name: "Operations",
  components: {
    Tables,
  },
  data() {
    return {
      selectedDate: "",
    };
  },
  async created() {
    this.getAcctPos();
    this.getOpEntry();
  },
  computed: {
    ...mapGetters({
      localAcctPos: "localAcctPos",
      localOpEntry: "localOpEntry",
      loading: "localLoading",
    }),
    rowAcctPos: function () {
      let copy = [];
      let res = this.localAcctPos.filter(i => i.OpDate == this.selectedDate);
      res.forEach((item, index) => {
        copy.push(Object.assign({}, item));
        copy[index].AcctNumCrAndDb = this.AcctNumCrAndDb[index];
      });
      return copy;
    },
    columnOpEntry: function () {
      let res = [];
      if (this.localOpEntry && this.localOpEntry[0]) {
        res = Object.keys(this.localOpEntry[0]);
      }
      return res;
    },
    labelOpEntry: function () {
      return labelOpEntry;
    },
    columnAcctPos: function () {
      let res = Object.keys(this.rowAcctPos[0]);
      const index = res.indexOf("OpDate");
      if (index > -1) {
        res.splice(index, 1);
      }
      return res;
    },
    labelAcctPos: function () {
      return labelAcctPos;
    },
    AcctNumCrAndDb: function () {
      let res = [];
      let arr = this.localOpEntry.filter(i => i.OpDate == this.selectedDate);
      arr.forEach(el => {
        res.push(`${el.AcctNumCr}/${el.AcctNumDB}`);
      });
      return res;
    },
  },
  methods: {
    ...mapMutations({
      setOpEntry: "setOpEntry",
      setAcctPos: "setAcctPos",
    }),
    ...mapActions({
      getAcctPos: "getAcctPos",
      getOpEntry: "getOpEntry",
    }),
    selectRow(val) {
      this.selectedDate = this.localOpEntry[val].OpDate;
    },
    deleteRowOpEntry(val) {
      let newVal = this.localOpEntry.filter(i => !(i.AcctNumCr == val.AcctNumCr && i.OpDate == val.OpDate));
      this.setOpEntry(newVal);
    },
    editRowOpEntry(val, currentVal, isEdit) {
      let newVal;
      if(isEdit) {
        newVal = this.localOpEntry.map(i => {
          if(i.AcctNumCr == currentVal.AcctNumCr && i.OpDate == currentVal.OpDate) {
            i = val;
          }
          return i;
        });
      } else {
        val.OpDate = this.selectedDate;
        newVal = this.localOpEntry.concat({ ...val });
      }
      this.setOpEntry(newVal);
    },
    deleteRowAcctPos(val) {
      let newVal = this.localAcctPos.filter(i => !(i.AcctNum == val.AcctNum && i.OpDate == val.OpDate));
      this.setAcctPos(newVal);
    },
    editRowAcctPos(val, currentVal, isEdit) {
      let newVal;
      if (isEdit) {
        newVal = this.localAcctPos.map((i) => {
          if(i.AcctNum == currentVal.AcctNum && i.OpDate == currentVal.OpDate) {
            i = val;
          }
          return i;
        });
      } else {
        val.OpDate = this.selectedDate;
        delete val.AcctNumCrAndDb;
        newVal = this.localAcctPos.concat({ ...val });
      }
      this.setAcctPos(newVal);
    },
  },
});
