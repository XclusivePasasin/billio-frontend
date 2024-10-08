<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <HeaderComponent />
      <!--Filtros de busqueda-->
      <div class="container mx-auto p-6 flex-1 flex flex-col overflow-y-auto">
        <div class="flex space-x-4 mb-6">
          <input
            v-model="query"
            type="text"
            placeholder="Buscar"
            class="w-54 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="startDate"
            type="date"
            placeholder="Desde"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="endDate"
            type="date"
            placeholder="Hasta"
            class="w-50 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="fetchFacturas"
            class="flex items-center w-35 px-6 py-2 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-filter mr-2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtrar
          </button>
          <button
            class="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Procesar
          </button>
          <button
            class="flex px-6 py-2 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          >
            Descargar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download ml-2"
            >
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
              <tr
                v-for="(item, index) in tableData"
                :key="index"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
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
                <td
                  class="px-4 py-4 w-40 text-center text-sm text-gray-900 break-all overflow-wrap break-word"
                >
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

        <!-- Pagination controls -->
        <div class="flex justify-between items-center mt-4">
          <button
            :disabled="page === 1"
            @click="prevPage"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
          >
            Anterior
          </button>
          <div class="text-gray-800">
            Página {{ page }} de {{ pagination.pages }}
          </div>
          <button
            :disabled="page === pagination.pages"
            @click="nextPage"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import SideBar from "../components/SideBar.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

// Acceder al store de Vuex
const store = useStore();

// Variables reactivas vinculadas al store
const query = ref("");
const startDate = ref("");
const endDate = ref("");
const tableData = computed(() => store.getters['facturas/invoices']);
const pagination = computed(() => store.getters['facturas/pagination']);
const page = ref(1); // Página actual

// Función para obtener las facturas desde el backend
const fetchFacturas = async () => {
  try {
    await store.dispatch('facturas/fetchFacturas');
  } catch (error) {
    console.error("Error fetching facturas:", error);
  }
};

// Watchers para filtros en tiempo real
watch([query, startDate, endDate], ([newQuery, newStartDate, newEndDate]) => {
  store.dispatch('facturas/updateFilters', {
    query: newQuery,
    startDate: newStartDate,
    endDate: newEndDate,
  });
});

// Funciones para paginación
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    store.dispatch('facturas/changePage', page.value);
  }
};

const nextPage = () => {
  if (page.value < pagination.value.pages) {
    page.value += 1;
    store.dispatch('facturas/changePage', page.value);
  }
};

// Cargar las facturas cuando se monta el componente
onMounted(() => {
  fetchFacturas();
});
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none; /* IE y Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
