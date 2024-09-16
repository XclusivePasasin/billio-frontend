<template>
  <div class="relative h-screen">
    <aside
      class="flex flex-col h-screen bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out"
      :class="[isOpen ? 'w-50' : 'w-20']"
    >
      <div class="p-6 flex justify-between items-center">
        <h1 v-if="isOpen" class="text-xl font-bold">My App</h1>
        <button @click="toggleSidebar" class="text-white focus:outline-none" aria-label="Toggle Sidebar">
          <MenuIcon v-if="!isOpen" class="h-6 w-6" />
          <XIcon v-else class="h-6 w-6" />
        </button>
      </div>
      <nav class="flex-1">
        <ul class="space-y-2 py-4">
          <li v-for="item in menuItems" :key="item.name">
            <a
              :href="item.href"
              class="flex items-center px--8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              :title="item.name"
            >
              <component :is="item.icon" class="h-5 w-5 flex-shrink-0" :class="{ 'mr-3': isOpen }" />
              <span v-if="isOpen" class="whitespace-nowrap">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="p-6 border-t border-gray-700">
        <a
          href="#"
          class="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
          title="Profile"
        >
          <UserIcon class="h-5 w-5 flex-shrink-0" :class="{ 'mr-3': isOpen }" />
          <span v-if="isOpen" class="whitespace-nowrap">Profile</span>
        </a>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  HomeIcon, 
  InboxIcon, 
  UsersIcon, 
  SettingsIcon, 
  HelpCircleIcon, 
  UserIcon,
  MenuIcon,
  XIcon
} from 'lucide-vue-next'

const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, href: '#' },
  { name: 'Inbox', icon: InboxIcon, href: '#' },
  { name: 'Team', icon: UsersIcon, href: '#' },
  { name: 'Settings', icon: SettingsIcon, href: '#' },
  { name: 'Help', icon: HelpCircleIcon, href: '#' },
]
</script>