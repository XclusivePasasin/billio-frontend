<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
            <div class="space-y-6">
                <img src="../assets/LogoEmpresa.png" alt="Logo Empresa" class="mx-auto h-20 w-auto">
                <h2 class="text-center text-3xl font-extrabold text-gray-900">Iniciar Sesion</h2>
                <!-- Mensaje de error en rojo si las credenciales son incorrectas -->
                <p v-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <div class="space-y-4 rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email Address</label>
                        <input id="email-address" name="email" type="text" autocomplete="email" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                            placeholder="Email Address or User" v-model="correo_o_usuario">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                            placeholder="Password" v-model="clave">
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Remember Me
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-orange-600 hover:text-orange-500">
                            Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Iniciar Sesion
                    </button>
                </div>
            </form>
            <p class="mt-2 text-center text-xs text-gray-500">
                Copyright © 2024 CodeDeploymentSystems, S.A. DE C.V.
            </p>
        </div>
    </div>
</template>

<script>
import LoginService from '@/services/LoginService';

export default {
    name: 'LoginView',
    data() {
        return {
            correo_o_usuario: '',
            clave: '',
            errorMessage: '', // Mensaje de error
        };
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
