import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashBoardView from '../views/DashBoard.vue'
import LoginService from '../services/LoginService'
import UsuariosView from '../views/UsuariosView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/', // Ruta raíz
    redirect: '/login' // Redirigir a /login
  },
  {
    path: '/:pathMatch(.*)*', // Ruta para manejar errores 404 o rutas no existentes
    redirect: '/login' // Redirigir a /login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoardView,
    meta: { requiresAuth: true } // Ruta protegida
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UsuariosView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Usamos un guard de navegación global para proteger las rutas
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (!LoginService.isAuthenticated()) {
      next({ name: 'login' }); // Redirigir al login
    } else {
      next(); // Continuar a la ruta solicitada
    }
  } else {
    next(); // Continuar a la ruta si no requiere autenticación
  }
});

export default router
