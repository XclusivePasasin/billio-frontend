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
  }
};
