<template>
  <div class='get_cards_box'>
    <div v-if='sobreAbierto' class='get_cards_open'>
      <h1>Sobre abierto</h1>
      <div class='get_cards_open_box'>
        <ul v-for='lamina in laminas' v-bind:key='lamina'>
          <div class='get_cards_open_single'>
            <h1>Lamina {{lamina.data.id}}</h1>
            <p>Nombre {{lamina.data.name}}</p>
            <p v-if='lamina.data.gender'>Tipo: Personaje</p>
            <p v-else>Tipo: Episodio</p>
            <button v-if='lamina.exists' >Descartar</button>
            <button v-else v-on:click='addLaminas(lamina.data)'>Agregar al album</button>
          </div>
        </ul>
      </div>
    </div>
    <h1>Obtener Láminas</h1>
    <div>
      <div class='get_cards_counter'>
        <h1>Temporizador</h1>
        <p>Time: {{this.contador}} seg</p>
      </div>
    </div>
    <div class='all_cards_box'>
      <ul v-for='sobre in sobres' v-bind:key="sobre">
        <div class='single_card'>
          <img 
            src='https://m.media-amazon.com/images/I/71J8g-lFupL._AC_SY606_.jpg' 
            v-on:click='abrirSobre'
          />
          <h1>
            id: {{sobre.id}}
          </h1>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'obtener-component',
  data() {
    return {
      sobres: [],
      contador: 60,
      blockCounter: false,
      sobreAbierto: false,
      laminas: []
    }
  },
  methods: {
    generarSobres() {
      let currentSobres = localStorage.getItem('sobres')
      if (currentSobres) {
        console.log('todavia hay sobres')
        let tempSobres = JSON.parse(localStorage.getItem('sobres'))
        console.log(tempSobres)
        this.sobres = this.sobres.concat(tempSobres)
      } else {
        for (let i = 1; i < 5; i++) {
        this.sobres = this.sobres.concat({
          id: i
        })
      }
        localStorage.setItem('sobres', JSON.stringify(this.sobres))
      }
    },  
    abrirSobre() {
      if (this.blockCounter) {
        console.log('esta bloqueado')
      } else {
        console.log('sobre abierto')
        this.activarContador()
        this.blockCounter = true
        this.generarLaminas()
      }
    },
    activarContador() {
      console.log('counter active')
      this.sobreAbierto = true
      let setCounter = setInterval(() => {
        this.contador = this.contador - 1
        if (this.contador <= 0) {
          clearInterval(setCounter)
          this.cleanContador()
        }
      }, 1000)
    },
    cleanContador() {
      this.contador = 60
      this.blockCounter = false
    },
    async generarLaminas() {
      let randomPersonajes = []
      let randomEpisodio = Math.floor(Math.random() * (51 - 1) + 1)
      for (let i = 0; i < 4; i++) {
        let value = Math.floor(Math.random() * (826 - 1) + 1)
        randomPersonajes.push(value)
      }

      await this.generarPersonajes(randomPersonajes)
      await this.generarEpisodio(randomEpisodio)
      
    },
    generarPersonajes(data) {
      axios 
        .get(`https://rickandmortyapi.com/api/character/${data}`)
        .then(res => {
          for (let i = 0; i < res.data.length; i++){
            let result = {
              data: res.data[i],
              exists: this.buscarLamina(res.data[i])
            }
            console.log(result)
            this.laminas = this.laminas.concat(result)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    generarEpisodio(data) {
      axios
        .get(`https://rickandmortyapi.com/api/episode/${data}`)
        .then(res => {
          console.log(res.data)
          let result = {
            data: res.data,
            exists: this.buscarLamina(res.data)
          }
          this.laminas = this.laminas.concat(result)

        })
        .catch(err => {
          console.log(err)
        })
    },
    addLaminas(lamina) {
      if(localStorage.getItem('album')) {
        let tempAlbum = JSON.parse(localStorage.getItem('album'))
        console.log('album', tempAlbum)
        tempAlbum.push(lamina)
        localStorage.setItem('album', JSON.stringify(tempAlbum))
      } else {
        let album = []
        album.push(lamina)
        localStorage.setItem('album', JSON.stringify(album))
      }
    },
    eliminarLamina(lamina) {
      console.log(lamina)
    },
    buscarLamina(lamina) {
      let miAlbum = JSON.parse(localStorage.getItem('album'))
      if (miAlbum) {
        let exists = miAlbum.find(lam => lam.name === lamina.name)
        if (exists){
          return true
        } else {
          return false
        }
      } else {
        return false
      } 
    }
  },
  created() {
    this.generarSobres()
  }
}
</script>

<style scoped>

.get_cards_open {
  width: 90%;
  position: absolute;
  background-color: white;
  z-index: 5;
  top: 0px;
  bottom: 0px;
  color: black;
}

.get_cards_box {
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  width: auto;
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

.get_cards_open_box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 50px;
  gap: 20px;
}

.get_cards_open_single {
  padding: 20px;
  cursor: pointer;
  border: 1px solid gray;
}

.get_cards_counter {
  background-color: white;
  color: black;
  padding: 50px;
}

.all_cards_box {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
}

.single_card {
  overflow: hidden;
  cursor: pointer;
  animation-name: card;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.single_card img {
  width: 270px;
  border-radius: 50px;
}

@keyframes card {
  from {
    transform: translateY(0px)
  }
  to {
    transform: translateY(15px)
  }
}

</style>
