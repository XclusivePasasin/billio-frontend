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
            class="w-54 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-500" />
          <input v-model="startDate" type="date" placeholder="Desde"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-500" />
          <input v-model="endDate" type="date" placeholder="Hasta"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-gray-500" />
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
            class="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            @click="processSelectedFacturas">
            Procesar
          </button>

          <button
            class="flex px-6 py-2 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            @click="downloadFacturas">
            Descargar
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-download ml-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </button>
          <!-- Alertas -->
          <AlertComponent v-if="alert.show" :type="alert.type" :title="alert.title" :message="alert.message"
            :list="alert.list" :show="alert.show" />
        </div>

        <!-- Notificación de copiado (fuera de la tabla) -->
        <div v-if="isCopied"
          class="text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-0': !isCopied, 'opacity-90': isCopied }">
          ¡Texto copiado!
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
                  Detalle
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
                <td @click="copyToClipboard(item.nom_emisor)" class="px-4 py-4 w-48 break-words text-sm text-gray-900">
                  {{ item.nom_emisor }}
                </td>
                <td @click="copyToClipboard(item.nrc_emisor)" class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.nrc_emisor }}
                </td>
                <td @click="copyToClipboard(item.nit_emisor)" class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.nit_emisor }}
                </td>
                <td @click="copyToClipboard(item.fecha_emision)"
                  class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.fecha_emision }}
                </td>
                <td @click="copyToClipboard(item.num_control)" class="px-4 py-4 w-40 break-words text-sm text-gray-900">
                  {{ item.num_control }}
                </td>
                <td @click="copyToClipboard(item.cod_gen)" class="px-4 py-4 w-50 break-words text-sm text-gray-900">
                  {{ item.cod_gen }}
                </td>
                <td @click="copyToClipboard(item.sello_recepcion)"
                  class="px-4 py-4 w-40 text-center text-sm text-gray-900 break-all overflow-wrap break-word">
                  {{ item.sello_recepcion }}
                </td>
                <td @click="copyToClipboard(item.monto)" class="px-4 py-4 w-30 break-words text-sm text-gray-900">
                  {{ item.monto }}
                </td>
                <td class="px-4 py-4 w-40 text-center text-sm text-gray-900 break-all overflow-wrap break-word">
                  <Button @click="openDetailsModal(item)" class="text-sky-500 rounded-full hover:text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-file-text">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  </Button>
                </td>
                <td class="px-4 py-4 text-sm text-gray-900">
                  <input type="checkbox" class="form-checkbox h-5 w-5" :value="item.id"
                    @change="toggleSelection(item.id)" :checked="selectedFacturas.includes(item.id)"
                    :disabled="item.procesada === '1'" />
                </td>

                <td class="px-4 py-4 text-sm text-gray-900">
                  <div class="flex flex-col space-y-2">
                    <button class="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700"
                      @click="openPDFModal(item.cod_gen)">
                      PDF
                    </button>
                    <button class="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
                      @click="openDteModal(item.cod_gen)">
                      DTE
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal para el PDF -->
        <transition name="modal">
          <div v-if="isPDFModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="bg-white w-full max-w-5xl p-6 rounded-lg shadow-lg z-50">
              <!-- max-w-5xl agranda el ancho del modal -->
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Vista Previa del PDF</h2>
                <button @click="closePDFModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <iframe :src="pdfUrl" class="w-full h-[600px]"></iframe> <!-- Altura aumentada a 600px -->
            </div>
          </div>
        </transition>

        <!-- Modal para el DTE (JSON) -->
        <transition name="modal">
          <div v-if="isDteModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="bg-white w-full max-w-5xl p-6 rounded-lg shadow-lg z-50"> <!-- max-w-5xl agranda el modal -->
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Vista Previa del DTE</h2>
                <button @click="closeDteModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <!-- Aplicamos un estilo de código con colores para mejorar la legibilidad del JSON -->
              <pre class="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[600px] text-sm" style="color: #0c0c0d;">
                <code v-html="formattedDteContent"></code>
              </pre>
            </div>
          </div>
        </transition>

        <!-- Modal para ver Subtotal, IVA y otros detalles -->
        <transition name="modal">
          <div v-if="isDetailsModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg z-50">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Detalle de Factura</h2>
                <button @click="closeDetailsModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <!-- Tipo de Documento -->
              <div class="mb-4">
                <p class="text-lg font-semibold">Tipo de Documento:</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.tipo_dte)">
                  {{ selectedFactura.tipo_dte }}
                </p>
              </div>

              <!-- NIT Emisor -->
              <div class="mb-4">
                <p class="text-lg font-semibold">NIT del Emisor:</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.nit_emisor)">
                  {{ selectedFactura.nit_emisor }}
                </p>
              </div>

              <!-- NRC Emisor -->
              <div class="mb-4">
                <p class="text-lg font-semibold">NRC del Emisor:</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.nrc_emisor)">
                  {{ selectedFactura.nrc_emisor }}
                </p>
              </div>

              <!-- Nombre del Emisor -->
              <div class="mb-4">
                <p class="text-lg font-semibold">Nombre del Emisor:</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.nom_emisor)">
                  {{ selectedFactura.nom_emisor }}
                </p>
              </div>

              <!-- Subtotal -->
              <div class="mb-4">
                <p class="text-lg font-semibold">Subtotal:</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.subtotal)">
                  {{ selectedFactura.subtotal }}
                </p>
              </div>

              <!-- IVA -->
              <div class="mb-4">
                <p class="text-lg font-semibold">IVA (13%):</p>
                <p class="text-gray-800 cursor-pointer" @click="copyToClipboard(selectedFactura.iva)">
                  {{ selectedFactura.iva }}
                </p>
              </div>

              <!-- Botón para cerrar el modal -->
              <div class="flex justify-end">
                <button @click="closeDetailsModal"
                  class="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </transition>


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
                  <option value="" disabled selected>
                    Seleccione el tipo de documento
                  </option>
                  <option value="factura">Factura</option>
                  <option value="credito_fiscal">Crédito Fiscal</option>
                </select>
              </div>

              <!-- Seleccionar por procesamiento -->
              <div class="mb-6 relative">
                <select v-model="filters.procesamiento"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none">
                  <option value="" disabled selected>
                    Seleccione el tipo de procesamiento
                  </option>
                  <option value="2">Todas</option>
                  <option value="0">No procesadas</option>
                  <option value="1">Procesadas</option>
                </select>
              </div>

              <!-- Botones de acción -->
              <div class="flex justify-center space-x-4">
                <button @click="clearFilters" class="px-8 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
                  Limpiar filtros
                </button>
                <button @click="applyFilters" class="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  Aplicar Filtros
                </button>
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
import InvoiceService from "../services/InvoiceService.js";
import AlertComponent from "../components/AlertComponent.vue";

