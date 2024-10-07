<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <HeaderComponent />
      <div class="container mx-auto p-6">
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
          <button @click="fetchFacturas" class=" w-35 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Filtrar
          </button>
          <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Procesar
          </button>
          <button class=" px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Descargar
          </button>
        </div>
  
        <div class="overflow-x-auto">
          <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-100 sticky top-0 z-10">
              <tr>
                <!-- Column Headers -->
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de emisor</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NRC Emisor</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIT Emisor</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de control</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Generación</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sello de Recepción</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Procesar</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <!-- Table Rows -->
              <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nom_emisor }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nrc_emisor }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nit_emisor }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.fecha_emision }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.num_control }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.cod_gen }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.sello_recepcion }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.monto }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <!-- Buttons for PDF and JSON -->
                  <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                    Ver PDF
                  </button>
                  <button class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Ver JSON
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SideBar from "../components/SideBar.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import InvoiceService from '../services/InvoiceService';  // Asegúrate de que tienes el servicio configurado

// Variables reactivas
const query = ref('');
const startDate = ref('');
const endDate = ref('');
const tableData = ref([]);

// Función para obtener las facturas desde el backend
const fetchFacturas = async () => {
  try {
    const response = await InvoiceService.getFacturas({
      query: query.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });
    tableData.value = response.data.invoices;
  } catch (error) {
    console.error('Error fetching facturas:', error);
  }
};

// Cargar las facturas cuando se monta el componente
onMounted(() => {
  fetchFacturas();
});
</script>

<style scoped></style>
