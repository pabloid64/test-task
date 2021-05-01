import api from "../../services/api.services";

const account = {
  state: {
    acttPos: [],
    actt: [],
    opDate: [],
    opEntry: [],
    loading: false,
  },
  getters: {
    localActtPos: (state) => state.acttPos,
    localActt: (state) => state.actt,
    localOpDate: (state) => {
        return state.opDate.sort(function(a, b) {
            return new Date(b.OpDate) - new Date(a.OpDate);
        })
    },
    localOpEntry: (state) => state.opEntry,
    localLoading: (state) => state.loading
  },
  mutations: {
    setActtPos: function (state, val) {
      state.acttPos = val;
    },
    setActt: function (state, val) {
      state.actt = val;
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
        commit("setActtPos", result);
        commit("setLoading", false);
      } catch (err) {
        //commit("setActtPosErr", err);
        console.log(err);
        commit("setLoading", false);
      }
    },
    async getAcct({ commit }) {
      try {
        commit("setLoading", true);
        let result = await api.apiAcct();
        commit("setActt", result);
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
