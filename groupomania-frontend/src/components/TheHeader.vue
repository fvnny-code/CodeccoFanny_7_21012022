<template>
  <div class="header__container">
    <div class="header__banner">
      <img
        src="../assets/Groupomania_Logos/icon-left-font-monochrome-black.png"
        alt="Logo Groupomania"
      />
      <nav>
        <router-link
          aria-label="To home page"
          tag="a"
          to="/Home"
          custom
          v-slot="{ navigate }"
          ><i class="fas fa-home" @click="navigate"></i
        ></router-link>
        
        <router-link
          aria-label="To create post page"
          tag="a"
          to="/AddPost"
          custom
          v-slot="{ navigate }"
          ><i class="fas fa-pen" @click="navigate"></i
        ></router-link>
        
        <router-link
          aria-label="To my account"
          tag="a"
          to="/MyAccount"
          custom
          v-slot="{ navigate }"
          ><i class="fas solid fa-user" @click="navigate"></i
        ></router-link>
        
        <i
          aria-label="To disconnect"
          class="fas fa-power-off"
          @click="onDisconnect()"
        ></i>
      </nav>
    </div>
  </div>
</template>

<script>

</script>
<style scoped>
.header__container {
  width: 100%;
  display: flex;
}

.header__banner {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header__banner img {
  height: 8rem;
  width: 40vw;
  object-fit: cover;
  margin: 0 2rem;
  padding: 1rem;
}
.header__banner nav {
  width: 25vw;  
  font-size: 1.6rem;
  list-style-type: none;
  padding: 3rem 0;
  color: rgb(51, 49, 49);
}

.fa-power-off {
  font-size: 2rem !important;
  color: rgb(51, 49, 49);
}
.fa-home:hover,
.fa-pen:hover,
.fa-user:hover,
.fa-power-off:hover {
  transform: scale(1.2);
  transition: 0.6s;
  cursor: pointer;
}
.fa-home,
.fa-pen,
.fa-user,
.fa-power-off {
  font-size: 2rem;
  padding: .5rem 1rem;
}
.fa-power-off:hover {
  color: red;
}
@media screen and (max-width: 480px) {
    .header__banner nav {
        
        flex-direction: column;
    }
  .header__banner img {
    height: 6.8rem;
    width: 100vw;
    object-fit: cover;
  } 
} 


</style>
