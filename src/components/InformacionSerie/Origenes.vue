<template>
  <div class='box'>
    <h1>Origenes</h1>
    <ul v-for='origen in origenes' v-bind:key='origen'>
      <div>
        <h1>Origen {{origen}}</h1>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'origines-component',
  data() {
    return {
      origenes: []
    }
  },
  methods: {
    async getPersonajes() {
      axios 
        .get('https://rickandmortyapi.com/api/character')
        .then(res => {
          const count = res.data.info.pages
          for (let i = 1; i <= count; i++) {
            axios 
              .get(`https://rickandmortyapi.com/api/character?page${i}`)
              .then(res => {
                const data = res.data.results
                for (let i = 0; i < data.length; i++){
                  const origin = data[i].origin.name
                  console.log(data[i])
                  const findOrigin = this.origenes.find(orig => orig === origin)
                  if (findOrigin) {
                    console.log('exists')
                  } else {
                    this.origenes = this.origenes.concat(origin)
                  }
                }
              })
          }
        })
    }
  },
  mounted() {
    this.getPersonajes()
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
}

.box div {
  padding: 10px;
  color: black;
  background-color: white;
}
</style>