<template>
    <div class="flex h-screen bg-gray-100">
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Reemplazamos el header estático con el componente dinámico -->
            <HeaderComponent />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg h-80 p-4">
                            <h1 class="text-xl font-semibold mb-4">Bienvenido a tu DashBoard</h1>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Módulos dentro del Dashboard -->
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <h3 class="font-semibold mb-2">Facturas Procesadas</h3>
                                    <ul class="list-disc list-inside">
                                        <li>Updated profile information</li>
                                        <li>Completed 2 tasks</li>
                                        <li>Scheduled a meeting</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <h3 class="font-semibold mb-2">Facturas no procesadas</h3>
                                    <div class="flex justify-between">
                                        <span>Projects:</span>
                                        <span class="font-bold">12</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Tasks:</span>
                                        <span class="font-bold">25</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Completed:</span>
                                        <span class="font-bold">18</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import HeaderComponent from '../components/HeaderComponent.vue' // Importamos el nuevo componente

export default {
    name: 'DashBoard',
    components: {
        SideBar,
        HeaderComponent // Lo registramos aquí
    }
}
</script>