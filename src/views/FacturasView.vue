<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <HeaderComponent />
      <!-- Filtros de búsqueda -->
      <div class="container mx-auto p-6 flex-1 flex flex-col overflow-y-auto">
        <div class="flex space-x-4 mb-6">
          <input v-model="query" type="text" placeholder="Buscar"
            class="w-54 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="startDate" type="date" placeholder="Desde"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="endDate" type="date" placeholder="Hasta"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <!-- Botón para filtrar facturas -->
          <button @click="openFilterModal"
            class="flex items-center w-35 px-6 py-2 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-filter mr-2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtrar
          </button>
          <button
            class="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            Procesar
          </button>
          <button
            class="flex px-6 py-2 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2">
            Descargar
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-download ml-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </button>
        </div>

        <!-- Tabla con scroll invisible -->
        <div class="overflow-x-auto flex-grow scrollbar-none">
          <table class="w-full bg-white shadow-md rounded-lg overflow-y-auto">
            <thead class="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de emisor
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NRC Emisor
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIT Emisor
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número de control
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código Generación
                </th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sello de Recepción
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Procesar
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-4 py-4 w-48 break-words text-sm text-gray-900">
                  {{ item.nom_emisor }}
                </td>
                <td class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.nrc_emisor }}
                </td>
                <td class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.nit_emisor }}
                </td>
                <td class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.fecha_emision }}
                </td>
                <td class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.num_control }}
                </td>
                <td class="px-4 py-4 w-50 break-words text-sm text-gray-900">
                  {{ item.cod_gen }}
                </td>
                <td class="px-4 py-4 w-40 text-center text-sm text-gray-900 break-all overflow-wrap break-word">
                  {{ item.sello_recepcion }}
                </td>
                <td class="px-4 py-4 w-30 break-words text-sm text-gray-900">
                  {{ item.monto }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-900">
                  <input type="checkbox" class="form-checkbox h-5 w-5" />
                </td>
                <td class="px-4 py-4 text-sm text-gray-900">
                  <div class="flex flex-col space-y-2">
                    <button class="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700">
                      PDF
                    </button>
                    <button class="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
                      DTE
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal de Filtros Avanzados -->
        <transition name="modal">
          <div v-if="isFilterModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg z-50">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Filtros Avanzados</h2>
                <button @click="closeFilterModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <!-- Campo Buscar por nombre de la empresa -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.nombreEmpresa" placeholder="Buscar por nombre de la empresa"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Campo Buscar por NRC Emisor -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.nrcEmisor" placeholder="Buscar por NRC Emisor"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Campo Buscar por NIT Emisor -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.nitEmisor" placeholder="Buscar por NIT Emisor"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Campo Buscar por Número de Control -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.numeroControl" placeholder="Buscar por Número de Control"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Campo Buscar por Código de Generación -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.codigoGeneracion" placeholder="Buscar por Código de Generación"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Campo Buscar por Sello de Recepción -->
              <div class="mb-6 relative">
                <input type="text" v-model="filters.selloRecepcion" placeholder="Buscar por Sello de Recepción"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none" />
              </div>

              <!-- Seleccionar tipo de documento -->
              <div class="mb-6 relative">
                <select v-model="filters.tipoDocumento"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none">
                  <option value="" disabled selected>Seleccione el tipo de documento</option>
                  <option value="factura">Factura</option>
                  <option value="credito_fiscal">Crédito Fiscal</option>
                </select>
              </div>

              <!-- Seleccionar por procesamiento -->
              <div class="mb-6 relative">
                <select v-model="filters.procesamiento"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none">
                  <option value="" disabled selected>Seleccione el tipo de procesamiento</option>
                  <option value="no_procesadas">No procesadas</option>
                  <option value="procesadas">Procesadas</option>
                  <option value="todas">Todas</option>
                </select>
              </div>

              <!-- Botones de acción -->
              <div class="flex justify-center space-x-4">
                <button @click="clearFilters"
                  class="px-8 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">Limpiar filtros</button>
                <button @click="applyFilters"
                  class="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">Aplicar Filtros</button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Controles de Paginación -->
        <div class="flex justify-between items-center mt-4">
          <button :disabled="page === 1" @click="prevPage"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 disabled:bg-gray-200">
            Anterior
          </button>
          <div class="text-gray-800">
            Página {{ page }} de {{ pagination.pages }}
          </div>
          <button :disabled="page === pagination.pages" @click="nextPage"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 disabled:bg-gray-200">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import SideBar from "../components/SideBar.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

// Acceder al store de Vuex
const store = useStore();

// Estado para controlar la visibilidad del modal de filtros
const isFilterModalOpen = ref(false);

// Estado reactivo para los filtros avanzados
const filters = reactive({
  nombreEmpresa: '',
  nrcEmisor: '',
  nitEmisor: '',
  numeroControl: '',
  codigoGeneracion: '',
  selloRecepcion: '',
  tipoDocumento: '',
  procesamiento: ''
});

// Variables reactivas vinculadas al store para búsqueda y fechas
const query = ref("");
const startDate = ref("");
const endDate = ref("");

// Computed properties para obtener los datos de la tabla y la paginación desde Vuex
const tableData = computed(() => store.getters['facturas/invoices']);
const pagination = computed(() => store.getters['facturas/pagination']);
const page = ref(1); // Página actual

// Función para obtener las facturas desde el backend
const fetchFacturas = async () => {
  try {
    await store.dispatch('facturas/fetchFacturas', { 
      page: page.value, 
      filters: { 
        ...filters,
        query: query.value,
        startDate: startDate.value,
        endDate: endDate.value
      } 
    });
  } catch (error) {
    console.error("Error fetching facturas:", error);
  }
};

// Watchers para filtros en tiempo real (búsqueda rápida)
watch([query, startDate, endDate], ([newQuery, newStartDate, newEndDate]) => {
  store.dispatch('facturas/updateFilters', {
    query: newQuery,
    startDate: newStartDate,
    endDate: newEndDate,
  });
  fetchFacturas();
});


// Funciones para paginación
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    store.dispatch('facturas/changePage', page.value);
    fetchFacturas();
  }
};

