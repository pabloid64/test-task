import Vue from "vue";
import template from "./OperatingDays.html";
import Tables from "../Table/Table";
import { mapActions, mapGetters, mapMutations } from "vuex";

const labelOpDate = ["Дата операционного дня"];
const labelOpEntry = ["Счет кредита", "Счет дебета", "Сумма"];

export default Vue.extend({
  template,
  name: "OperatingDays",
  components: {
    Tables,
  },
  data() {
    return {
      selectedDate: "",
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
      loading: "localLoading",
    }),
    rowOpEntry: function () {
      return this.localOpEntry.filter((i) => i.OpDate == this.selectedDate);
    },
    labelOpDate: function () {
      return labelOpDate;
    },
    columnOpDate: function () {
      let res = Object.keys(this.localOpDate[0]);
      return res;
    },
    labelOpEntry: function () {
      return labelOpEntry;
    },
    columnOpEntry: function () {
      let res = Object.keys(this.localOpEntry[0]);
      const index = res.indexOf("OpDate");
      if (index > -1) {
        res.splice(index, 1);
      }
      return res;
    },
  },
  methods: {
    ...mapMutations({
      setOpDate: "setOpDate",
      setOpEntry: "setOpEntry",
    }),
    ...mapActions({
      getOpDate: "getOpDate",
      getOpEntry: "getOpEntry",
    }),
    selectRow(val) {
      this.selectedDate = this.localOpDate[val].OpDate;
    },
    deleteOpDate(val) {
      let newVal = this.localOpDate.filter(i => i.OpDate != val.OpDate);
      this.setOpDate(newVal);
    },
    editOpDate(val, currentVal, isEdit) {
      let newVal;
      if(isEdit) {
        newVal = this.localOpDate.map((i) => {
          if(i.OpDate == currentVal.OpDate) {
            i = val;
          }
          return i;
        });
      } else {
        newVal = this.localOpDate.concat({ ...val });
      }
      this.setOpDate(newVal);
    },
    deleteRowOpEntry(val) {
      let newVal = this.localOpEntry.filter(
        (i) => !(i.AcctNumCr == val.AcctNumCr && i.OpDate == val.OpDate)
      );
      this.setOpEntry(newVal);
    },
    editRowOpEntry(val, currentVal, isEdit) {
      let newVal;
      if(isEdit) {
        newVal = this.localOpEntry.map((i) => {
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
  },
});
