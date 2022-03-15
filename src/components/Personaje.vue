<template>
  <div class='box'>
    <div class='box_card'>
      <h1>Name: {{personaje.name}}</h1>
      <img 
        :src='personaje.image' 
      >
      <h2>Especie: {{personaje.species}}</h2>
      <h2>Estado: {{personaje.status}}</h2>
      <h2>Genero: {{personaje.gender}}</h2>
    </div>
  </div> 
</template>

<script>
import axios from 'axios'

export default {
  name: 'personaje-component',
  data() {
    return {
      id: 0,
      personaje: {}
    }
  },
  methods: {
    async obtenerPersonaje() {
      console.log(this.id)
      axios 
        .get(`https://rickandmortyapi.com/api/character/${this.id}`)
        .then(res => {
          console.log(res.data)
          this.personaje = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.obtenerPersonaje()
  }
}
</script>

<style scoped>

.box {
  width: auto;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
}

.box_card {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  transition: all 0.5s;
  background-color: white;
  -webkit-box-shadow: 2px -1px 11px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px -1px 11px -6px rgba(0,0,0,0.75);
  box-shadow: 2px -1px 11px -6px rgba(0,0,0,0.75);
}

.box_card img {
  max-width: 300px;
  max-height: 400px;
  object-fit: cover;
}

.box_card:hover {
  transform: scale(1.05);
  transition: all 1s ease;
}

</style>
