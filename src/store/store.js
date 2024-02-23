import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isCierre: false,
      isPais: false,
      isFecha: false,
    };
  },
  mutations: {
    setCierre(state, value) {
      state.isCierre = value;
    },
    setPais(state, value) {
      state.isPais = value;
    },
    setFecha(state, value) {
        state.isFecha = value;
      },
  },
});