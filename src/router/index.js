import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home'
import Album from '../components/Album'
import Obtener from '../components/Obtener'
import InformacionSerie from '../components/InformacionSerie'
import Personajes from '../components/InformacionSerie/Personajes'
import Personaje from '../components/Personaje'
import Episodio from '../components/Episodio'

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
  },
  {
    path: '/informacion-serie',
    name: 'Informacion',
    component: InformacionSerie
  },
  {
    path: '/personajes',
    name: 'Personajes',
    component: Personajes
  },
  {
    path: '/personajes/:id',
    name: 'Personaje',
    props: true,
    component: Personaje
  },
  {
    path: '/episodios/:id',
    name: 'Episodio',
    props: true,
    component: Episodio
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router