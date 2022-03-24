<template>
  <div id="auth">
    <div class="auth__container">
      <div class="header__banner">
      <img
        src="../assets/Groupomania_Logos/icon-left-font-monochrome-black.png"
        alt="Logo Groupomania"
      />
    </div>
    <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    
      <div class="form-row">
        <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="prenom" class="form-row__input" type="text" placeholder="Prénom" />
        <input v-model="nom" class="form-row__input" type="text" placeholder="Nom" />
      </div>
      <div class="form-row">
        <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
      </div>
    <!-- <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div> -->
      <div class="form-row">
        <button class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login' ">Connexion</button>
        <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>Créer un compte</button>
      </div>

    </div>
      <!-- <TheFooter /> -->
    </div>
  </div>
</template>
<script>
// import LoginForm from "../components/LoginForm.vue";
// import TheFooter from "@/components/TheFooter.vue";


export default {
  name: "AuthView",
  data() {
    return {
      mode: "login",
      email: "",
      prenom: "",
      nom: "",
      password: "",
    };
  },
  components: {},
  computed: {
    
    
  },
  methods:{
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    // createAccount: function (){
    //   console.log(this.email, this.prenom, this.nom, this.password);
    //   },
    
  }
};
</script>
<style scoped>
.auth__container {
  text-align: center;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 1rem;
}
.header__banner img {
  width: 300px;
  height: 150px;
  object-fit: cover;
 
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  max-width: 60%;
  margin: auto;
  padding: 1rem;
}
.form-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.2rem;
  gap: 1rem;
  flex-wrap: wrap;
}
.form-row__input {
  padding: .5rem;
  border: none;
  border-radius: 0.5rem;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
.button {
  border: none;
  margin: auto;
  max-width: 100%;
  min-width: 200px;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

@media screen and (max-width: 480px) {
.header__banner img {
  width: 250px;
  height: 150px;
  object-fit: cover;
 
}
}
</style>
