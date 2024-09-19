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
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Accesos
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
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button @click="manageAccess(user)" class="text-green-600 hover:text-green-900" title="Accesos">
                                        <KeyIcon class="h-5 w-5" />
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

<script>
import { ref, onMounted, computed } from 'vue';
import SideBar from '../components/SideBar.vue';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, KeyIcon } from 'lucide-vue-next';
import HeaderComponent from '../components/HeaderComponent.vue';
import UserService from '@/services/UsersService';

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

const openCreateUserModal = () => {
    console.log('Abrir modal de creación de usuario');
};

const editUser = (user) => {
    console.log('Editar usuario:', user);
};

const deleteUser = (user) => {
    console.log('Eliminar usuario:', user);
};

const manageAccess = (user) => {
    console.log('Gestionar accesos para:', user);
};
</script>
