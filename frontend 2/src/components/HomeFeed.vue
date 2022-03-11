<template>
  <div id="home">
    <div class="welcomeContainer">
      <img class="logo" src="../assets/Groupomania_Logos+(3)/icon.png" />
      <h1>{{ message }}</h1>
      <p>( "Piertotum Locomotor" 🪄)</p>
    </div>
  </div>
</template>
<script>
export default {
    name: "HomeFeed",

    data() {
    return {
      message: "Groupomagnagna",
    };
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.welcomeContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.logo {
  width: 4rem;
  height: 4rem;
  
}
h1{
  color: #ffd7d7;
  margin-right: .5rem;
}
</style>
