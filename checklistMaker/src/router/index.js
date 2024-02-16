import { createRouter, createWebHistory } from 'vue-router'
import FACoMO from '../views/FACoMOView.vue'
import Pais from '../views/PaisView.vue'
import Fecha from '../views/FechaView.vue'
import Cuadro from '../views/CuadroView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FACoMO',
      component: FACoMO
    },
    {
      path: '/Pais',
      name: 'Pais',
      component: Pais
    },
    {
      path: '/Fecha',
      name: 'Fecha',
      component: Fecha
    },
    {
      path: '/Cuadro',
      name: 'Cuadro',
      component: Cuadro
    },
  ]
})

export default router
