// src/store/index.js
import { createStore } from 'vuex';
import facturas from './modules/facturas';

const store = createStore({
  modules: {
    facturas,
  },
});

export default store;
