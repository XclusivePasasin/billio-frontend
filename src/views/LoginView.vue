<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left panel -->
    <div class="w-3/5 h-full flex flex-col justify-center items-center p-8 bg-white">
      <div class="w-full max-w-md">
        <h1 class="text-5xl font-semibold text-gray-700 mb-4 text-center">Bienvenido</h1>
        
        <!-- Mensaje de error en rojo si las credenciales son incorrectas -->
        <p v-if="errorMessage" class="text-center text-red-500 mb-4">{{ errorMessage }}</p>

        <form @submit.prevent="login" class="space-y-6">
          <div class="relative">
            <!-- Input field -->
            <input 
              type="text" 
              placeholder="Ingrese su usuario" 
              class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" 
              v-model="correo_o_usuario">
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round">
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 0 0-16 0"/>
              </svg>
            </span>
          </div>

          <div class="relative">
            <!-- Input field -->
            <input 
              type="password" 
              placeholder="Contraseña" 
              class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" 
              v-model="clave">
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rectangle-ellipsis">
                <rect width="20" height="12" x="2" y="6" rx="2"/>
                <path d="M12 12h.01"/>
                <path d="M17 12h.01"/>
                <path d="M7 12h.01"/>
              </svg>
            </span>
          </div>

          

          <button type="submit" 
          class="w-full font-semibold bg-[#334155] text-white py-3 rounded-md hover:bg-[#1e293b] transition duration-300">
            Iniciar Sesión
          </button>
        </form>

        <p class="text-center text-sm text-gray-600" style="top: 70%; position: relative;">
          Development by DeplyCode Systems S.A. de C.V.
        </p>
      </div>
    </div>

    <!-- Right panel -->
    <div class="w-2/5 h-full relative">
      <img src="../assets/fondoLogin2.jpg" alt="Background Image" class="absolute inset-0 h-full w-full object-cover opacity-50">
      <div class="relative z-10 h-full flex flex-col justify-center items-center px-8 bg-[#1E2A38] bg-opacity-95">
        <img src="../assets/logoBillio.png" alt="Logo" class="mb-2 h-60 w-auto">
      </div>
    </div>
  </div>
</template>


<script>
import LoginService from '@/services/LoginService';

export default {
  data() {
    return {
      correo_o_usuario: '',
      clave: '',
      errorMessage: '', // Mensaje de error
    }
  },
  methods: {
    async login() {
      this.errorMessage = ''; // Limpiar el mensaje de error antes de intentar el login

      try {
        // Realizamos la solicitud de login al backend
        const response = await LoginService.loginUser({
          correo_o_usuario: this.correo_o_usuario,
          clave: this.clave
        });

        // Verificamos si la respuesta fue exitosa
        if (response.status === 200) {
          // Si el login es exitoso, redirigir al dashboard
          this.$router.push({ name: 'Inicio' });
        }
      } catch (error) {
        // Si el login falla, mostramos el mensaje de error en el formulario
        this.errorMessage = error.response?.data?.message || 'Usuario o contraseña incorrectos';
      }
    }
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>
