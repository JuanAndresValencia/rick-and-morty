<template>
  <div class='box'>
    <h1>Mi Albúm</h1>

    <section class='box_general'>
      <div class='box_general_title'>
        <h1>Personajes:</h1>
      </div>
      <div class='box_general_content'>
        <ul v-for='personaje in personajes' v-bind:key='personaje'>
          <div>
            <h1>{{personaje.data.id}}</h1>
            <img 
              v-if='personaje.exists'
              :src='personaje.data.image' 
              alt=""
            >
            <p v-if='personaje.exists'>{{personaje.data.name}}</p>
            <router-link :to='`/personajes/${personaje.data.id}`'>
              <button v-if='personaje.exists'>Detail</button>
            </router-link>
          </div>
        </ul>
      </div>
    </section>

    <section class='box_general'>
      <div class='box_general_title'>
        <h1>Episodios</h1>
      </div>
      <div class='box_general_content'>
        <ul v-for='episodio in episodios' v-bind:key='episodio'>
          <div>
            <h1>{{episodio.data.id}}</h1>
            <p v-if='episodio.exists'>{{episodio.data.name}}</p>
            <img v-if='episodio.exists' src='https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_UY1200_CR85,0,630,1200_AL_.jpg' />
            <router-link :to='`/episodios/${episodio.data.id}`'>
              <button v-if='episodio.exists'>Detail</button>
            </router-link>
          </div>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'album-component',
  data: () => {
    return {
      personajes: [],
      episodios: []
    }
  },
  methods: {
    async obtenerPersonajes() {
      await axios 
        .get('https://rickandmortyapi.com/api/character')
        .then(res => {
          const pages = res.data.info.pages
          for (let i = 1; i <= pages; i++) {
            axios 
              .get(`https://rickandmortyapi.com/api/character?page=${i}`)
              .then(res => {
                const length = res.data.results.length
                for (let i = 0; i < length; i++) {
                  let result = {
                    data: res.data.results[i],
                    exists: this.buscarLamina(res.data.results[i])
                  }
                  this.personajes = this.personajes.concat(result)
                }
                
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async obtenerEpisodios() {
      await axios 
        .get('https://rickandmortyapi.com/api/episode')
        .then(res => {
          const pages = res.data.info.pages
          for (let i = 1; i <= pages; i++) {
            axios
              .get(`https://rickandmortyapi.com/api/episode?page=${i}`)
              .then(res => {
                const length = res.data.results.length
                for (let i = 0; i < length; i++) {
                  let result = {
                    data: res.data.results[i],
                    exists: this.buscarLamina(res.data.results[i])
                  }
                  this.episodios = this.episodios.concat(result) 
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    buscarLamina(lamina) {
      let miAlbum = JSON.parse(localStorage.getItem('album'))
      if (miAlbum) {
        let exists = miAlbum.find(lam => lam.url === lamina.url)
        if (exists) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  mounted() {
    this.obtenerPersonajes()
    this.obtenerEpisodios()
  }
}

</script>

<style scoped>

.box {
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  height: 100%;
  min-height: 100vh;
  background-attachment: fixed;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px
}


.box_general_content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 10px;
  row-gap: 20px;
  padding: 20px;
}

@media screen and (max-width: 1000px) {
  .box_general_content {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 650px) {
  .box_general_content {
    grid-template-columns: repeat(2, 1fr);
  }
}

.box_general_content button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 5px;
}

.box_general_content div {
  border: 1px solid rgb(212, 212, 212);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  min-width: 150px;
  max-width: 170px;
  min-height: 250px;
  max-height: 350px;
  height: 95%;
  text-align: center;
}

.box_general_content img {
  max-width: 100px
}
</style>
