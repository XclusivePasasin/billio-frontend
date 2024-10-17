import { createRouter, createWebHistory } from 'vue-router';
import { ref, nextTick } from 'vue';
import LoginView from '../views/LoginView.vue';
import DashBoardView from '../views/DashBoard.vue';
import LoginService from '../services/LoginService';
import UsuariosView from '../views/UsuariosView.vue';
import FacturasView from '@/views/FacturasView.vue';
import ConfiguracionView from '@/views/ConfiguracionView.vue';
import UserService from '../services/UsersService';

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
    name: 'Inicio',
    component: DashBoardView,
    meta: { requiresAuth: true } // Ruta protegida
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UsuariosView,
    meta: { requiresAuth: true, requiresAdmin: true } // Ruta protegida y se requiere rol de administrador
  },
  {
    path: '/facturas',
    name: 'Facturas',
    component: FacturasView,
    meta: { requiresAuth: true } // Ruta protegida
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: ConfiguracionView,
    meta: { requiresAuth: true } // Ruta protegida
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const user = ref({
  id: '',
  correo: '',
  usuario: '',
  tipo: '', // 'U' para Contador y 'A' para Administrador
});

// Función para obtener el usuario desde localStorage
async function fetchUser() {
  try {
    await nextTick();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && (storedUser.correo || storedUser.usuario)) {
      const response = await UserService.get_user_by_identifier({
        'correo': storedUser.correo || '',
        'usuario': storedUser.usuario || ''
      });

      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        user.value = {
          id: userData.id,
          correo: userData.correo,
          usuario: userData.usuario,
          tipo: userData.tipo, // Agrega el tipo de usuario aquí
        };
      } else {
        console.error('No se encontraron datos de usuario en la respuesta.');
      }
    } else {
      console.error('No se encontró el correo o nombre de usuario en LocalStorage');
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
}

// Usamos un guard de navegación global para proteger las rutas
router.beforeEach(async (to, from, next) => {
  await fetchUser(); // Recuperar el usuario antes de verificar la navegación

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la ruta requiere autenticación y el usuario no está autenticado
    if (!LoginService.isAuthenticated()) {
      next({ name: 'login' }); // Redirigir al login
    } else {
      // Aquí verificamos si la ruta requiere rol de administrador
      if (to.meta.requiresAdmin && user.value.tipo !== 'A') {
        next({ name: 'Inicio' }); // Redirigir a dashboard o a una ruta alternativa
      } else {
        next(); // Continuar a la ruta solicitada
      }
    }
  } else {
    next(); // Continuar a la ruta si no requiere autenticación
  }
});

export default router;
