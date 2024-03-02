<template>
  <div>
    <!-- top navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-warning fixed-top">
      <div class="container-fluid">
        <span class="me-2" @click="toggleSidebarVisibility">
          <i class="bi bi-list text-dark" style="font-size: 1.5em; cursor: pointer;"></i>
        </span>
        <RouterLink to="/" class="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold text-dark">ChecklistMaker</RouterLink>
      </div>
    </nav>
    <!-- top navigation bar -->

    <!-- Blur overlay -->
    <div @click="toggleSidebarVisibility" :class="{ 'blur-overlay': sidebarVisible }"></div>

    <!-- offcanvas -->
    <transition name="slide" :duration="{ enter: 1000, leave: 1000 }">
      <div v-show="sidebarVisible" class="offcanvas offcanvas-start sidebar-nav bg-dark" tabindex="-1" id="sidebar">
        <div class="offcanvas-body p-0">
          <nav class="navbar-dark">
            <ul class="navbar-nav">
              <!-- Lista de elementos -->
              <li v-for="(item, index) in items" :key="index" class="nav-item" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1">
                <RouterLink to="/" class="nav-link" :class="{ 'active': hoverIndex === index }" @click="handleClick">
                  <span v-if="hoverIndex === index" class="text-warning">{{ item }}</span>
                  <span v-else class="text-white">{{ item }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
    <!-- offcanvas -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const sidebarVisible = ref(false);
const hoverIndex = ref(-1);

const toggleSidebarVisibility = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

const items = [
  "Checklist"
];

const handleClick = () => {
  // Realiza las acciones necesarias cuando se hace clic en el enlace
  // Puedes acceder al almacenamiento utilizando `this.$store` si estás en un componente Vue
  // O utilizando `store` si has importado tu almacén Vuex
  this.$store.commit('setFecha', false);
  this.$store.commit('setCierre', false);
  this.$store.commit('setPais', false);
};
</script>


<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 1s; /* Transición de 1 segundo */
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to, .slide-leave {
  transform: translateX(0);
}

.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo negro con opacidad */
  backdrop-filter: blur(5px); /* Desenfoque */
  transition: background-color 0.5s, backdrop-filter 0.5s; /* Transición */
  z-index: 998; /* Asegúrate de que la superposición esté por encima de todo */
  pointer-events: none; /* Permite que los clics pasen a través de la superposición */
}

.blur-overlay.active {
  pointer-events: all; /* Permite que los clics no pasen a través de la superposición */
}

.nav-link {
  font-weight: bold; /* Texto en negrita */
  text-align: center; /* Texto centrado */
  transition: color 0.5s; /* Transición del color del texto */
  font-size: 18px; /* Tamaño de la fuente */
  margin-top: 10px; /* Espacio superior */
  border-top: 2px solid white; /* Borde superior blanco */
  border-bottom: 2px solid white; /* Borde inferior blanco */
  padding: 10px 0; /* Espaciado interno */
}

.nav-link.active {
  border-color: rgb(255, 193, 7); /* Cambio de color del borde al pasar el cursor */
}
</style>
