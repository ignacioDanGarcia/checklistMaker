<template>
    <div>
        <Navbar />
        <Sidebar />
        <main class="mt-5 pt-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h4 style="color: #ffea00">Elegi la fecha</h4>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-md-3 mb-3">
                    <div class="card bg-dark text-warning h-100">
                    <div class="card-body py-5">
                        Seleciona acá una fecha
                        <DatePicker v-model="fechaSeleccionada" />
                    </div>
                    <RouterLink to="/Cuadro" class="text-decoration-none text-warning">
                        <div class="card-footer d-flex">
                        
                            Aceptar
                        </div>
                    </RouterLink>
                    </div>
                </div>
            </div>
        </main>
    </div>
  </template>
  
<script setup>
    import DatePicker from 'vue3-datepicker';
    import { RouterLink, RouterView } from 'vue-router';
    import Navbar from '../components/Navbar.vue';
    import Sidebar from '../components/Sidebar.vue';
    import store from '../store/store';
    // Inicializa la fecha seleccionada
    let fechaSeleccionada = null;
</script>
<style scoped>
.custom-date-picker {
  background: black;
  color: yellow;
}
</style>