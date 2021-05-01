import Vue from "vue";
import template from "./Table.html";

export default Vue.extend({
  template,
  name: "Table",
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({}),

  computed: {},
  methods: {
    test(key){
        this.$emit('select-row', key)
    }
  },
});
