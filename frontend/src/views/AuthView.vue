<template>
    <div id="auth">
        <div class="auth__container">
            <div class="header__banner">
                <img src="../assets/icon-left-font.png" alt="Logo Groupomania" />

            </div>
            <div class="card">
                <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
                <h1 class="card__title" v-else>Inscription</h1>
                <p v-if="mode == 'login'">
                    Tu n'as pas encore de compte ?
                    <span class="card__action" @click="switchToCreateAccount()">
                        Créer un compte
                    </span>
                </p>
                <p v-else>
                    Tu as déjà un compte ?
                    <span class="card__action" @click="switchToLogin()">
                        Se connecter
                    </span>
                </p>

                <div class="form-row">
                    <label for="email">Email</label>
                    <input v-model="dataLogin.email" class="form-row__input" type="email" placeholder="email@mail.com"
                        :rules="emailRules" autofocus required />
                </div>
                <div class="form-row" v-if="mode == 'create'">
                    <label for="userName">Pseudo</label>
                    <input v-model="dataLogin.username" class="form-row__input" type="text" placeholder="Votre pseudo"
                        :rules="usernameRules" autofocus required />
                </div>
                <div class="form-row">
                    <label for="password">Mot de passe (8 caractères minimum)</label>
                    <input v-model="dataLogin.password" class="form-row__input" type="password"
                        placeholder="Mot de passe" :rules="passwordRules" autofocus required />
                </div>

                <div class="form-row">
                    <button @click="login()" class="btn btn--outline" v-if="mode == 'login'">
                        Connexion
                    </button>
                    <button @click="signup()" class="btn btn--outline" v-else>
                        Créer un compte
                    </button>
                </div>
            </div>
        </div>
        <TheFooter></TheFooter>
    </div>
</template>
<script>
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
    name: "AuthView",
    components: { TheFooter },
    mounted: function () { },
    data() {
        return {
            mode: "login",
            valid: true,
            usernameRules: [
                v => !!v || 'Username is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],

            dataLogin: {
                email: "",
                username: "",
                password: "",
            },
            dataLoginS: "",// data stringuifiées
            form: true,
            msg: false,
            message: "",
            errors: [],
        };
    },
    validations: {},
 
    methods: {
        switchToCreateAccount: function () {
            this.mode = "create";
        },
        switchToLogin: function () {
            this.mode = "login";
        },
        signup() {
            this.dataLoginS = JSON.stringify(this.dataLogin);
            axios
                .post(
                    "http://localhost:3000/api/auth/signup",
                    this.dataLoginS,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    let sign = response.data;
                    this.message = sign.message;
                    this.form = false;
                    this.msg = true;
                    localStorage.email = response.data.email;
                    localStorage.userId = response.data.userId;
                    localStorage.username = response.data.username;
                    localStorage.isAdmin = response.data.isAdmin;
                    localStorage.token = response.data.token;
                    this.$router.push("/login");
                    alert(
                        "Votre compte a bien été crée. Vous pouvez à présent vous connecter"
                    );
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
                .post("http://localhost:3000/api/auth/login", this.dataLoginS, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    localStorage.username = response.data.username;
                    localStorage.email = response.data.email;
                    localStorage.userId = response.data.userId;
                    localStorage.isAdmin = response.data.isAdmin;
                    localStorage.token = response.data.token;
                    this.$router.push("/home");
                })
                .catch((error) => {
                    // pour récupérer le message d'erreur : on va chercher le mesage retourné par le serveur dans l'object error et on le parse, car le message d'erreur est retourné au format JSON.
                    let errorMessage = JSON.parse(error.request.response);
                    alert(errorMessage.message)
                    this.message = error;
                    this.msg = true;
                });
        },
    },

});
</script>
<style lang="scss" scoped>
p,
input,
label {
    font-size: 1.2rem;
}

.auth__container {
    text-align: center;
    font-size: 1rem;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}

.header__banner {
    background-color: white;
    width: 100%;

    img {
        //width: 100%;
        object-fit: cover;
    }
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    max-width: 80%;
    margin: auto;
    padding: 1rem;
}

.card__action:hover {
    color: var(--secondary-color);
    font-weight: bold;
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
    /* background: #f2f2f2; */
    font-weight: 500;

    width: 100%;
    color: black;
}

/* .form-row__input::placeholder {
    color: #aaaaaa;
} */

/* .button--disabled {
    background-color: #bbb;
} */

/* .button {
    border: none;
    margin: auto;
    max-width: 100%;
    min-width: 200px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: teal;
    color: white;
} */

@media screen and (max-width: 480px) {
    .header__banner img {
        /* width: 250px;
        height: 150px; */
        object-fit: cover;
    }

    .button {
        min-width: 115px;
    }
}
</style>
