<template>
  <div class="header__container">
    <div class="header__banner">
      <img
        src="../assets/Groupomania_Logos/icon-left-font-monochrome-black.png"
        alt="Logo Groupomania"
      />
      <input type="checkbox" id="nav-toggle" class="nav-toggle" />
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
          to="home/feed/post"
          custom
          v-slot="{ navigate }"
          ><i class="fas fa-pen" @click="navigate"></i
        ></router-link>
        <router-link
          aria-label="To my profile"
          tag="a"
          to="/home/profile"
          custom
          v-slot="{ navigate }"
          ><i class="fas solid fa-user" @click="navigate"></i
        ></router-link>
        <i
          aria-label="To disconnect"
          class="fas fa-power-off"
          @click="logout"
        ></i>
      </nav>
      <label for="nav-toggle" class="nav-toggle-label">
        <span></span>
      </label>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: O;
  max-width: 100%;
}
.header__banner {
  background-color: white;
  text-align: center;
  position: fixed;
  z-index: 999;
  width: 100%;
}
.nav-toggle {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}
.header__banner img {
  height: 7rem;
  width: 50vw;
  object-fit: cover;
  margin-left: 2rem;
}
.nav-toggle:focus ~ .nav-toggle-label {
  outline: 3px solid rgba(whitesmoke, 0.75);
}
.nav-toggle-label {
  position: absolute;
  top: 3rem;
  left: 2rem;
  height: 100%;
  display: flex;
  align-items: flex-start;
}
i {
  font-size: 2rem;
  padding: 0.5rem 2rem;
  color: rgb(51, 49, 49);
}

i:hover {
  transition: 0.6s;
  cursor: pointer;
  color: teal;
}

.fa-power-off:hover {
  color: red;
}
.nav-toggle-label span,
.nav-toggle-label span::before,
.nav-toggle-label span::after {
  display: block;
  background: rgb(51, 49, 49);
  height: 4px;
  width: 2em;
  border-radius: 2px;
  position: relative;
}

.nav-toggle-label span::before,
.nav-toggle-label span::after {
  content: "";
  position: absolute;
}
.nav-toggle-label span::before {
  bottom: 7px;
}
.nav-toggle-label span::after {
  top: 7px;
}
nav {
  position: absolute;
  text-align: center;
  top: 100%;
  left: 0;
  font-size: 1.6rem;
  list-style-type: none;
  padding: 3rem 0;
  color: rgb(51, 49, 49);
  background: white;
  opacity: 0.85;
  width: 100%;
  transform: scale(1, 0);
  transform-origin: top;
  transition: transform 400ms ease-in-out;
}
.nav-toggle:checked ~ nav {
  transform: scale(1, 1);
}

.nav-toggle:checked ~ nav a {
  opacity: 1;
  transition: opacity 250ms ease-in-out 250ms;
}

@media screen and (min-width: 800px) {
  .nav-toggle-label {
    display: none;
  }
  .header__banner {
    display: grid;
    grid-template-columns: 1fr auto minmax(600px, 3fr) 1fr;
  }
  .header__banner img {
    grid-column: 2 / 3;
  }
  nav {
    grid-column: 3 / 4;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: relative;
    text-align: left;
    transition: none;
    transform: scale(1, 1);
    background: none;
    top: initial;
    left: initial;
  }
}
</style>
