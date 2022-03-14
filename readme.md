<template>
  <div>
    <h1>App</h1>
    <h1>App Characters {{characters.length}}</h1>
    <ul v-for="c in characters" v-bind:key="c">
      <li>{{c.id}} {{c.name}}</li>
      <img :src='c.image' />
      <button v-on:click="addFavorite(c.id, c.name)">Add as a favorite</button>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home-component',
  components: {

  },
  data: () => {
    return {
      count: 0,
      characters: []
    }
  },
  methods: {
    addFavorite(id, name) {
      this.$router.push({ name: 'Album'})
      const character = {
        id,
        name
      }
      if (localStorage.getItem('characters')) {
        const tempData = JSON.parse(localStorage.getItem('characters'))
        tempData.push(character)
        localStorage.setItem('characters', JSON.stringify(tempData))
      } else {
        const tempData = []
        tempData.push(character)
        localStorage.setItem('characters', JSON.stringify(tempData))
      }
    },
    async getCharacters() {
      for (let i = 1; i < 43; i++) {
        await axios 
          .get(`https://rickandmortyapi.com/api/character?page=${i}`)
          .then(res => {
            this.characters = this.characters.concat(res.data.results)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  created() {
    this.getCharacters()
  }
}

</script>

<style scoped>

</style>
