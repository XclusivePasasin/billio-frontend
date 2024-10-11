<template>
    <div class="flex h-screen bg-gray-100">
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- HeaderComponent dinámico -->
            <HeaderComponent />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="flex flex-col items-center justify-center h-full bg-white relative">
                    <!-- Fecha -->
                    <div class="absolute top-6 left-10">
                        <p class="text-lg font-semibold">Fecha</p>
                        <p class="text-gray-600">{{ formatteDate }}</p>
                    </div>

                    <!-- Sección de resumen (centrado) -->
                    <div class="flex flex-col items-center space-y-16">
                        <!-- Total DTE -->
                        <div class="bg-sky-600 text-white font-bold text-3xl rounded-lg py-8 px-24 shadow-lg">
                            {{ totalDTE }} DTE
                        </div>
                    </div>

                    <!-- Espaciado extra -->
                    <div class="h-16"></div>

                    <!-- Botones Procesadas y Sin procesar (centrados y con más espacio) -->
                    <div class="flex items-center justify-center space-x-24">
                        <!-- Procesadas -->
                        <div class="bg-gray-100 text-gray-800 font-bold text-xl rounded-lg py-6 px-16 shadow-md">
                            {{ processedDTE}} PROCESADAS
                        </div>
                        
                        <!-- Sin procesar -->
                        <div class="bg-gray-100 text-gray-800 font-bold text-xl rounded-lg py-6 px-16 shadow-md">
                            {{ unprocessedDTE }} SIN PROCESAR
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
import { mapGetters, mapActions } from 'vuex'

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
        this.fetchDteSummary();
    },
    methods: {
        ...mapActions('facturas', ['fetchDteSummary']),
        getCurrentDate() {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.formatteDate = date.toLocaleDateString('es-ES', options);
        },
    },
    computed:{
        ...mapGetters('facturas', ['totalDTE', 'processedDTE', 'unprocessedDTE'])
    }
}
</script>

<style scoped>

</style>