<template>
  <div>
    <!-- top navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-warning fixed-top">
      <div class="container-fluid">
        <button
         class="navbar-toggler bg-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="offcanvasExample"
        >
          <span class="navbar-toggler-icon" data-bs-target="#sidebar"></span>
        </button>
        <RouterLink
          class="navbar-brand me-auto ms-lg-0 ms-3 text-uppercase text-dark fw-bold"
          to="/"
          >ChecklistMaker</RouterLink
        >
      </div>
    </nav>
    <!-- top navigation bar -->


    <!-- offcanvas -->
    <div
    class="offcanvas offcanvas-start sidebar-nav bg-dark"
    tabindex="-1"
    id="sidebar"
  >
    <div class="offcanvas-body p-0 mt-4">
      <nav class="navbar-dark">
        <ul class="navbar-nav">
          <li>
            <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
              INICIO
            </div>
          </li>
          <li v-for="(item, index) in items" :key="index" class="nav-item" @mouseover="hoverIndex = item.index" @mouseleave="hoverIndex = -1">
            <RouterLink :to="`/`" class="nav-link" @click="handleClick">
              <span v-if="hoverIndex === item.index" class="text-warning">{{ item.label }}</span>
              <span v-else class="text-white">{{ item.label }}</span>
            </RouterLink>
          </li>
          <li class="my-4"><hr class="dropdown-divider bg-light" /></li>
          <li>
            <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
              Interface
            </div>
          </li>
          <li>
            <a
              class="nav-link px-3 sidebar-link" 
              data-bs-toggle="collapse"
              href="#layouts"
            >
              <span class="me-2"><i class="bi bi-layout-split"></i></span>
              <span>Layouts</span>
              <span class="ms-auto">
                <span class="right-icon">
                  <i class="bi bi-chevron-down"></i>
                </span>
              </span>
            </a>
            <div class="collapse" id="layouts">
              <ul class="navbar-nav ps-3">
                <li v-for="(layout, index) in layouts" :key="index">
                  <div
                    class="nav-link px-3"
                    @mouseover="hoverIndex = layout.index"
                    @mouseleave="hoverIndex = -1"
                  >
                    <span
                      class="me-2"
                      :class="{ 'text-warning': hoverIndex === layout.index, 'text-white': hoverIndex !== layout.index }"
                    >
                      <i :class="layout.icon"></i>
                    </span>
                    <span
                      :class="{ 'text-warning': hoverIndex === layout.index, 'text-white': hoverIndex !== layout.index}"
                    >
                      {{ layout.label }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import store from '../store/store';

const sidebarVisible = ref(false);
const hoverIndex = ref(-1);

const toggleSidebarVisibility = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

const items = [
  { label: "Checklist", index: 0 },
];

const layouts = [
  { label: "Elegir tipo cierre", icon: "bi bi-speedometer2", index: 1 },
  { label: "Elegir país", icon: "bi bi-map", index: 2 },
  { label: "Elegir fecha", icon: "bi bi-calendar-event", index: 3 }
];

const handleClick = () => {
  store.commit('setFecha', false);
  store.commit('setCierre', false);
  store.commit('setPais', false);
};
</script>

<style scoped>
 .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 193, 7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
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
</style>
