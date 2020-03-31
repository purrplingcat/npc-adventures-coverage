export const state = () => ({
  report: {}
});

export const mutations = {
  set(state, reportData) {
    state.report = reportData;
  }
};

export const actions = {
  async load({ commit }) {
    commit('set', await (await fetch('/reports')).json());
  }
}