const nextPage = () => {
  if (page.value < pagination.value.pages) {
    page.value += 1;
    store.dispatch('facturas/changePage', page.value);
    fetchFacturas();
  }
};

// Funciones para manejar el modal de filtros
const openFilterModal = () => {
  isFilterModalOpen.value = true;
};

const closeFilterModal = () => {
  isFilterModalOpen.value = false;
};

const applyFilters = () => {
  const advancedFilters = {
    nombreEmpresa: filters.nombreEmpresa || '',    // Filtrar por nombre de la empresa
    nrcEmisor: filters.nrcEmisor || '',            // Filtrar por NRC del emisor
    nitEmisor: filters.nitEmisor || '',            // Filtrar por NIT del emisor
    numeroControl: filters.numeroControl || '',      // Filtrar por número de control
    codigoGeneracion: filters.codigoGeneracion || '',// Filtrar por código de generación
    selloRecepcion: filters.selloRecepcion || '',    // Filtrar por sello de recepción
    tipoDte: filters.tipoDocumento || '',           // Filtrar por tipo de documento
    estadoFacturas: filters.procesamiento || 'todas'// Filtrar por estado de procesamiento
  };

  // Despacha los filtros al store
  store.dispatch('facturas/applyAdvancedFilters', advancedFilters);

  // Llama a la función para obtener las facturas filtradas
  fetchFacturas();

  // Cierra el modal de filtros avanzados si está abierto
  closeFilterModal();
};


// Función para limpiar los filtros avanzados
const clearFilters = () => {
  Object.assign(filters, {
    nombreEmpresa: '',
    nrcEmisor: '',
    nitEmisor: '',
    numeroControl: '',
    codigoGeneracion: '',
    selloRecepcion: '',
    tipoDocumento: '',
    procesamiento: ''
  });
  store.dispatch('facturas/clearAdvancedFilters');
  fetchFacturas();
  closeFilterModal();

};

// Cargar las facturas cuando se monta el componente
onMounted(() => {
  fetchFacturas();
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-to, .modal-leave-from {
  opacity: 1;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;  /* IE y Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>
