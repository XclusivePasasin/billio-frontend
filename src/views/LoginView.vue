<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left panel -->
    <div class="w-3/5 h-full flex flex-col justify-center p-8 bg-white">
      <h1 class="text-5xl font-semibold text-gray-700 mb-4">Bienvenido</h1>
      <br>
      <!-- Mensaje de error en rojo si las credenciales son incorrectas -->
      <p v-if="errorMessage" class="text-center text-red-500 mb-4">{{ errorMessage }}</p>

      <form @submit.prevent="login" class="space-y-4">
        <div class="relative">
          <!-- Input field -->
          <input 
            type="text" 
            placeholder="Enter your email or username" 
            class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            v-model="correo_o_usuario">
          <span class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
        </div>
        <div class="relative">
          <!-- Input field -->
          <input 
            type="password" 
            placeholder="Password" 
            class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            v-model="clave">
          <span class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="16" r="1"/>
              <rect x="3" y="10" width="18" height="12" rx="2"/>
              <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
            </svg>
          </span>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember Me
            </label>
          </div>
        </div>
        <button type="submit" class="w-full bg-[#334155] text-white py-3 rounded-md hover:bg-[#1e293b] transition duration-300">Iniciar Sesion</button>
      </form>

      <p class="text-center text-sm text-gray-600" style="top: 30%; position: relative;">
        Copyright © 2024 CodeDeploymentSystems, S.A. DE C.V.
      </p>

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
          this.$router.push({ name: 'Dashboard' });
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
