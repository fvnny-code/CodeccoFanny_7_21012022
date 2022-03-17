<template>
  <div id="auth">
    <div class="auth__container">
      <div class="header__banner">
        <img
          src="../assets/Groupomania_Logos/icon-left-font-monochrome-black.png"
          alt="Logo Groupomania"
        />
      </div>
      <div class="auth__buttons">
        <button class="auth__btn">Se connecter</button>
        <button class="auth__btn">S'inscrire</button>
      </div>
    </div>
    <LoginForm />
    <TheFooter />
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "AuthView",
  data() {
    return {
      component: "",
    };
  },
  compoents: {
    LoginForm,
  },
  components: { LoginForm, TheFooter },
};
</script>
<style scoped>
.auth__container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  margin: 1rem;
}
.header__banner img {
  height: 8rem;
  width: 40vw;
  object-fit: cover;
  margin: 0 2rem;
  padding: 1rem;
}
.auth__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 1rem;
  width: 40vw;
}
.auth__btn {
  margin: 3rem 2rem;
  /* width: 7rem;
  height: 2rem; */
  padding: .8rem;
  border-radius: 2rem;
}
.auth__btn:hover {
  transform: scale(1.2);
  transition: 0.6s;
  cursor: pointer;
}
</style>
