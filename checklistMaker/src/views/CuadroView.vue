<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import store from '../store/store';
import * as XLSX from 'xlsx';

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
    const rutaExcel = 'CheckListGlobal.xlsx';
    this.cargarDatosMo(rutaExcel);
  },
  methods: {
    async cargarDatosMo(rutaExcel) {
      try {
        const workbook = await this.leerArchivoExcel(rutaExcel);
        this.procesarDatos(workbook);
        const nombreArchivo = `${store.state.isCierre}${store.state.isPais}${store.state.isFecha}.json`;
        await this.guardarArchivoJson(nombreArchivo);
      } catch (error) {
        console.error('Error al cargar o procesar el archivo Excel:', error);
      }
    },
    async leerArchivoExcel(rutaExcel) {
      const response = await fetch(rutaExcel, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      });
      const data = await response.arrayBuffer();
      return XLSX.read(data, { type: 'array' });
    },
    procesarDatos(workbook) {
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.headers = sheetData.slice(0, 4).map(row => row[0]);
      this.datosMo = sheetData.slice(4).map(row => row.slice(0, 4));
    },
    async guardarArchivoJson(nombreArchivo) {
      const data = { headers: this.headers, datosMo: this.datosMo };
      const jsonData = JSON.stringify(data);
      const file = new File([jsonData], nombreArchivo, { type: 'application/json' });
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
