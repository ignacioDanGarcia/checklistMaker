<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import store from '../store/store';

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
      datosMo: []
    };
  },
  mounted() {
    const rutaExcel = 'CheckListGlobal.xlsx';
    this.cargarDatosMo(rutaExcel);
  },
  methods: {
    cargarDatosMo(rutaExcel) {
      const nombreArchivo = `${store.state.isCierre}${store.state.isPais}${store.state.isFecha}.json`;

      // Ruta del archivo JSON
      const rutaJson = `/${nombreArchivo}`;

      // Utiliza fetch para verificar si el archivo existe
      fetch(rutaJson, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            // Si el archivo existe, cargarlo
            return response.json();
          } else {
            // Si el archivo no existe, crearlo
            return this.crearArchivo(rutaExcel, nombreArchivo);
          }
        })
        .then(data => {
          // Almacena los datos recuperados en la propiedad datosMo
          this.datosMo = data;
        })
        .catch(error => {
          console.error('Error al cargar o crear el archivo JSON:', error);
        });
    },
    async crearArchivo(rutaExcel, nombreArchivo) {
      const workbook = await this.leerArchivoExcel(rutaExcel);
      const jsonData = this.convertirHojaAJson(workbook);

      const rutaJson = `/${nombreArchivo}`;
      await this.escribirArchivoJson(rutaJson, jsonData);
      return jsonData;
    },
    async leerArchivoExcel(rutaExcel) {
      const response = await fetch(rutaExcel);
      const data = await response.arrayBuffer();
      return XLSX.read(data, { type: 'array' });
    },
    convertirHojaAJson(workbook) {
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    },
    async escribirArchivoJson(rutaJson, data) {
      const file = new File([JSON.stringify(data)], rutaJson, { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/guardar-json', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al guardar el archivo JSON');
      }
    }
  }
}

</script>

<template>
  <div>
    <Navbar />
    <Sidebar />
  <main class="mt-5 pt-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-warning">
            <h4>Checklist</h4>
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
