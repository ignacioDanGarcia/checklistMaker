<template>
  <div>
    <Navbar />
    <Sidebar />
  
    <main class="mt-5 pt-3">
        <div class="container-fluid">
          <div class="row2">
                <div  class="column2">
                  <RouterLink to="/Pais" class="text-decoration-none text-white" @click="funcionMoStore">
                  <div  class="card2">
                    <h2>MOther</h2>
                    <p>
                      mano de obra manito
                    </p>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                  </div></RouterLink>
                </div>
                <div  class="column2">
                  <RouterLink to="/Pais" class="text-decoration-none text-white" @click="funcionFactStore">
                  <div  class="card2">
                    <h2>FACTer</h2>
                    <p>
                      faturazao
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
      funcionMoStore() {
          this.$store.commit('setCierre', 'MO');
          this.$router.push('/Pais');
      },
      funcionFactStore() {
          this.$store.commit('setCierre', 'FACT');
          this.$router.push('/Pais');
      },
    },
  };
</script>

<style>
body{
  background-color: rgb(82, 82, 82);
}
.row2 {
    display: flex;
    flex-wrap: wrap;
}

.column2 {
    width: 100%;
    padding: 0 1em 1em 1em;
    text-align: center;
}

.card2 {
    border: 1px solid #000;
    width: 100%;
    height: 100%;
    padding: 2em 1.5em;
    background: linear-gradient(#000 50%, #ffea00 50%);
    background-size: 100% 200%;
    background-position: 0 2.5%;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s;
}
h2 {
    font-size: 20px;
    font-weight: 600;
    color: #ffea00;
    margin: 1em 0;
}

p {
    color: #bbb;
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: 0.03em;
    margin: 0;
}

.card2:hover {
    background-position: 0 100%;
}

.card2:hover h2 {
    color: #000;
}

.card2:hover p {
    color: #000;
}

@media screen and (min-width: 768px) {
    .column2 {
        flex: 0 50%;
        max-width: 50%;
    }
}

@media screen and (min-width: 992px) {
    .column2 {
        flex: 0 0 33.33%;
        max-width: 33.33%;
    }
}

</style>