// Variables reactivas
const pdfUrl = ref("");
const isPDFModalOpen = ref(false);
const dteContent = ref(null);
const isDteModalOpen = ref(false);
const formattedDteContent = ref('');

// Acceder al store de Vuex
const store = useStore();

// Estado para controlar la visibilidad del modal de filtros
const isFilterModalOpen = ref(false);

// Estado reactivo para los filtros avanzados
const filters = reactive({
  nombreEmpresa: "",
  nrcEmisor: "",
  nitEmisor: "",
  numeroControl: "",
  codigoGeneracion: "",
  selloRecepcion: "",
  tipoDocumento: "",
  procesamiento: "",
});

// Estado reactivo para la alerta
const alert = reactive({
  show: false,
  type: "",
  title: "",
  message: "",
  list: [],
});

const showAlert = (type, title, message = "", list = []) => {
  Object.assign(alert, { show: true, type, title, message, list });
  setTimeout(() => (alert.show = false), 3000);
};

const isCopied = ref(false);
const isDetailsModalOpen = ref(false);

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showAlert(
        "success",
        "Texto copiado",
        "El texto se ha copiado correctamente."
      );
    })
    .catch((err) => {
      showAlert(
        "error",
        "Error",
        "No se pudo copiar el texto al portapapeles."
      );
      console.error("Error al copiar al portapapeles:", err);
    });
};

// Variables para búsqueda y fechas
const query = ref("");
const startDate = ref("");
const endDate = ref("");

// Computed properties
const tableData = computed(() => store.getters["facturas/invoices"]);
const pagination = computed(() => store.getters["facturas/pagination"]);
const page = computed(() => store.state.facturas.page);

// Obtener facturas
const fetchFacturas = async () => {
  try {
    await store.dispatch("facturas/fetchFacturas");
  } catch (error) {
    showAlert("error", "Error", "Error al obtener las facturas.");
    console.error("Error fetching facturas:", error);
  }
};

// Watchers para filtros en tiempo real
watch([query, startDate, endDate], ([newQuery, newStartDate, newEndDate]) => {
  store.dispatch("facturas/updateFilters", {
    query: newQuery,
    startDate: newStartDate,
    endDate: newEndDate,
  });
  fetchFacturas();
});

// Funciones para paginación
const prevPage = () => {
  if (page.value > 1) {
    store.dispatch("facturas/changePage", page.value - 1);
    fetchFacturas();
  }
};

const nextPage = () => {
  if (page.value < pagination.value.pages) {
    store.dispatch("facturas/changePage", page.value + 1);
    fetchFacturas();
  }
};

// Manejo del modal de filtros
const openFilterModal = () => (isFilterModalOpen.value = true);
const closeFilterModal = () => (isFilterModalOpen.value = false);

// Aplicar filtros avanzados
const applyFilters = () => {
  store.dispatch("facturas/applyAdvancedFilters", filters);
  fetchFacturas();
  closeFilterModal();
};

// Estado reactivo para almacenar los detalles de la factura seleccionada
const selectedFactura = reactive({
  subtotal: 0,
  iva: 0,
  tipo_dte: "",
  nit_emisor: "",
  nrc_emisor: "",
  nom_emisor: "",
});

