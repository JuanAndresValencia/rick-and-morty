<template>
  <div class='get_cards_box'>
    <div v-if='sobreAbierto' class='get_cards_open'>
      <h1>Sobre abierto</h1>
      <button v-if='laminas.length <= 0' v-on:click='eliminarSobreAbierto'>Abrir otro Sobre</button>
      <div class='get_cards_open_box'>
        <ul v-for='lamina in laminas' v-bind:key='lamina'>
          <div class='get_cards_open_single'>
            <h1>Lamina {{lamina.data.id}}</h1>
            <p>Nombre {{lamina.data.name}}</p>
            <img :src='lamina.data.image' alt="">
            <p v-if='lamina.data.gender'>Tipo: Personaje</p>
            <p v-else>Tipo: Episodio</p>
            <button v-if='lamina.exists' v-on:click='descartarLamina(lamina.data)'>Descartar</button>
            <button v-else v-on:click='addLaminas(lamina.data)'>Agregar al album</button>
          </div>
        </ul>
      </div>
    </div>
    <div>
      <div class='get_cards_counter'>
        <h3>Temporizador</h3>
        <p>Tiempo: {{this.contador}} seg</p>
        <p v-if="contador > 0 && contador < 60">No puede abrir otro sobre</p>
      </div>
    </div>
    <div class='all_cards_box'>
      <ul v-for='sobre in sobres' v-bind:key="sobre">
        <div class='single_card'>
          <img 
            src='https://m.media-amazon.com/images/I/71J8g-lFupL._AC_SY606_.jpg' 
            v-on:click='abrirSobre'
          />
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
        let tempSobres = JSON.parse(localStorage.getItem('sobres'))
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
        this.generarLaminas()
        this.activarContador()
        this.sobreAbierto = true
        this.blockCounter = true
        localStorage.setItem('bloqueado', true)
      }
    },
    activarContador(activar) {
      this.sobreAbierto = activar
      let setCounter = setInterval(() => {
        this.contador = this.contador - 1
        localStorage.setItem('counter', Number(this.contador))
        if (this.contador <= 0) {
          clearInterval(setCounter)
          this.cleanContador()
          localStorage.removeItem('counter')
          localStorage.setItem('bloqueado', false)
        }
      }, 1000)
    },
    cleanContador() {
      this.contador = 60
      this.blockCounter = false
    },
    addLaminas(lamina) {
      if(localStorage.getItem('album')) {
        let tempAlbum = JSON.parse(localStorage.getItem('album'))
        tempAlbum.push(lamina)
        localStorage.setItem('album', JSON.stringify(tempAlbum))
        this.descartarLamina(lamina)
      } else {
        let album = []
        album.push(lamina)
        localStorage.setItem('album', JSON.stringify(album))
        this.descartarLamina(lamina)
      }
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
    },
    async descartarLamina(lamina) {
      const laminas = JSON.parse(localStorage.getItem('sobreAbierto'))
      const laminasActualizadas = laminas.filter(lam => lam.data.url != lamina.url)
      localStorage.setItem('sobreAbierto', JSON.stringify(laminasActualizadas))
      this.laminas = laminasActualizadas
    },
    eliminarSobreAbierto() {
      localStorage.removeItem('sobreAbierto')
      this.sobreAbierto = false
      if (this.contador > 0 && this.contador < 60) {
        this.blockCounter = true
      } else {
        this.blockCounter = false
      }

      const allSobres = JSON.parse(localStorage.getItem('sobres'))
      allSobres.shift()
      localStorage.setItem('sobres', JSON.stringify(allSobres))
      this.sobres = allSobres
      if (this.sobres.length === 0) {
        localStorage.removeItem('sobres')
        this.generarSobres()
      }
    },
    reanudarContador() {
      const contador = Number(localStorage.getItem('counter'))
      if (contador) {
        this.contador = contador
        let sobre = localStorage.getItem('sobreAbierto')
        if (sobre) {
          this.activarContador(true)
        } else {
          this.activarContador(false)
        }
      }
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
    async generarPersonajes(data) {
      await axios 
        .get(`https://rickandmortyapi.com/api/character/${data}`)
        .then(res => {
          for (let i = 0; i < res.data.length; i++){
            let result = {
              data: res.data[i],
              exists: this.buscarLamina(res.data[i])
            }
            this.laminas = this.laminas.concat(result)
            localStorage.setItem('sobreAbierto', JSON.stringify(this.laminas))
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async generarEpisodio(data) {
      await axios
        .get(`https://rickandmortyapi.com/api/episode/${data}`)
        .then(res => {
          let result = {
            data: res.data,
            exists: this.buscarLamina(res.data)
          }
          this.laminas = this.laminas.concat(result)
          localStorage.setItem('sobreAbierto', JSON.stringify(this.laminas))
       })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.generarSobres()

    if (localStorage.getItem('sobreAbierto')) {
      this.blockCounter = true
      this.sobreAbierto = true
      const laminas = JSON.parse(localStorage.getItem('sobreAbierto'))
      this.laminas = this.laminas.concat(laminas)
    } else {
      console.log('no hay sobre abierto')
    }

    let bloqueado = localStorage.getItem('bloqueado')
    if (bloqueado === 'true') {
      this.blockCounter = true
    }else {
      this.blockCounter = false
    }
    
    this.reanudarContador()
    
  }
}
</script>

<style scoped>

.get_cards_open {
  width: 60%;
  position: absolute;
  background-color: white;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0px;
  bottom: 0px;
  color: black;
}

.get_cards_open button {
  background-color: black;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
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
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
}

.get_cards_open_box {
  padding: 50px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
}

.get_cards_open_single {
  padding: 10px;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 5px;
  max-width: 200px;
  min-height: 150px;
}

.get_cards_open_single img{
  width: 100px;
}

.get_cards_counter {
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 10;
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
