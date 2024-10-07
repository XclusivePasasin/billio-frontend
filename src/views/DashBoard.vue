<template>
    <div class="flex h-screen bg-gray-100">
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Reemplazamos el header estático con el componente dinámico -->
            <HeaderComponent />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="flex flex-col items-center justify-center h-screen bg-white relative">
                    <!-- Fecha -->
                    <div class="absolute top-6 left-10">
                        <p class="text-lg font-semibold">Fecha</p>
                        <p class="text-gray-600">{{ formatteDate }}</p>
                    </div>

                    <!-- Sección de resumen -->
                    <div class="flex flex-col items-center space-y-12">
                        <!-- Total DTE (colocado en la parte superior) -->
                        <div class="bg-blue-500 text-white font-bold text-3xl rounded-lg py-6 px-16 shadow-lg">
                            2650 DTE
                        </div>
                    </div><br>

                    <!-- Botones Procesadas y sin procesar (colocados en la parte inferior) -->
                    <div class="flex items-center justify-center space-x-16">
                        <!-- Procesadas -->
                        <div class="bg-gray-100 text-gray-800 font-bold text-xl rounded-lg py-6 px-12 shadow-md">
                            2052 PROCESADAS
                        </div>
                        
                        <!-- Sin procesar -->
                         <div class="bg-gray-100 text-gray-800 font-bold text-xl rounded-lg py-6 px-12 shadow-md">
                            598 SIN PROCESAR
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
    },
    data() {
        return {
            formatteDate: '',
        };
    },
    mounted() {
        this.getCurrentDate();
    },
    methods: {
        getCurrentDate() {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.formatteDate = date.toLocaleDateString('es-ES', options);
        },
    }
}
</script>

<style scoped>

</style>