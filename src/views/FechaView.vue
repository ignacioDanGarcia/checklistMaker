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
                        <DatePicker v-model="fechaSeleccionada" :format="dateFormat"/>
                    </div>
                    <RouterLink to="/Cuadro" class="text-decoration-none text-warning" @click="funcionFechaStore" >
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
  
<script>
    import  DatePicker from 'vue3-datepicker';
    import { RouterLink, RouterView } from 'vue-router';
    import Navbar from '../components/Navbar.vue';
    import Sidebar from '../components/Sidebar.vue';
    import store from '../store/store';
    import {ref} from 'vue';
    // Inicializa la fecha seleccionada
    export default {
        components:{
            Navbar,
            Sidebar,
            DatePicker
        },
        setup() {
            const fechaSeleccionada = ref(null);
            const dateFormat = 'dd-MM-yyyy';
            return {
            fechaSeleccionada
            };
        },
        methods: {
            funcionFechaStore() {
                // Formatear la fecha seleccionada
                const formattedDate = this.fechaSeleccionada ? this.formatDate(this.fechaSeleccionada) : null;
                // Almacenar la fecha formateada en el almacenamiento Vuex
                this.$store.commit('setFecha', formattedDate);
                // Navegar a la ruta '/Cuadro'
                this.$router.push('/Cuadro');
            },
            formatDate(date) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                // Formatear la fecha en 'dd-MM-yyyy'
                return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
            }
        },
    };
</script>
<style scoped>
.custom-date-picker {
  background: black;
  color: yellow;
}
</style>