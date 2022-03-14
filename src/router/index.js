import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home'
import Album from '../components/Album'
import Obtener from '../components/Obtener'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/obtener-laminas',
    name: 'Obtener',
    component: Obtener
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router