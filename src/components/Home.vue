<template>
  <div class='box'>
    <router-link to='/obtener-laminas'>
      <div class='box_card'>
        <h1>Obtener Láminas</h1>
      </div>
    </router-link>
    <router-link to='/album'>
      <div class='box_card'>
        <h1>Mi Álbum</h1>
      </div>
    </router-link>
    <router-link to='/informacion-serie'>
      <div class='box_card'>
        <h1>Información de la serie</h1>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'home-component',
  components: {

  },
  data: () => {
    return {
      
    }
  },
}

</script>

<style scoped>

.box {
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

.box_card {
  background-color: white;
  min-height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  -webkit-box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  box-shadow: -7px -5px 14px -6px rgba(0,0,0,0.75);
  transition: all 0.5s ease
}

.box_card:hover {
  transform: scale(1.07);
  transition: all 1s ease
}

.box_card h1 {
  font-size: 20px;
  color: black
}
</style>
