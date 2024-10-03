<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar Component -->
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header Component -->
            <HeaderComponent />
            <div class="container mx-auto px-4 py-8">
                <header class="mb-8">
                    <div class="flex flex-col md:flex-row justify-between items-center mb-4">
                        <div class="flex w-full md:w-auto">
                            <div class="relative flex-grow mr-4">
                                <!-- Input para buscar usuarios -->
                                <input type="text" v-model="searchQuery" placeholder="Buscar usuarios..."
                                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <SearchIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <!-- Botón para abrir modal de crear usuario -->
                            <button @click="openCreateUserModal"
                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <PlusIcon class="h-5 w-5 inline-block mr-2" />
                                Crear Usuario
                            </button>
                        </div>
                    </div>
                </header>

                <!-- Tabla de usuarios -->
                <div class="bg-white shadow-md rounded-lg max-h-[500px] overflow-y-auto">
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
                            <!-- Listado de usuarios filtrados -->
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


                <!-- Modal de creación de usuario -->

                <!---------------------------------------------------------------------------------------->
                
                <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
                    <!-- Fondo oscuro -->
                    <div class="bg-black bg-opacity-50 absolute inset-0"></div>

                    <!-- Contenedor del modal -->
                    <div class="bg-white p-8 rounded-3xl shadow-2xl z-50 relative max-w-lg w-full">
                        <!-- Título del modal -->
                        <h2 class="text-3xl font-bold mb-6 text-gray-800">Crear Usuario</h2>

                        <!-- Formulario de creación de usuario -->
                        <form @submit.prevent="createUser">
                            <!-- Campo Nombre -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Nombre
                                </label>
                                <input type="text" v-model="newUser.nombre" :class="{'border-red-500': errors.nombre}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                                <p v-if="errors.nombre" class="text-red-500 text-sm">{{ errors.nombre }}</p>
                            </div>

                            <!-- Campo Apellido -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Apellido
                                </label>
                                <input type="text" v-model="newUser.apellido" :class="{'border-red-500': errors.apellido}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                                <p v-if="errors.apellido" class="text-red-500 text-sm">{{ errors.apellido }}</p>
                            </div>

                            <!-- Campo Correo -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Correo
                                </label>
                                <input type="email" v-model="newUser.correo" :class="{'border-red-500': errors.correo}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                                <p v-if="errors.correo" class="text-red-500 text-sm">{{ errors.correo }}</p>
                            </div>

                            <!-- Campo Usuario -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Usuario
                                </label>
                                <input type="text" v-model="newUser.usuario" :class="{'border-red-500': errors.usuario}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                                <p v-if="errors.usuario" class="text-red-500 text-sm">{{ errors.usuario }}</p>
                            </div>

                            <!-- Campo Contraseña -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Contraseña
                                </label>
                                <input type="password" v-model="newUser.clave" :class="{'border-red-500': errors.clave}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none" />
                                <p v-if="errors.clave" class="text-red-500 text-sm">{{ errors.clave }}</p>
                            </div>

                            <!-- Campo Rol -->
                            <div class="mb-6 relative">
                                <label class="absolute text-lg font-bold text-gray-500 transform -translate-y-3 scale-75 origin-[0] px-2 bg-white left-2 transition-all focus-within:text-blue-500">
                                    Rol
                                </label>
                                <select v-model="newUser.rol" :class="{'border-red-500': errors.rol}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out outline-none">
                                    <option disabled value="">Selecciona un rol</option>
                                    <option v-for="rol in roles" :key="rol.value" :value="rol.value">{{ rol.text }}</option>
                                </select>
                                <p v-if="errors.rol" class="text-red-500 text-sm">{{ errors.rol }}</p>
                            </div>

                            <!-- Botones de Acción -->
                            <div class="flex justify-end space-x-4">
                                <button type="button" @click="closeCreateUserModal"
                                        class="px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 ease-in-out">
                                    Cancelar
                                </button>

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

<script setup>
import { ref, onMounted, computed } from 'vue';
import SideBar from '../components/SideBar.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-vue-next';
import UserService from '../services/UsersService';

// Variables reactivas
const allUsers = ref(true);
const searchQuery = ref('');
const users = ref([]);
const isModalOpen = ref(false);  // Controla si el modal está abierto o cerrado
const newUser = ref({
  nombre: '',
  apellido: '',
  correo: '',
  usuario: '',
  clave: '',
  rol: '' // Campo adicional para el rol
});

// Lista de errores
const errors = ref({
  nombre: '',
  apellido: '',
  correo: '',
  usuario: '',
  clave: '',
  rol: '' // Campo de error para el rol
});

// Lista de roles disponibles, eliminando "Usuario"
const roles = ref([
  { value: 'A', text: 'Administrador' },
  { value: 'C', text: 'Contador' }
]);

