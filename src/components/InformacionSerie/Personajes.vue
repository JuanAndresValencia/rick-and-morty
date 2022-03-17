<template>
  <div class='personajes_box'>
    <h1>Personajes</h1>
    <div class='all_box'>
      <ul v-for='p in personajes' v-bind:key='p'>
        <div class='single_box'>
            <h2>{{p.name}}</h2>
            <p>Estado: {{p.status}}</p>
            <p>Especie: {{p.species}}</p>
            <p>Genero: {{p.gender}}</p>
            <img :src='p.image' />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'personajes-component',
  data() {
    return {
      personajes: []
    }
  },
  methods: {
    async getPersonajes() {
      await axios 
        .get('https://rickandmortyapi.com/api/character')
        .then(res => {
          const pages = res.data.info.pages
          for (let i = 1; i <= pages; i++) {
            axios
              .get(`https://rickandmortyapi.com/api/character/?page=${i}`)
              .then(res => {
                this.personajes = this.personajes.concat(res.data.results)
              })
              .catch(err => {
                console.log(err)
              })
          }
          
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getPersonajes()
  }
}
</script>

<style scoped>

.personajes_box {
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  width: auto;
  height: 100%;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.personajes_box h1 {
  color: white;
}

.all_box {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  justify-content: center;
}

.single_box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: -7px -5px 14px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: -7px -5px 14px -14px rgba(0,0,0,0.75);
  box-shadow: -7px -5px 14px -14px rgba(0,0,0,0.75);
}
</style>
