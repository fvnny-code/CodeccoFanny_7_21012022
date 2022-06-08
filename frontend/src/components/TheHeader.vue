<template>
  <div class="header__container">
    <div class="header__banner">
      <router-link to="/home">
        <img src="../assets/icon-left-font.png" alt="Logo Groupomania" />
      </router-link>

      <input type="checkbox" id="nav-toggle" class="nav-toggle" />
      <nav>
        <router-link to="/home" custom v-slot="{ navigate }"><i class="fas fa-home" @click="navigate"></i></router-link>

        <router-link to="/about" custom v-slot="{ navigate }"><i class="fas solid fa-user" @click="navigate"></i>
        </router-link>
        <i aria-label="To disconnect" class="fas fa-power-off i-red" @click="logout"></i>
      </nav>
      <label for="nav-toggle" class="nav-toggle-label">
        <span></span>
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TheHeader",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
});
</script>
<style lang="scss" scoped>
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
  top: 0;
  z-index: 999;
  width: 100%;

  img {
   width: 60vw;
    margin-top: .5rem;
    object-fit: cover;
  }
}



a {
  --outline: transparent;

  &:hover {
    outline: var(--outline);
    outline-offset: 0px;
  }
}

.nav-toggle {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

.nav-toggle-label {
  position: absolute;
  top: 3rem;
  left: 2rem;
  height: 100%;
  display: flex;
  align-items: flex-start;
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

.nav-toggle:checked~nav {
  transform: scale(1, 1);
}

.nav-toggle:checked~nav a {
  opacity: 1;
  transition: opacity 250ms ease-in-out 250ms;
}

@media screen and (min-width: 800px) {
  .nav-toggle-label {
    display: none;
  }

  .header__banner {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

  }

  .header__banner img {
    margin-left: 2rem;
    width: 40vw;
  }

  nav {
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
