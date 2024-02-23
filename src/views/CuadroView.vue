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
      datosChecklist: [],
      datosPostmortem: [],
      selectedOption: null,
      options: [
        { value: 'Mariana', label: 'Mariana' },
        { value: 'Julian', label: 'Julian' },
        { value: 'Mariano', label: 'Mariano' },
        { value: 'Nacho', label: 'Nacho' },
      ]
    };
  },
  mounted() {
    this.cargardatosChecklist();
    
  },
  methods: {
    async cargardatosChecklist() {
      try {
        //const rutaExcel = path.join(__dirname, `${store.state.isFecha}${store.state.isPais}${store.state.isCierre}.xlsx`);
        const workbook = await this.leerArchivoExcel(document.getElementById('excel'));
        await this.cargardatosPostmortem(document.getElementById('excel'));
        
      } catch (error) {
        console.error('Error al cargar o procesar el archivo Excel:', error);
      }
    },
    async cargardatosPostmortem(rutaExcel){
      const input = rutaExcel;
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        
        const sheetNames = workbook.SheetNames;

        
        let targetSheetName = `Postmortem`;
        
        if (sheetNames.includes(targetSheetName)) {
          const worksheet = workbook.Sheets[targetSheetName];

          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log(rows.length); // Verifica la longitud de datosPostmortem en la consola del navegador

          this.datosPostmortem = rows.slice(0);
          console.log(this.datosPostmortem.length);

        }
      };

      reader.readAsArrayBuffer(file);
    },
    async leerArchivoExcel(rutaExcel) {
      const input = rutaExcel;
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        
        const sheetNames = workbook.SheetNames;

        
        let targetSheetName = `${store.state.isFecha}${store.state.isPais}${store.state.isCierre}`;
        
        if (!sheetNames.includes(targetSheetName)) {
          readXlsFile(input.files[0]).then((rows) => {
              this.datosChecklist = rows.slice(1);

              const filasFiltradas = this.filtrarFilas(this.datosChecklist);
              const primeraFila = rows[0];
              this.headers = primeraFila.slice(0, 4);

              this.datosChecklist = filasFiltradas.slice(1).map(fila => fila.slice(0, 4));
          });
        }
        else{
        
          const worksheet = workbook.Sheets[targetSheetName];

          
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          this.datosChecklist = rows.slice(1).map(row => {
            return row.slice(0, 4).map((cell, columnIndex) => {
              if (!isNaN(cell) && columnIndex === 3) {
                const excelDate = cell;
                const millisecondsSince1970 = (excelDate - 25569) * 86400 * 1000;
                let fecha = new Date(millisecondsSince1970);
                if (!isNaN(fecha.getTime())) {
                  // Formatear la fecha en el formato deseado (ejemplo: DD/MM/YYYY HH:mm:ss)
                  const formattedDate = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours() + 3}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
                  return formattedDate;
                }
              }
              return cell;
            });
          });
          this.headers = rows[0].slice(0, 4);

        }
        
      };

      reader.readAsArrayBuffer(file);
    },
    descargarHojaExcel() {
      const rutaExcel = document.getElementById('excel');
      const file = rutaExcel.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const arrayBuffer = reader.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = `${store.state.isFecha}${store.state.isPais}${store.state.isCierre}`;

        //Hoja checklist--------------------------------------------------
        if (workbook.SheetNames.includes(sheetName)) {
          const sheetIndex = workbook.SheetNames.indexOf(sheetName);
          workbook.SheetNames.splice(sheetIndex, 1);
          delete workbook.Sheets[sheetName];
        }
        const datosConTiempoArreglado = this.datosChecklist.map(row => {
          return row.map(cell => {
            if (!isNaN(cell) && typeof cell === 'number') {
              const excelDate = cell;
              const millisecondsSince1970 = (excelDate - 25569) * 86400 * 1000;
              const fecha = new Date(millisecondsSince1970);
              fecha.setHours(fecha.getHours());
              return fecha;
            } else {
              return cell;
            }
          });
        });


          // Agrega 'Texto Extra' así los lee bien a la hora de volverlos a cargar otro dia
        const datosConTextoExtra = datosConTiempoArreglado.map(row => {
          return [...row, 'Texto Extra'];
        });
        const nuevaHoja = XLSX.utils.aoa_to_sheet([this.headers, ...datosConTextoExtra]);

        XLSX.utils.book_append_sheet(workbook, nuevaHoja, sheetName);
        //Fin hoja checklist--------------------------------------------------
        
        //Hoja postmortem--------------------------------------------------
        const postmortemSheetIndex = workbook.SheetNames.indexOf('Postmortem');
        if (postmortemSheetIndex !== -1) {
          workbook.SheetNames.splice(postmortemSheetIndex, 1);
          delete workbook.Sheets['Postmortem'];
        }
        const datosConINCIDENCIA = this.datosPostmortem.map(row => {
          // Obtener el valor del Jira
          const jira = row[row.length - 2]; // Asumiendo que el Jira es la penúltima columna
          // Crear el enlace usando el formato adecuado para Excel
          const enlace = `=HIPERVINCULO("https://jira.prosegur.com/browse/${jira}"; "${jira}")`;
          // Devolver la fila con el enlace y el valor "INCIDENCIA" agregados
          return [...row.slice(0, -2), enlace, 'INCIDENCIA'];
        });
        const hojaPostmortem = XLSX.utils.aoa_to_sheet(datosConINCIDENCIA);
        XLSX.utils.book_append_sheet(workbook, hojaPostmortem, 'Postmortem');
        //Fin hoja postmortem--------------------------------------------------

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sheetName}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      };

      reader.readAsArrayBuffer(file);
    },
    filtrarFilas(datos) {
        let filasFiltradas = [];
        switch (store.state.isPais) {
            case 'ARG':
                filasFiltradas = datos.filter(fila => fila[5] !== null);
                break;
            case 'BRA':
                filasFiltradas = datos.filter(fila => fila[6] !== null);
                break;
            case 'COL':
                filasFiltradas = datos.filter(fila => fila[7] !== null);
                break;
            case 'CHI':
                filasFiltradas = datos.filter(fila => fila[8] !== null);
                break;
            case 'URY':
                filasFiltradas = datos.filter(fila => fila[9] !== null);
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
    isDate(value, columnIndex) {
      if (value === null) {
        return value;
      }
      
      if (!isNaN(value) && columnIndex === 3) {
        
        const excelDate = value;
        
        const millisecondsSince1970 = (excelDate - 25569) * 86400 * 1000;
        const fecha = new Date(millisecondsSince1970);
        
        if (!isNaN(fecha.getTime())) {
          return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
        } else {
          return value; 
        }
      } else {
        return value;
      }
    },
    setHora(event) {
      
      const rowIndex = event.target.parentNode.parentNode.rowIndex;
      
      const cellIndex = 3; 
      
      const now = new Date();
      const excelDate = (now.getTime()   - new Date(Date.UTC(1899, 11, 30)).getTime()) / (1000 * 60 * 60 * 24);
      
      this.datosChecklist[rowIndex - 1][cellIndex] = excelDate;

      
      console.log('Se ha establecido la hora para la fila:', rowIndex, 'en la columna:', cellIndex);
    },
    agregarFila() {
      
      const tipoCierre = this.$store.state.isCierre;
      const fecha = this.$store.state.isFecha;
      const etapa = 'Cierre'; 
      const responsable = this.selectedOption;
      const accion = document.getElementById('accion').value; 
      const observaciones = document.getElementById('observaciones').value;
      const ticket = document.getElementById('ticket').value; 
      const jira = document.getElementById('jira').value; 
      
      
      const nuevaFila = [tipoCierre, fecha, etapa, responsable, accion, observaciones, ticket, jira, 'INCIDENCIA'];
      
      
      this.datosPostmortem.push(nuevaFila);
      
    
    },
    eliminarFila(index) {
      
      this.datosPostmortem.splice(index, 1);
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
            <h4>Checklist {{ $store.state.isFecha }}{{ $store.state.isPais }}{{ $store.state.isCierre }}</h4>
            <input id="excel" type="file" @change="cargardatosChecklist()"/>
          </div>
        </div>
        <div class="row" style="color: black;">
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-header bg-warning">
                Checklist Table
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
                        <tr v-for="(row, index) in datosChecklist" :key="index">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ isDate(cell, cellIndex) ? isDate(cell, cellIndex) : cell }}</td>
                        <td><button class="btn btn-primary btn-sm" @click="setHora($event)">Setear hora</button></td>
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
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-header bg-warning">
                Postmortem Table
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
                            <td>Tipo cierre</td>
                            <td>Fecha</td>
                            <td>Etapa</td>
                            <td>Responsable</td>
                            <td>Acción</td>
                            <td>Observaciones</td>
                            <td>Ticket</td>
                            <td>Jira</td>
                          </tr>
                    </thead>
                    <tbody>
                          <tr>
                            <td>{{ $store.state.isCierre }}</td>
                            <td>{{ $store.state.isFecha }}</td>
                            <td>
                              Cierre
                            </td>
                            <td><select v-model="selectedOption">
                              <!--no le des bola a este problem, funciona igual-->
                                <option v-for="option in options" :value="option.value">{{ option.label }}</option>
                              </select></td>
                            <td><input id="accion"></td>
                            <td><input id="observaciones"></td>
                            <td><input id="ticket"></td>
                            <td><input id="jira"></td>
                            <td><button class="btn btn-success btn-sm" @click="agregarFila(this)">Agregar</button></td>
                          </tr>
                          <tr v-for="(row, index) in datosPostmortem" :key="index">
                          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                          <td><button class="btn btn-danger btn-sm" @click="eliminarFila(index)">Eliminar</button></td>
                          </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 text-center">
              <button class="btn btn-success" @click="this.descargarHojaExcel()">Descargar archivo</button>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>
