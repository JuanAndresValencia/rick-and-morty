<template>
  <div class='serie_box'>
    <router-link to='/personajes'>
      <div class='box_serie_card'>
        <h1>Personajes</h1>
      </div>
    </router-link>
    <router-link to='/ubicaciones'>
      <div class='box_serie_card'>
        <h1>Ubicaciones</h1>
      </div>
    </router-link>
    <router-link to='/origenes'>
      <div class='box_serie_card'>
        <h1>Orígenes</h1>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'informacion-component'
}
</script>

<style scoped>

.serie_box {
  background-image: url('https://www.gratistodo.com/wp-content/uploads/2021/09/Fondos-de-pantalla-Rick-y-Morty-Wallpapers-gratistodo.com-5.jpg');
  width: auto;
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  flex-wrap: wrap;
}

.box_serie_card {
  background-color: white;
  min-height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  text-align: center;
  -webkit-box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  transition: all 0.5s ease
}

.box_serie_card:hover {
  transform: scale(1.07);
  transition: all 1s ease
}

.box_serie_card h1 {
  font-size: 20px;
  color: black
}
</style>