const parseTipoDte = (codigo) => {
  const tiposDte = {
    "03": "Comprobante de crédito",
    "05": "Nota de crédito",
    "06": "Nota de débito",
    11: "Factura de exportación",
    12: "Declaración de mercancía",
    13: "Mandamiento de ingreso",
  };
  return tiposDte[codigo] || "Tipo de documento desconocido";
};

// Función para abrir el modal con los detalles de la factura seleccionada
const openDetailsModal = (factura) => {
  selectedFactura.subtotal = factura.subtotal;
  selectedFactura.iva = factura.iva;
  selectedFactura.tipo_dte = parseTipoDte(factura.tipo_dte); // Parsear tipo_dte
  selectedFactura.nit_emisor = factura.nit_emisor;
  selectedFactura.nrc_emisor = factura.nrc_emisor;
  selectedFactura.nom_emisor = factura.nom_emisor;
  isDetailsModalOpen.value = true;
};

// Función para cerrar el modal
const closeDetailsModal = () => {
  isDetailsModalOpen.value = false;
};

// Limpiar filtros
const clearFilters = () => {
  Object.assign(filters, {
    nombreEmpresa: "",
    nrcEmisor: "",
    nitEmisor: "",
    numeroControl: "",
    codigoGeneracion: "",
    selloRecepcion: "",
    tipoDocumento: "",
    procesamiento: "",
  });
  store.dispatch("facturas/clearAdvancedFilters");
  fetchFacturas();
  closeFilterModal();
};

// Descargar facturas
const downloadFacturas = async () => {
  if (!startDate.value || !endDate.value) {
    showAlert("error", "Error", "Debe ingresar un rango de fechas válido.");
    return;
  }
  try {
    const response = await InvoiceService.downloadFacturas(
      { startDate: startDate.value, endDate: endDate.value },
      { responseType: "blob" }
    );
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Facturas_${startDate.value}_${endDate.value}.zip`;
    link.click();
    URL.revokeObjectURL(url);
    showAlert("success", "Éxito", "Descarga completada con éxito.");
  } catch (error) {
    showAlert("error", "Error", "Error al descargar las facturas.");
    console.error("Error downloading facturas:", error);
  }
};

// Facturas seleccionadas
const selectedFacturas = ref([]);

const toggleSelection = (id) => {
  if (selectedFacturas.value.includes(id)) {
    selectedFacturas.value = selectedFacturas.value.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedFacturas.value.push(id);
  }
};

// Procesar facturas seleccionadas
const processSelectedFacturas = async () => {
  if (!selectedFacturas.value.length) {
    showAlert(
      "error",
      "Error",
      "No has seleccionado ninguna factura para procesar."
    );
    return;
  }
  try {
    await InvoiceService.updateFacturas(selectedFacturas.value);
    showAlert("success", "Éxito", "Facturas procesadas correctamente.");
    selectedFacturas.value = [];
    fetchFacturas(); // Actualizar la lista de facturas
  } catch (error) {
    showAlert(
      "error",
      "Error",
      error.message || "Ocurrió un error al procesar las facturas."
    );
  }
};

// Montaje del componente
onMounted(() => {
  fetchFacturas();
});

const openPDFModal = async (codigoGeneracion) => {
  isPDFModalOpen.value = true;

  try {
    // Llamada a la API para obtener el PDF por código de generación
    const response = await InvoiceService.viewFacturaPDF(codigoGeneracion);
    const blob = new Blob([response.data], { type: 'application/pdf' });
    pdfUrl.value = URL.createObjectURL(blob); // Crear URL del blob para el iframe
  } catch (error) {
    console.error("Error al cargar el PDF:", error);
    showAlert("error", "Error", "Error al cargar el PDF.");
  }
};

const closePDFModal = () => {
  isPDFModalOpen.value = false;
  pdfUrl.value = ""; // Limpiar la URL cuando se cierre el modal
};

// Función para abrir el modal y formatear el JSON
const openDteModal = async (codigoGeneracion) => {
  try {
    const response = await InvoiceService.viewDte(codigoGeneracion);
    dteContent.value = response.data;
    
    // Formatear el JSON
    formattedDteContent.value = syntaxHighlight(JSON.stringify(dteContent.value, null, 2));

    isDteModalOpen.value = true;
  } catch (error) {
    console.error("Error al abrir el DTE:", error);
    showAlert("error", "Error", "Error al abrir el DTE.");
  }
};

// Función para colorear el JSON
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\d+)/g, function (match) {
    let cls = 'text-red-600'; // Clase para las claves
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-green-600'; // Clase para los valores tipo string
      } else {
        cls = 'text-blue-600'; // Clase para las claves
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-indigo-600'; // Clase para booleanos
    } else if (/null/.test(match)) {
      cls = 'text-gray-600'; // Clase para null
    } else {
      cls = 'text-purple-600'; // Clase para números
    }
    return `<span class="${cls}">${match}</span>`;
  });
}


const closeDteModal = () => {
  isDteModalOpen.value = false;
};

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;
  /* IE y Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Estilos adicionales */
.container {
  display: flex;
  flex-direction: column;
}

.filter-section {
  margin-bottom: 20px;
}

.table-section {
  flex: 1;
}
</style>
