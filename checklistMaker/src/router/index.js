import { createRouter, createWebHistory } from 'vue-router'
import FACoMO from '../views/FACoMOView.vue'
import Pais from '../views/PaisView.vue'
import Fecha from '../views/FechaView.vue'
import Cuadro from '../views/CuadroView.vue'
import store from '../store/store.js';


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
      component: Pais,
      meta: { requiresAuth: true },
    },
    {
      path: '/Fecha',
      name: 'Fecha',
      component: Fecha,
      meta: { requiresAuth: true },
    },
    {
      path: '/Cuadro',
      name: 'Cuadro',
      component: Cuadro,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si el usuario está autenticado usando Vuex
    if (!store.state.isCierre && to.path === '/Pais') {
      // Si no está autenticado, redirige a la página de inicio de sesión
      next('/');
    }
    else if (!store.state.isPais && to.path === '/Fecha'){
      next('/');
    }
    else if (!store.state.isFecha && to.path === '/Cuadro'){
      next('/');
    }
    else {
      next();
    }
  } else {
    next();
  }
});

export default router
