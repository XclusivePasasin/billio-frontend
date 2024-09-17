<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
            <div class="space-y-6">
                <img src="../assets/LogoEmpresa.png" alt="SeedProd Logo" class="mx-auto h-20 w-auto">
                <h2 class="text-center text-3xl font-extrabold text-gray-900">Login</h2>

                <!-- Mensaje de error o éxito -->
                <p v-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</p>
                <p v-if="successMessage" class="text-center text-green-500">{{ successMessage }}</p>

                <p class="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?
                    <a href="#" class="font-medium text-orange-600 hover:text-orange-500">
                        Get SeedProd Now
                    </a>
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="login">
                <div class="space-y-4 rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email Address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                            placeholder="Email Address" v-model="email">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                            placeholder="Password" v-model="password">
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
                            Forgot Your Password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Log In
                    </button>
                </div>
            </form>
            <p class="mt-2 text-center text-xs text-gray-500">
                Copyright © 2023 SeedProd, LLC. SeedProd™ is a trademark of SeedProd, LLC
            </p>
            <div class="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
                <a href="#" class="hover:text-orange-500">Terms of Service</a>
                <a href="#" class="hover:text-orange-500">Privacy Policy</a>
            </div>
        </div>
    </div>
</template>

<script>
import LoginService from '@/services/LoginService';
import Swal from 'sweetalert2';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                // Realizamos la solicitud de login al backend
                const response = await LoginService.loginUser({
                    email: this.email,
                    password: this.password
                });

                // Verificamos si la respuesta fue exitosa
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Inicio de sesión exitoso',
                        icon: 'success',
                    })
                    this.errorMessage = ''; // Limpiar mensaje de error en caso de éxito
                    // Redirigimos a la página de inicio
                    this.$router.push({ name: 'dashboard' });
                }
            } catch (error) {
                // Manejo de errores en la autenticación
                this.successMessage = ''; // Limpiar mensaje de éxito en caso de error
                if (error.response && error.response.data) {
                    Swal.fire({
                        title: 'Usuario o contraseña incorrectos',
                        icon: 'error',
                    })
                } else {
                    this.errorMessage = 'Login failed';
                }
            }
        }
    }
}
</script>