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
              type="text"
              placeholder="Buscar"
              class="flex-grow px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Desde"
              class="w-40 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Hasta"
              class="w-40 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Filtrar
            </button>
            <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Procesar
            </button>
            <button class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nombre }} Nombre</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nrc }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nit }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.fecha }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.numeroControl }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.codigoGeneracion }}</td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.selloRecepcion }}</td>
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
import SideBar from "../components/SideBar.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
</script>

<style scoped></style>
