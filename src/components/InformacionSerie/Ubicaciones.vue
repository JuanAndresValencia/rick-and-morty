<template>
  <div class='box_ubicaciones'>
    <ul v-for='ubicacion in ubicaciones' v-bind:key='ubicacion'>
      <router-link :to='`/ubicaciones/${ubicacion}`'>
        <div>
          <h1>{{ubicacion}}</h1>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ubicaciones-componente',
  data() {
    return {
      ubicaciones: []
    }
  },
  methods: {
    async obtenerUbicaciones() {
      await axios 
        .get('https://rickandmortyapi.com/api/location')
        .then(res => {
          const count = res.data.info.count
          for (let i = 1; i <= count; i++) {
            this.ubicaciones = this.ubicaciones.concat(i)
          }
        })
    }
  },
  mounted() {
    this.obtenerUbicaciones()
  }
}
</script>

<style scoped>

.box_ubicaciones {
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  width: auto;
  height: 100%;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.box_ubicaciones div {
  background-color: white;
  padding: 50px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.box_ubicaciones h1 {
  color: black;
}
</style>