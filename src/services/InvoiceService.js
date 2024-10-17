import api from "./Api";

export default {
  getFacturas(params) {
    return api.get("facturas/monitor-facturas", { params });
  },
  downloadFacturas(params) {
    return api.get("facturas/downloads-dtes", {
      params,
      responseType: 'blob' // Asegúrate de que esto esté dentro del mismo objeto de configuración
    });
  },
  updateFacturas(id_list) {
    return api.post("facturas/actualizar-facturas", { id_list });
  },
  getDteSummary() {
    return api.get("facturas/dte/summary");
  },
  configureRoute(ruta){
    return api.post("facturas/configurar/ruta-pdf", { ruta });
  },
  viewFacturaPDF(codGen) { 
    // Esto apunta a la ruta que muestra el PDF
    return api.get(`facturas/pdf/${codGen}.pdf`, {
      responseType: 'blob' // Para manejar el archivo PDF correctamente
    });
  },
  viewDte(codGen) {
    // Esta API devuelve el DTE según el código de generación
    return api.get(`facturas/dte/${codGen}`);
  }
};
