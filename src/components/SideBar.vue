<template>
  <div class="relative h-screen">
    <aside
      class="flex flex-col h-screen bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out"
      :class="[isOpen ? 'w-60' : 'w-24']"
    >
      <div class="p-8 flex justify-between items-center">
        <h1 v-if="isOpen" class="text-xl font-bold">Billio</h1>
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
          <li v-for="item in menuItems" :key="item.name">
            <a
              :href="item.href"
              class="flex items-center py-4 text-gray-100 hover:text-white hover:rounded-full hover: transition-colors duration-500"
              :title="item.name"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 flex-shrink-0"
                :class="{ 'mr-4': isOpen }"
              />
              <span v-if="isOpen" class="whitespace-nowrap">{{
                item.name
              }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>


<script setup>
import { ref } from "vue";
import {
  HomeIcon,
  Settings2,
  File,
  UserRound,
  MenuIcon,
  XIcon,
} from "lucide-vue-next";

// Elementos del menú
const menuItems = [
  { name: "Inicio", icon: HomeIcon, href: "/dashboard" },
  { name: "Facturas", icon: File, href: "/facturas" },
  { name: "Usuarios", icon: UserRound, href: "/usuarios" },
  { name: "Configuracion", icon: Settings2, href: "#" },
];

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
