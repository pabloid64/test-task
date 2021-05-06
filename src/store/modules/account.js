import api from "../../services/api.services";

const account = {
  state: {
    acctPos: [],
    acct: [],
    opDate: [],
    opEntry: [],
    loading: false,
  },
  getters: {
    localAcctPos: (state) => state.acctPos,
    localAcct: (state) => state.acct,
    localOpDate: (state) => {
      return state.opDate.sort(function (a, b) {
        return new Date(b.OpDate) - new Date(a.OpDate);
      });
    },
    localOpEntry: (state) => state.opEntry,
    localLoading: (state) => state.loading,
  },
  mutations: {
    setAcctPos: function (state, val) {
      state.acctPos = val;
    },
    setAcct: function (state, val) {
      state.acct = val;
    },
    setOpDate: function (state, val) {
      state.opDate = val;
    },
    setOpEntry: function (state, val) {
      state.opEntry = val;
    },
    setLoading: function (state, val) {
      state.loading = val;
    },
  },
  actions: {
    async getAcctPos({ commit }) {
      try {
        commit("setLoading", true);
        let result = await api.apiAcctPos();
        commit("setAcctPos", result);
        commit("setLoading", false);
      } catch (err) {
        //commit("setAcctPosErr", err);
        console.log(err);
        commit("setLoading", false);
      }
    },
    async getAcct({ commit }) {
      try {
        commit("setLoading", true);
        let result = await api.apiAcct();
        commit("setAcct", result);
        commit("setLoading", false);
      } catch (err) {
        console.log(err);
        commit("setLoading", false);
      }
    },
    async getOpDate({ commit }) {
      try {
        commit("setLoading", true);
        let result = await api.apiOpDate();
        commit("setOpDate", result);
        commit("setLoading", false);
      } catch (err) {
        console.log(err);
        commit("setLoading", false);
      }
    },
    async getOpEntry({ commit }) {
      try {
        commit("setLoading", true);
        let result = await api.apiOpEntry();
        commit("setOpEntry", result);
        commit("setLoading", false);
      } catch (err) {
        console.log(err);
        commit("setLoading", false);
      }
    },
  },
};
export default account;
