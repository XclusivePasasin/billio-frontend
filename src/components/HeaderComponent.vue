<!-- HeaderComponent.vue -->
<template>
    <header class="bg-white shadow-sm z-10 flex justify-between items-center py-4 px-6">
        <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
        <div class="relative">
            <button class="flex items-center space-x-2 focus:outline-none" @click="toggleDropdown">
                <UserIcon class="h-6 w-6 text-gray-500" />
                <div class="text-right">
                    <p class="text-sm text-left font-semibold">{{ user.usuario }}</p>
                    <p class="text-xs text-gray-500">{{ user.correo }}</p>
                </div>
            </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1">
                <button @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-left bg-red text-gray-700 hover:bg-gray-100">
                    Cerrar sesión
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserIcon } from 'lucide-vue-next'
import LoginService from '@/services/LoginService'
import UserService from '@/services/UsersService';


// datos del usuario
const user = ref({
    id: '',
    correo: '',
    usuario: ''
});

// Función para obtener los datos del usuario al montar el componente
onMounted(async () => {
    try {
        // Obtener los datos del usuario desde LocalStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && (storedUser.correo || storedUser.usuario)) {
            // Obtener los datos del usuario usando el correo o nombre de usuario
            const userData = await UserService.getUser({
                correo: storedUser.correo || '',
                usuario: storedUser.usuario || ''
            });
            user.value = userData; // Actualizar el estado del usuario con los datos recibidos
        } else {
            console.error('No se encontró el correo o nombre de usuario en LocalStorage');
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
});

// Título dinámico basado en la ruta
const route = useRoute()
const pageTitle = route.name

watch(route, (newRoute) => {
    // Cambia el título según la ruta
    switch (newRoute.name) {
        case 'DashBoard':
            pageTitle.value = 'Dashboard'
            break
        case 'Profile':
            pageTitle.value = 'Perfil'
            break
        default:
            pageTitle.value = 'Dashboard'
    }
})

// Lógica para el dropdown
const dropdownOpen = ref(false)
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
}

// Lógica para cerrar sesión
const router = useRouter()



const logout = async () => {
    try {
        await LoginService.logoutUser(user.value.id) // Usar la lógica del logout aquí
        localStorage.removeItem('user') // Limpiar los datos del localStorage
        router.push('/login') // Redirigir a la página de login
    } catch (error) {
        console.log(user.value.id)
        console.error('Error al cerrar sesión:', error)
    }
}
</script>

<style scoped>
/* Estilos opcionales para el dropdown */
button:focus {
    outline: none;
}
</style>