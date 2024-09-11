import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views//LoginView.vue'
import DashBoardView from '../views/DashBoard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  }, 
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoardView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
