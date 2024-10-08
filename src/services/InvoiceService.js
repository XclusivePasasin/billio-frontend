// src/services/InvoiceService.js
import api from "./Api";

export default {
  getFacturas(params) {
    return api.get("facturas/monitor-facturas", { params }); // Asegúrate de que coincide con el prefijo del blueprint
  },
};