// Regex para validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^(?!.*[_.]{2})(?!^[_.])(?!.*[_.]$)[a-zA-Z0-9._]{4,30}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Función para obtener usuarios
const fetchUsers = async () => {
    try {
        const response = await UserService.getUser({ allUsers: allUsers.value });
        if (Array.isArray(response)) {
            users.value = response; // Reemplaza en lugar de push para evitar duplicados
        } else {
            console.error('La respuesta no es un array de usuarios:', response);
        }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
};

// Ejecutar fetchUsers al montar el componente
onMounted(() => {
    fetchUsers();
});

// Computed para filtrar usuarios según la búsqueda
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

// Función para obtener el tipo de usuario
const getUserType = (tipo) => {
    if (tipo === 'A') {
        return 'Administrador';
    } else if (tipo === 'C') {
        return 'Contador';
    }
    return 'Desconocido'; // Para cualquier tipo que no esté contemplado
};

// Funciones para abrir y cerrar el modal
const openCreateUserModal = () => {
  isModalOpen.value = true;  // Abrir modal
};

const closeCreateUserModal = () => {
  isModalOpen.value = false;  // Cerrar modal
  resetForm();  // Limpiar el formulario al cerrar
};

// Función para resetear el formulario
const resetForm = () => {
  newUser.value = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    clave: '',
    rol: '' // Resetea el rol también
  };
  errors.value = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    clave: '',
    rol: '' // Resetea el error del rol también
  };
};

// Función de validación del formulario
const validateForm = () => {
  let valid = true;
  errors.value = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    clave: '',
    rol: '' // Campo de error para el rol
  };

  // Validación de nombre
  if (!newUser.value.nombre) {
      errors.value.nombre = 'El nombre no puede estar vacío.';
      valid = false;
  } else if (!/^[a-zA-Z\s-]{2,50}$/.test(newUser.value.nombre)) {
      errors.value.nombre = 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras, espacios o guiones.';
      valid = false;
  }

  // Validación de apellido
  if (!newUser.value.apellido) {
      errors.value.apellido = 'El apellido no puede estar vacío.';
      valid = false;
  } else if (!/^[a-zA-Z\s-]{2,50}$/.test(newUser.value.apellido)) {
      errors.value.apellido = 'El apellido debe tener entre 2 y 50 caracteres y solo contener letras, espacios o guiones.';
      valid = false;
  }

  // Validación de correo
  if (!newUser.value.correo) {
      errors.value.correo = 'El correo no puede estar vacío.';
      valid = false;
  } else if (!emailRegex.test(newUser.value.correo)) {
      errors.value.correo = 'El correo debe tener un formato válido (ejemplo: usuario@gmail.com).';
      valid = false;
  }

  // Validación de usuario
  if (!newUser.value.usuario) {
      errors.value.usuario = 'El nombre de usuario no puede estar vacío.';
      valid = false;
  } else if (!usernameRegex.test(newUser.value.usuario)) {
      errors.value.usuario = 'El nombre de usuario debe tener entre 4 y 30 caracteres, solo puede contener letras, números, guiones bajos o puntos, y no debe empezar ni terminar con un punto o guion bajo.';
      valid = false;
  }

  // Validación de contraseña
  if (!newUser.value.clave) {
      errors.value.clave = 'La contraseña no puede estar vacía.';
      valid = false;
  } else if (!passwordRegex.test(newUser.value.clave)) {
      errors.value.clave = 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.';
      valid = false;
  } else {
      // Verificar que la contraseña no sea igual al nombre, apellido o usuario
      const lowerClave = newUser.value.clave.toLowerCase();
      if (
          lowerClave === newUser.value.nombre.toLowerCase() ||
          lowerClave === newUser.value.apellido.toLowerCase() ||
          lowerClave === newUser.value.usuario.toLowerCase()
      ) {
          errors.value.clave = 'La contraseña no puede ser igual al nombre, apellido o usuario.';
          valid = false;
      }
  }

  // Validación del rol
  if (!newUser.value.rol) {
    errors.value.rol = 'El rol no puede estar vacío. Debes seleccionar un rol.';
    valid = false;
  }

  return valid;
};

// Función para crear un nuevo usuario
const createUser = async () => {
  if (!validateForm()) {
    return; // Detener la creación si la validación falla
  }

  try {
    const response = await UserService.createUser(newUser.value);
    console.log(response); // Asumiendo que la respuesta es el nuevo usuario creado o un mensaje de éxito
    // Actualizar la lista de usuarios después de crear uno nuevo
    fetchUsers();
    closeCreateUserModal();  // Cerrar el modal después de crear el usuario
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    // Manejar errores específicos, por ejemplo, si el correo o usuario ya existen
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      if (errorMessage.includes('correo')) {
        errors.value.correo = errorMessage;
      }
      if (errorMessage.includes('usuario')) {
        errors.value.usuario = errorMessage;
      }
    }
  }
};

// Funciones para editar y eliminar usuarios
const editUser = (user) => {
    console.log('Editar usuario:', user);
};

const deleteUser = (user) => {
    console.log('Eliminar usuario:', user);
};
</script>

<style scoped>
/* Agrega estilos adicionales si es necesario */
</style>
