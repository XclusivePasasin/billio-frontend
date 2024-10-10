import api from "./Api";

export default {
  getFacturas(params) {
    return api.get("facturas/monitor-facturas", { params }); 
  },
};

