<template>
  <div>
    <Navbar />
  
    <main class="mt-5 pt-3">
      <div class="container-fluid" >
        <div class="row">
          <!-- Argentina -->
          <div class="col-lg-6 mb-4">
            <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionArgStore">
              <div class="card2">
                <h2>Argentina</h2>
                <p>pero que viva la patria</p>
              </div>
            </RouterLink>
          </div>
          <!-- Brasil -->
          <div class="col-lg-6 mb-4">
            <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionBraStore">
              <div class="card2">
                <h2>Brasil</h2>
                <p>voce du carnaval(?</p>
              </div>
            </RouterLink>
          </div>
          <!-- Colombia -->
          <div class="col-lg-6 mb-4">
            <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionColStore">
              <div class="card2">
                <h2>Colombia</h2>
                <p>dale que si freddyyyyyy</p>
              </div>
            </RouterLink>
          </div>
          <!-- Chile -->
          <div class="col-lg-6 mb-4">
            <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionChiStore">
              <div class="card2">
                <h2>Chile</h2>
                <p>ronaldeado devuelta?</p>
              </div>
            </RouterLink>
          </div>
          <!-- Uruguay -->
          <div class="col-lg-6 mb-4">
            <RouterLink to="/Fecha" class="text-decoration-none text-white" @click="funcionUryStore">
              <div class="card2">
                <h2>Uruguay</h2>
                <p>provincia numero 24</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import store from '../store/store';
export default {
  components:{
    Navbar
  },
    data() {
      return {
        password: '',
      };
    },
    methods: {
      funcionBraStore() {
          this.$store.commit('setPais', 'BRA');
          this.$router.push('/Fecha');
      },
      funcionArgStore() {
          this.$store.commit('setPais', 'ARG');
          this.$router.push('/Fecha');
      },
      funcionColStore() {
          this.$store.commit('setPais', 'COL');
          this.$router.push('/Fecha');
      },
      funcionChiStore() {
          this.$store.commit('setPais', 'CHI');
          this.$router.push('/Fecha');
      },
      funcionUryStore() {
          this.$store.commit('setPais', 'URY');
          this.$router.push('/Fecha');
      },
    },
  };
</script>
