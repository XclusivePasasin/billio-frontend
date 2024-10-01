<template>
    <div class="flex h-screen bg-gray-100">
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <HeaderComponent />
            <div class="container mx-auto px-4 py-8">
                <header class="mb-8">
                    <div class="flex flex-col md:flex-row justify-between items-center mb-4">
                        <div class="flex w-full md:w-auto">
                            <div class="relative flex-grow mr-4">
                                <input type="text" v-model="searchQuery" placeholder="Buscar usuarios..."
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <button @click="openCreateUserModal"
                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <PlusIcon class="h-5 w-5 inline-block mr-2" />
                                Crear Usuario
                            </button>
                        </div>
                    </div>
                </header>

                <div class="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nombre del Usuario
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Correo
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nombre de Usuario
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Editar
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Eliminar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in filteredUsers" :key="user.id">
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <div class="flex items-center justify-center">
                                        <div class="ml-3">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {{ user.nombre }} {{ user.apellido }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ user.correo }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ user.usuario }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ getUserType(user.tipo) }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <span :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        user.estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ user.estado === 'A' ? 'Activo' : 'Inactivo' }}
                                    </span>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900" title="Editar">
                                        <EditIcon class="h-5 w-5" />
                                    </button>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900" title="Eliminar">
                                        <TrashIcon class="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Modal de creación de usuario-->
                <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
                <!-- Fondo oscuro sin desenfoque -->
                <div class="bg-black bg-opacity-50 absolute inset-0"></div>
                
                <!-- Contenedor del modal -->
                <div class="bg-white p-8 rounded-3xl shadow-2xl z-50 relative max-w-lg w-full">
                    <!-- Título del modal -->
                    <h2 class="text-3xl font-bold mb-6 text-gray-800">Crear Nuevo Usuario</h2>

                    <!-- Formulario de creación de usuario -->
                    <form @submit.prevent="createUser">
                    <!-- Campo Nombre -->
                    <div class="mb-6 relative">
                        <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                        Nombre
                        </label>
                        <input type="text" v-model="newUser.nombre" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                    </div>
                    <!-- Campo Apellido -->
                    <div class="mb-6 relative">
                        <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                        Apellido
                        </label>
                        <input type="text" v-model="newUser.apellido" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                    </div>
                    <!-- Campo Correo -->
                    <div class="mb-6 relative">
                        <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                        Correo
                        </label>
                        <input type="email" v-model="newUser.correo" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                    </div>
                    <!-- Campo Usuario -->
                    <div class="mb-6 relative">
                        <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                        Usuario
                        </label>
                        <input type="text" v-model="newUser.usuario" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                    </div>
                    <!-- Campo Contraseña -->
                    <div class="mb-6 relative">
                        <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                        Contraseña
                        </label>
                        <input type="password" v-model="newUser.clave" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                    </div>

                    <!-- Botones de Acción -->
                    <div class="flex justify-end space-x-4">
                        <!-- Botón Cancelar -->
                        <button type="button" @click="closeCreateUserModal"
                                class="px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 ease-in-out">
                        Cancelar
                        </button>

                        <!-- Botón Crear -->
                        <button type="submit"
                                class="px-5 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out">
                        Crear
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import SideBar from '../components/SideBar.vue';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-vue-next';
import HeaderComponent from '../components/HeaderComponent.vue';
import UserService from '../services/UsersService';


export default {
    name: 'UsuariosView',
    components: {
        SideBar,
        HeaderComponent
    }
};
</script>

<script setup>
const allUsers = ref(true);
const searchQuery = ref('');
const users = ref([]);
const isModalOpen = ref(false);  // Controla si el modal está abierto o cerrado
const newUser = ref({
  nombre: '',
  apellido: '',
  correo: '',
  usuario: '',
  clave: ''
});

const fetchUsers = async () => {
    try {
        const response = await UserService.getUser({ allUsers: allUsers.value });
        if (Array.isArray(response)) {
            users.value.push(...response);
        } else {
            console.error('La respuesta no es un array de usuarios:', response);
        }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
};

onMounted(() => {
    fetchUsers();
});

const filteredUsers = computed(() => {
    if (!users.value || users.value.length === 0) {
        return [];
    }
    return users.value.filter(user =>
        user.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.usuario.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.tipo.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const getUserType = (tipo) => {
    switch (tipo) {
        case 'A':
            return 'Administrador';
        case 'C':
            return 'Contador';
        default:
            return 'Desconocido';
    }
};
// MODAL CREAR USUARIOS
const openCreateUserModal = () => {
  isModalOpen.value = true;  // Abrir modal
};

const closeCreateUserModal = () => {
  isModalOpen.value = false;  // Cerrar modal
  resetForm();  // Limpiar el formulario al cerrar
};

const createUser = async () => {
  try {
    await UserService.createUser(newUser.value);
    // Actualizar la lista de usuarios después de crear uno nuevo
    fetchUsers();
    closeCreateUserModal();  // Cerrar el modal después de crear el usuario
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};

const resetForm = () => {
  newUser.value = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    clave: ''
  };
};

const editUser = (user) => {
    console.log('Editar usuario:', user);
};

const deleteUser = (user) => {
    console.log('Eliminar usuario:', user);
};

</script>
