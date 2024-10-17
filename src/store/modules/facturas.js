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
  procesamiento: '', // Valor predeterminado: 'todas' (puede ser '0', '1', o 'todas')
  tipoDte: '',
  estadoFacturas: '',
  tableData: [],
  page: 1,
  pagination: {
    total: 0,
    per_page: 15,
    pages: 0,
  },
  totalDTE: 0,
  processedDTE: 0,
  unprocessedDTE: 0,
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
  SET_DTE_SUMMARY(state, summary) {
    state.totalDTE = summary.totalDTE;
    state.processedDTE = summary.processedDTE;
    state.unprocessedDTE = summary.unprocessedDTE;
  }
};

const actions = {
  // Acción para obtener las facturas desde el backend
  async fetchFacturas({ commit, state }) {
    try {
      // Determinar el valor del filtro de procesamiento ('0' para no procesadas, '1' para procesadas, '' para todas)
      let estadoFiltro = '';
      if (state.procesamiento === '1') {
        estadoFiltro = '1';
      } else if (state.procesamiento === '0') {
        estadoFiltro = '0';
      }  else if (state.procesamiento === '2') {
        estadoFiltro = '2';
      }
      // Si es 'todas', dejamos el filtro vacío
      

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
        estado: estadoFiltro,  // Enviar el estado (procesamiento)
        tipoDte: state.tipoDte,
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
    
    // Asegurarse de que 'procesamiento' sea un valor aceptado: '0', '1' o vacío para todas
    commit('SET_PROCESAMIENTO', filters.procesamiento || '0');
    
    commit('SET_TIPO_DTE', filters.tipoDte || '');
    commit('SET_ESTADO_FACTURAS', filters.estadoFacturas || '');
    commit('SET_PAGE', 1);  // Reiniciar a la primera página al aplicar filtros
    dispatch('fetchFacturas');  // Volver a cargar las facturas con los filtros aplicados
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
  async fetchDteSummary({ commit }) {
    try {
      const response = await InvoiceService.getDteSummary();
      commit('SET_DTE_SUMMARY', response.data);
    } catch (error) {
      console.error('Error fetching DTE summary:', error);
    }
  }
};

const getters = {
  invoices: (state) => state.tableData,
  pagination: (state) => state.pagination,
  totalDTE: (state) => state.totalDTE,
  processedDTE: (state) => state.processedDTE,
  unprocessedDTE: (state) => state.unprocessedDTE,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
