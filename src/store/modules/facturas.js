// src/store/modules/facturas.js
import InvoiceService from '../../services/InvoiceService'; // Ajusta la ruta según tu estructura de carpetas

const state = {
  query: '',
  startDate: '',
  endDate: '',
  nombreEmpresa: '',
  nrcEmisor: '',
  nitEmisor: '',
  numeroControl: '',
  codigoGeneracion: '',
  selloRecepcion: '',
  tipoDocumento: '',
  procesamiento: 'todas', // Valor predeterminado
  tipoDte: '',
  estadoFacturas: '',
  tableData: [],
  page: 1,
  pagination: {
    total: 0,
    per_page: 15,
    pages: 0,
  },
};

const mutations = {
  // Mutaciones para actualizar los filtros básicos
  SET_QUERY(state, query) {
    state.query = query;
  },
  SET_START_DATE(state, startDate) {
    state.startDate = startDate;
  },
  SET_END_DATE(state, endDate) {
    state.endDate = endDate;
  },

  // Mutaciones para actualizar los filtros avanzados
  SET_NOMBRE_EMPRESA(state, nombreEmpresa) {
    state.nombreEmpresa = nombreEmpresa;
  },
  SET_NRC_EMISOR(state, nrcEmisor) {
    state.nrcEmisor = nrcEmisor;
  },
  SET_NIT_EMISOR(state, nitEmisor) {
    state.nitEmisor = nitEmisor;
  },
  SET_NUMERO_CONTROL(state, numeroControl) {
    state.numeroControl = numeroControl;
  },
  SET_CODIGO_GENERACION(state, codigoGeneracion) {
    state.codigoGeneracion = codigoGeneracion;
  },
  SET_SELLO_RECEPCION(state, selloRecepcion) {
    state.selloRecepcion = selloRecepcion;
  },
  SET_TIPO_DOCUMENTO(state, tipoDocumento) {
    state.tipoDocumento = tipoDocumento;
  },
  SET_PROCESAMIENTO(state, procesamiento) {
    state.procesamiento = procesamiento;
  },
  SET_TIPO_DTE(state, tipoDte) {
    state.tipoDte = tipoDte;
  },
  SET_ESTADO_FACTURAS(state, estadoFacturas) {
    state.estadoFacturas = estadoFacturas;
  },

  // Mutaciones para actualizar los datos de facturas y la paginación
  SET_FACTURAS(state, data) {
    state.tableData = data.invoices;
    state.pagination = data.pagination;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
};

const actions = {
  // Acción para obtener las facturas desde el backend
  async fetchFacturas({ commit, state }) {
    try {
      const response = await InvoiceService.getFacturas({
        query: state.query,
        startDate: state.startDate,
        endDate: state.endDate,
        nombreEmpresa: state.nombreEmpresa,
        nrcEmisor: state.nrcEmisor,
        nitEmisor: state.nitEmisor,
        numeroControl: state.numeroControl,
        codigoGeneracion: state.codigoGeneracion,
        selloRecepcion: state.selloRecepcion,
        tipoDocumento: state.tipoDocumento,
        procesamiento: state.procesamiento,
        tipoDte: state.tipoDte,
        estadoFacturas: state.estadoFacturas,
        page: state.page,
      });
      commit('SET_FACTURAS', response.data);
    } catch (error) {
      console.error('Error fetching facturas:', error);
    }
  },

  // Acción para actualizar filtros básicos
  updateFilters({ commit, dispatch }, { query, startDate, endDate }) {
    commit('SET_QUERY', query);
    commit('SET_START_DATE', startDate);
    commit('SET_END_DATE', endDate);
    commit('SET_PAGE', 1); // Reiniciar a la primera página al cambiar filtros
    dispatch('fetchFacturas');
  },

  // Acción para aplicar filtros avanzados
  applyAdvancedFilters({ commit, dispatch }, filters) {
    commit('SET_NOMBRE_EMPRESA', filters.nombreEmpresa || '');
    commit('SET_NRC_EMISOR', filters.nrcEmisor || '');
    commit('SET_NIT_EMISOR', filters.nitEmisor || '');
    commit('SET_NUMERO_CONTROL', filters.numeroControl || '');
    commit('SET_CODIGO_GENERACION', filters.codigoGeneracion || '');
    commit('SET_SELLO_RECEPCION', filters.selloRecepcion || '');
    commit('SET_TIPO_DOCUMENTO', filters.tipoDocumento || '');
    commit('SET_PROCESAMIENTO', filters.procesamiento || 'todas');
    commit('SET_TIPO_DTE', filters.tipoDte || '');
    commit('SET_ESTADO_FACTURAS', filters.estadoFacturas || '');
    commit('SET_PAGE', 1); // Reiniciar a la primera página al aplicar filtros
    dispatch('fetchFacturas');
  },

  // Acción para actualizar filtros avanzados en tiempo real (si es necesario)
  updateAdvancedFilters({ commit }, filters) {
    commit('SET_NOMBRE_EMPRESA', filters.nombreEmpresa);
    commit('SET_NRC_EMISOR', filters.nrcEmisor);
    commit('SET_NIT_EMISOR', filters.nitEmisor);
    commit('SET_NUMERO_CONTROL', filters.numeroControl);
    commit('SET_CODIGO_GENERACION', filters.codigoGeneracion);
    commit('SET_SELLO_RECEPCION', filters.selloRecepcion);
    commit('SET_TIPO_DOCUMENTO', filters.tipoDocumento);
    commit('SET_PROCESAMIENTO', filters.procesamiento);
    commit('SET_TIPO_DTE', filters.tipoDte);
    commit('SET_ESTADO_FACTURAS', filters.estadoFacturas);
    // No llamar a fetchFacturas aquí para mantener el control manual
  },

  // Acción para cambiar la página
  changePage({ commit, dispatch }, page) {
    commit('SET_PAGE', page);
    dispatch('fetchFacturas');
  },

  // Acción para limpiar filtros avanzados
  clearAdvancedFilters({ commit, dispatch }) {
    commit('SET_NOMBRE_EMPRESA', '');
    commit('SET_NRC_EMISOR', '');
    commit('SET_NIT_EMISOR', '');
    commit('SET_NUMERO_CONTROL', '');
    commit('SET_CODIGO_GENERACION', '');
    commit('SET_SELLO_RECEPCION', '');
    commit('SET_TIPO_DOCUMENTO', '');
    commit('SET_PROCESAMIENTO', 'todas');
    commit('SET_TIPO_DTE', '');
    commit('SET_ESTADO_FACTURAS', '');
    commit('SET_QUERY', '');
    commit('SET_START_DATE', '');
    commit('SET_END_DATE', '');
    commit('SET_PAGE', 1); // Reiniciar a la primera página al limpiar filtros
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
