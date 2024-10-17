<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <SideBar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <HeaderComponent />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Formulario de Información del Usuario -->
          <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4">Información del Usuario</h2>
            <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  for="usuario"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Usuario</label
                >
                <input
                  id="usuario"
                  :value="user.usuario"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="correo"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Correo</label
                >
                <input
                  id="correo"
                  :value="user.correo"
                  type="email"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="nombre"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Nombre</label
                >
                <input
                  id="nombre"
                  :value="user.nombre"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="apellido"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Apellido</label
                >
                <input
                  id="apellido"
                  :value="user.apellido"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>

              <!-- Información de la Empresa -->
              <h2 class="col-span-2 text-2xl font-semibold">
                Información de la Empresa
              </h2>

              <div>
                <label
                  for="empresa"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Nombre de la Empresa</label
                >
                <input
                  id="empresa"
                  value="DeployCode Systems S.A de C.V."
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="nit"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >NIT</label
                >
                <input
                  id="nit"
                  value="06142222220002"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="nrc"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >NRC</label
                >
                <input
                  id="nrc"
                  value="987654321"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="telefono"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Teléfono</label
                >
                <input
                  id="telefono"
                  value="22446688"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="correo_empresa"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Correo de la Empresa</label
                >
                <input
                  id="correo_empresa"
                  value="info@deploycode.com"
                  type="email"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div>
                <label
                  for="cod_actividad"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Código de Actividad</label
                >
                <input
                  id="cod_actividad"
                  value="B002"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
              <div class="col-span-2 text-center">
                <label
                  for="des_actividad"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Descripción de Actividad</label
                >
                <input
                  id="des_actividad"
                  value="Empresa de Software"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
                  readonly
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from "../components/SideBar.vue";
import { ref, onMounted, nextTick } from 'vue';
import HeaderComponent from "../components/HeaderComponent.vue";
import UserService from '../services/UsersService';

const user = ref({
    id: '',
    correo: '',
    usuario: '',
    nombre: '',
    apellido: '',
});

onMounted(async () => {
    try {
        // Aseguramos que el DOM esté listo antes de realizar cualquier operación
        await nextTick();
        
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && (storedUser.correo || storedUser.usuario)) {
            const response = await UserService.get_user_by_identifier({
                'correo': storedUser.correo || '',
                'usuario': storedUser.usuario || ''
            });

            if (response.data && response.data.length > 0) {
                const userData = response.data[0];
                user.value = {
                    id: userData.id,
                    correo: userData.correo,
                    usuario: userData.usuario,
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                };
            } else {
                console.error('No se encontraron datos de usuario en la respuesta.');
            }
        } else {
            console.error('No se encontró el correo o nombre de usuario en LocalStorage');
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
});
</script>
