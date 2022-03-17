<template>
  <div class='box'>
    <h1>Name: {{name}}</h1>
    <h2>Residentes</h2>
    <div class='cards_box'>
      <ul v-for='residente in residentes' v-bind:key='residente'>
        <div class='card_box'>
          <h2>{{residente.name}}</h2>
          <img 
            :src='residente.image' 
          >
        </div>
      </ul>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'ubicacion-component',
  data() {
    return {
      id: 0,
      name: '',
      residentes: []
    }
  },
  methods: {
    async getUbicacion() {
      await axios 
        .get(`https://rickandmortyapi.com/api/location/${this.id}`)
        .then(res => {
          const data = res.data
          this.name = data.name

          for (let i = 0; i < data.residents.length; i++) {
            axios.get(data.residents[i])
              .then(res => {
                const resident = {
                  name: res.data.name,
                  image: res.data.image
                }
                this.residentes = this.residentes.concat(resident)
              })
          }

        })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getUbicacion()
  }
}

</script>

<style scoped>

.box {
  padding: 20px;
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  width: auto;
  height: 100%;
  background-attachment: fixed;
  color: white;
  min-height: 100vh;
}

.cards_box {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.card_box {
  background-color: white;
  color: black;
  padding: 10px;
}
</style>
