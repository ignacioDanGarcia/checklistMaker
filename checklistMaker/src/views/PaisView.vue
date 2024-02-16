<template>
  <div>
    <Navbar />
    <Sidebar />
  
    <main class="mt-5 pt-3">
        <div class="container-fluid">
          <div class="row2">
                <div  class="column2">
                  <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionArgStore">
                  <div  class="card2">
                    <h2>Argentina</h2>
                    <p>
                      pero que viva la patria
                    </p>
                    
                  </div></RouterLink>
                  <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionBraStore">
                  <div  class="card2">
                    <h2>Brasil</h2>
                    <p>
                      voce du carnaval(?
                    </p>
                  </div></RouterLink>
                </div>
                <div  class="column2">
                  <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionColStore">
                  <div  class="card2">
                    <h2>Colombia</h2>
                    <p>
                      dale que si freddyyyyyy
                    </p>
                    
                  </div></RouterLink>
                  <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionChiStore">
                  <div  class="card2">
                    <h2>Chile</h2>
                    <p>
                      ronaldeado devuelta?
                    </p>
                  </div></RouterLink>
                </div>
                <div  class="column2">
                  <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionUryStore">
                  <div  class="card2">
                    <h2>Uruguay</h2>
                    <p>
                      provincia numero 24
                    </p>
                    
                  </div></RouterLink>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import store from '../store/store';
export default {
  components:{
    Navbar,
    Sidebar
  },
    data() {
      return {
        password: '',
      };
    },
    methods: {
      funcionBraStore() {
          this.$store.commit('setCierre', 'BRA');
          this.$router.push('/Fecha');
      },
      funcionArgStore() {
          this.$store.commit('setCierre', 'ARG');
          this.$router.push('/Fecha');
      },
      funcionColStore() {
          this.$store.commit('setCierre', 'COL');
          this.$router.push('/Fecha');
      },
      funcionChiStore() {
          this.$store.commit('setCierre', 'CHI');
          this.$router.push('/Fecha');
      },
      funcionUryStore() {
          this.$store.commit('setCierre', 'URY');
          this.$router.push('/Fecha');
      },
    },
  };
</script>
