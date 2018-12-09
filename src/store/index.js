import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      expenses: []
    },
    mutations: {
      updateExpenses (state, payload) {
        state.expenses = payload;
      },
    },
    actions: {
      fetchExpenses ({commit}) {
          const expenses = JSON.parse(localStorage.getItem('expenses'));
          if (expenses) {
              commit('updateExpenses', expenses);
          }
      },
      addExpenses ({commit, getters}, payload) {
        let expenses = [...getters.getExpenses];
        expenses.push(payload)
        localStorage.setItem('expenses', JSON.stringify(expenses));
        commit('updateExpenses', expenses);
      },
      editExpenses ({commit, getters}, payload) {
        let expenses = [...getters.getExpenses];
        const item = expenses.find(exp => {
          if (exp.id === payload.id) {
              exp.description = payload.description;
              exp.amount = payload.amount;
              exp.date = payload.date;
          }
          return
        })
        localStorage.setItem('expenses', JSON.stringify(expenses));
        commit('updateExpenses', expenses);
      },
      delete ({commit, getters}, payload) {
        const expenses = getters.getExpenses.filter((item) => {
            return item.id !== payload.id
        })
        localStorage.setItem('expenses', JSON.stringify(expenses));
        commit('updateExpenses', expenses);
      },
    },
    getters: {
      getExpenses (state) {
        return state.expenses;
      },
  },
});
