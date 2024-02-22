<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import store from '../store/store';
import * as XLSX from 'xlsx';
import readXlsFile from "read-excel-file";
//con esto evaluas si ya existia una carpeta
//store.state.Pais
//store.state.Fecha
//store.state.Cierre
import { ref, onMounted } from 'vue';

export default {
  components:{
    Navbar,
    Sidebar
  },
  data() {
    return {
      headers: ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4'],
      datosMo: [],
      variable: store.state.isFecha,
      variable2: store.state.isCierre,
      variable3: store.state.isPais
    };
  },
  mounted() {
    this.cargarDatosMo();
  },
  methods: {
    async cargarDatosMo() {
      try {
        const rutajson = `${store.state.isFecha}${store.state.isPais}${store.state.isCierre}.json`;
        //if rutajson no existe then leer archivo excel que siempre lo va a crear
        const workbook = await this.leerArchivoExcel(document.getElementById('excel'), rutajson);
        //leerJson
      } catch (error) {
        console.error('Error al cargar o procesar el archivo Excel:', error);
      }
    },
    async leerArchivoExcel(rutaExcel, nombreArchivoJSON) {
      const input = rutaExcel;
      readXlsFile(input.files[0]).then((rows) => {
          this.datosMo = rows.slice(1);
          const filasFiltradas = this.filtrarFilas();
          const primeraFila = rows[0];
          this.headers = primeraFila.slice(0, 4);

          this.datosMo = filasFiltradas.slice(1).map(fila => fila.slice(0, 4));
          //const datosJSON = JSON.stringify(this.datosMo, null, 2);
      });
    },
    filtrarFilas() {
        let filasFiltradas = [];
        switch (store.state.isPais) {
            case 'ARG':
                filasFiltradas = this.datosMo.filter(fila => fila[5] !== null);
                break;
            case 'BRA':
                filasFiltradas = this.datosMo.filter(fila => fila[6] !== null);
                break;
            case 'COL':
                filasFiltradas = this.datosMo.filter(fila => fila[7] !== null);
                break;
            case 'CHI':
                filasFiltradas = this.datosMo.filter(fila => fila[8] !== null);
                break;
            case 'URY':
                filasFiltradas = this.datosMo.filter(fila => fila[9] !== null);
                break;
            default:
                break;
        }
        if (store.state.isCierre === 'MO') {
            filasFiltradas = filasFiltradas.filter(fila => fila[10] !== null);
        } else {
            filasFiltradas = filasFiltradas.filter(fila => fila[11] !== null);
        }
        return filasFiltradas;
    },
    setHora(event) {
      // Obtenemos la fila actual
      const rowIndex = event.parentNode.parentNode.rowIndex;
      const row = this.datosMo[rowIndex - 1]; // Restamos 1 porque los índices comienzan en 0

      // Obtenemos la fecha y hora actual
      const fechaHoraActual = new Date().toLocaleString();

      // Actualizamos el campo vacío en la fila con la fecha y hora actual
      row[row.length - 1] = fechaHoraActual;

      // Si quieres hacer algo más con la fila actual, puedes hacerlo aquí

      // Notificamos que se ha actualizado la fila
      console.log('Se ha seteado la hora para la fila:', row);
    },
  }
};

</script>

<template>
  <div>
    <Navbar />
    <Sidebar />
  <main class="mt-5 pt-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-warning">
            <h4>Checklist {{ variable }} {{ variable2 }} {{ variable3 }}</h4>
            <input id="excel" type="file" @change="cargarDatosMo()"/>
          </div>
        </div>
        <div class="row" style="color: black;">
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-header bg-warning">
                <span><i class="bi bi-table me-2"></i></span> Data Table
              </div>
              <div class="card-body bg-warning">
                <div class="table-responsive">
                  <table
                    id="example"
                    class="table table-striped data-table bg-warning"
                    style="width: 100%"
                  >
                    <thead>
                        <tr>
                        <th v-for="header in headers" :key="header">{{ header }}</th>
                        <th>Set hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in datosMo" :key="index">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                        <td><button class="btn btn-primary btn-sm" onclick="setHora(this)">Setear hora</button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th v-for="header in headers" :key="header">{{ header }}</th>
                        <th>Set hora</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
