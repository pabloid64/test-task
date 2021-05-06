import Vue from "vue";
import template from "./Table.html";

export default Vue.extend({
  template,
  name: "Table",
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedEdit: null,
      isEdit: false,
      currentEdit: null,
      isNew: false,
    };
  },
  methods: {
    selectRow(key) {
      this.$emit("select-row", key);
    },
    editRow(val) {
      this.isNew = false;
      this.isEdit = true;
      this.selectedEdit = { ...val };
      this.currentEdit = val;
    },
    deleteRow(val) {
      this.$emit("delete-row", val);
      this.cancelRow()
    },
    saveRow() {
      this.$emit("edit-row", this.selectedEdit, this.currentEdit, this.isEdit);
      this.cancelRow()
    },
    addRow() {
      this.selectedEdit = {};
      for (let value of this.columns) {
        this.selectedEdit[value] = "";
      }
      this.currentEdit = null;
      this.isNew = true;
    },
    cancelRow() {
      this.isEdit = false;
      this.isNew = false;
      this.selectedEdit = null;
      this.currentEdit = null;
    },
  },
});
