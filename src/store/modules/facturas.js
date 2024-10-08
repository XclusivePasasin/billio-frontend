// src/store/modules/facturas.js
import InvoiceService from '../../services/InvoiceService'; // Ajusta la ruta según tu estructura de carpetas

const state = {
  query: '',
  startDate: '',
  endDate: '',
  tableData: [],
  page: 1,
  pagination: {
    total: 0,
    per_page: 15,
    pages: 0,
  },
};

const mutations = {
  SET_QUERY(state, query) {
    state.query = query;
  },
  SET_START_DATE(state, startDate) {
    state.startDate = startDate;
  },
  SET_END_DATE(state, endDate) {
    state.endDate = endDate;
  },
  SET_FACTURAS(state, data) {
    state.tableData = data.invoices;
    state.pagination = data.pagination;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
};

const actions = {
  async fetchFacturas({ commit, state }) {
    try {
      const response = await InvoiceService.getFacturas({
        query: state.query,
        startDate: state.startDate,
        endDate: state.endDate,
        page: state.page,
      });
      commit('SET_FACTURAS', response.data);
    } catch (error) {
      console.error('Error fetching facturas:', error);
    }
  },
  updateFilters({ commit, dispatch }, { query, startDate, endDate }) {
    commit('SET_QUERY', query);
    commit('SET_START_DATE', startDate);
    commit('SET_END_DATE', endDate);
    commit('SET_PAGE', 1); // Reiniciar a la primera página al cambiar filtros
    dispatch('fetchFacturas');
  },
  changePage({ commit, dispatch }, page) {
    commit('SET_PAGE', page);
    dispatch('fetchFacturas');
  },
};

const getters = {
  invoices: (state) => state.tableData,
  pagination: (state) => state.pagination,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
