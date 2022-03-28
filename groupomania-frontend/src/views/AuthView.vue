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
        <p class="card__subtitle" v-if="mode == 'login'">
          Tu n'as pas encore de compte ?
          <span class="card__action" @click="switchToCreateAccount()"
            >Créer un compte</span
          >
        </p>
        <p class="card__subtitle" v-else>
          Tu as déjà un compte ?
          <span class="card__action" @click="switchToLogin()"
            >Se connecter</span
          >
        </p>

        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row" v-if="mode == 'create'">
          <input
            v-model="pseudo"
            class="form-row__input"
            type="text"
            placeholder="Votre pseudo"
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <!-- <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div> -->
        <div class="form-row">
          <button
            @click="login()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-if="mode == 'login'"
          >
            Connexion
          </button>
          <button
            @click="signup()"
            class="button"
            :class="{ 'button--disabled': !validatedFields }"
            v-else
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>
<script>
// import LoginForm from "../components/LoginForm.vue";
// import TheFooter from "@/components/TheFooter.vue";

import axios from "axios";
// import { response } from "express";

export default {
  name: "AuthView",
  data() {
    return {
      mode: "login",
      
      // email: "",
      // pseudo: "",
      // password: "",
      dataSignup: {
        email: "",
        pseudo: "",
        password: "",
      },
      dataSignupS: "",
      dataLogin: {
        email: "",
        password: "",
      },
      dataLoginS: "",
      form: true,
      msg: false,
      message: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "login") {
       if(this.email != "" && this.password != ""){
         return true 
       } else{
         return false;
       }
      } else {
        if (this.email != "" && this.pseudo != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    signup() {
      // this.$store
      //   .dispatch("signup", {
      //     email: this.email,
      //     pseudo: this.pseudo,
      //     password: this.password,
      //   })
      //   .then(
      //     function (response) {
      //       console.log(response);
      //     }, function(error){
      //       console.log(error);
      //     }
      //   )
      this.dataSignupS = JSON.stringify(this.dataSignup);
      axios
        .post("http://localhost:300/api/auth/signup", this.dataSignupS, {
          headers: { "Content-Type": "application.json" },
        })
        .then((response) => {
          let sign = JSON.parse(response.data);
          this.message = sign.message;
          this.form = false;
          this.msg = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
          this.msg = true;
        });
    },
    login() {
      this.dataLoginS = JSON.stringify(this.dataLogin);
      axios
        .post("http://localhost:300/api/auth/login", this.dataLoginS, {
          headers: { "Content-Type": "application.json" },
        })
        .then((response) => {
          let log = JSON.parse(response.data);
          localStorage.userId = log.userId;
          localStorage.token = log.token;
          localStorage.moderation = log.moderation;
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
          this.msg = true;
        });
    },
  },
  components: {},
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
.card__action:hover {
  color: teal;
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
  padding: 0.5rem;
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
.button--disabled {
  background-color: #bbb;
}
.button {
  border: none;
  margin: auto;
  max-width: 100%;
  min-width: 200px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: teal;
  color: white;
}
@media screen and (max-width: 480px) {
  .header__banner img {
    width: 250px;
    height: 150px;
    object-fit: cover;
  }
  .button {
    min-width: 115px;
  }
}
</style>
