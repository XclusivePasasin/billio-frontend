<template>
  <div class="relative h-screen">
    <aside
      class="flex flex-col h-screen bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out"
      :class="[isOpen ? 'w-60' : 'w-24']"
    >
      <div class="p-8 flex justify-between items-center">
        <h1 v-if="isOpen" class="text-3xl font-bold">Billio</h1>
        <button
          @click="toggleSidebar"
          class="text-white focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <MenuIcon v-if="!isOpen" class="h-6 w-6" />
          <XIcon v-else class="h-8 w-8" />
        </button>
      </div>
      <nav class="flex-1">
        <ul class="space-y-4 py-4">
          <li v-for="item in filteredMenuItems" :key="item.name">
            <a
              :href="item.href"
              class="flex items-center py-4 text-gray-100 hover:text-white hover:rounded-full transition-colors duration-500"
              :title="item.name"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 flex-shrink-0"
                :class="{ 'mr-4': isOpen }"
              />
              <span v-if="isOpen" class="whitespace-nowrap">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import {
  HomeIcon,
  Settings2,
  File,
  UserRound,
  MenuIcon,
  XIcon,
} from 'lucide-vue-next';
import UserService from '../services/UsersService';


const selectedMenuItems = [
  //Aqui delimitamos con "U" y "A" los roles de usuario, si ambos pueden acceder a la ruta, se coloca ambos
  // caso contrario, se coloca solo el rol que puede acceder
  { name: "Inicio", icon: HomeIcon, href: "/dashboard", roles: ['U', 'A'] },
  { name: "Facturas", icon: File, href: "/facturas", roles: ['U', 'A'] },
  { name: "Usuarios", icon: UserRound, href: "/usuarios", roles: ['A'] },
  { name: "Configuracion", icon: Settings2, href: "/configuracion", roles: ['U','A'] },
];

// Computed para filtrar los items según el tipo de usuario
const filteredMenuItems = computed(() => {
  return selectedMenuItems.filter(item => item.roles.includes(user.value.tipo));
});

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const user = ref({
    id: '',
    correo: '',
    usuario: '',
    tipo: '', // 'U' para Contador y 'A' para Administrador
});

onMounted(async () => {
    try {
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
                    tipo: userData.tipo, // Agrega el tipo de usuario aquí
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