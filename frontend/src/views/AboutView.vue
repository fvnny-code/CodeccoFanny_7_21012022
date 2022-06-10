<template>
    <div id="profile" class="card">
        <div class="card-actions">
            <button class="btn btn--close" @click="close">X</button>
        </div>
        <h2 class="card__title">Mon profil</h2>

        <!-- Si l'user possède une image on l'affiche, sinon, on laisse l'image par défaut -->
        <div class="user__avatar--large">
            <img v-if="this.user.avatar" class="avatar" :src="imageURL" alt="avatar de profil" style="width: 200px;" />
            <img v-else src="../assets/avatar.jpg" class="avatar" />
        </div>

        <p class="card__content">Pseudo : {{ user.username }}</p>
        <p class="card__content">Email : {{ user.email }}</p>
        <div class="card-actions">
            <i v-on:click="show = !show" class="fas fa-pen" title="modifier mes informations"
                @change="loadUserInfos(event)"></i>
            <i @click="deleteUserProfile(this.connectedUserId)" class="fas fa-trash i-red" title="Supprimer"></i>
        </div>

        <!-- FORMULAIRE DE MODIFICATION -->
        <form v-show="show" class="container" v-on:submit.prevent="sendProfileUpdate">
            <h2>Modifier mon profil</h2>

            <label for="Avatar">Avatar : </label>

            <input type="file" ref="fileInput" accept=".jpg, .jpeg, .png, .gif" name="avatar"
                @change="handleFileUpload($event)" />

            <label for="title">Username : </label>
            <input type="text" id="username" name="username" rows="8" cols="30" wrap="on" autofocus
                v-model="user.username" />
            <label for="title">Email : </label>
            <input type="text" id="email" name="email" rows="8" cols="30" wrap="on" autofocus v-model="user.email" />
            <div class="space-btwn">
                <button class="btn--outline-red" v-show="show">
                    <i class="fas fa-eject i-red" title="Annuler"></i>
                </button>
                <button type="submit" class="btn--outline">
                    <i class="fas fa-check" title="OK"></i>
                </button>
            </div>
        </form>
        <!-- LISTE DES USERS ET POSTS SI ADMIN -->
        <div class="card" v-if="this.user.isAdmin === 1">
            <p>liste des utilisateurs :</p>
            <hr>
            <div v-for="user in users" :key="user.id" class="UsersList">
                <i @click="deleteUserByAdmin(user.id)" class="fas fa-trash i-red"></i>
                <p>{{ user.id }} | {{ user.username }} | par : {{ user.email }}</p>
                 
            </div>
           
            <p>liste des posts :</p>
            <hr>
            <div v-for="post in posts" :key="post.id" class="PostsList">

                <i @click="deletePostByAdmin(post.id)" class="fas fa-trash i-red"></i>
                <!-- <span>{{ post.id }} &nbsp;</span>
                    <span>{{ post.title }} &nbsp;</span>
                    <span>par : {{ post.username }} &nbsp;</span> -->
                <p>{{ post.id }} | {{ post.title }} | par : {{ post.username }}</p>
            </div>

        </div>
    </div>
</template>

<script>

import axios from "axios";
import { Utils } from "../Utils.js";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ProfileView",
    data() {
        return {
            show: false,
            msg: "",
            valid: true,
            users: [],
            user: {},
            posts: [],

            avatar: null, // Stockage temporaire de l'image pour le formulaire. 
            connectedUserId: localStorage.getItem("userId"),
        };
    },
    created() {
        this.loadUserInfos();
        this.getListUsersInfos();
        this.getAllPosts()
    },
    methods: {
        close() {
            this.$emit("close");
            this.$router.push("/home");
        },
        handleFileUpload(event) {
            console.log(event);

            this.avatar = event.target.files[0];
        },
        formatDate(date) {

            return Utils.formatDateToJJMMAAAA(date);
        },

        loadUserInfos() {
            axios
                .get(`http://127.0.0.1:3000/api/auth/${this.connectedUserId}`, {
                    headers: { Authorization: "Bearer " + localStorage.token },
                })
                .then((data) => {
                    this.user = data.data;
                })
                .catch((error) => {
                    console.log(
                        error +
                        "ERREUR dans la récupération des infos utilisateur."
                    );
                });
        },

        getListUsersInfos() {
            axios
                .get(`http://127.0.0.1:3000/api/auth`, {
                    headers: { Authorization: "Bearer " + localStorage.token },
                })
                .then((data) => {
                    this.users = data.data;
                })
                .catch((error) => {
                    console.log(
                        error +
                        "ERREUR dans la récupération des infos utilisateur."
                    );
                });
        },
        getAllPosts() {
            axios
                .get(`http://127.0.0.1:3000/api/post`, {
                    headers: { Authorization: "Bearer " + localStorage.token },
                })
                .then((data) => {
                    this.posts = data.data;
                })
                .catch((error) => {
                    console.log(
                        error +
                        "ERREUR dans la récupération des infos utilisateur."
                    );
                });
        },
        sendProfileUpdate(event) {
            console.log("Dans sendProfileUpdate");
            event.preventDefault();
            let formData = new FormData();
            formData.append('username', this.user.username);
            formData.append('email', this.user.email);
            formData.append('image', this.avatar);

            axios
                .put(
                    `http://127.0.0.1:3000/api/auth/${this.connectedUserId}`,
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    }
                )
                .then((response) => {
                    console.log("Réponse OK", response);
                    this.loadUserInfos();
                    this.show = false;
                }).catch(error => {
                    console.log("Réponse KO", error);
                    this.show = false;
                });
        },

        deleteUserProfile() {
            if (
                confirm("Êtes-vous sûr.e de vouloir supprimer votre profil ?")
            ) {
                console.log(this.connectedUserId);

                axios
                    .delete(
                        `http://127.0.0.1:3000/api/auth/${this.connectedUserId}`,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.token,
                            },
                        }
                    )
                    .then(() => {
                        console.log("Votre profil a bien été supprimé");
                        localStorage.clear();
                        window.location = "/login";
                    })
                    .catch((error) => {
                        console.log(
                            error +
                            " ERREUR dans la suppression des infos utilisateur."
                        );
                    });
            }
        },
        deleteUserByAdmin(id) {
            if (
                confirm("Êtes-vous sûr.e de vouloir supprimer ce profil ?")
            ) {
                console.log(this.id);

                axios
                    .delete(
                        `http://127.0.0.1:3000/api/auth/${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.token,
                            },
                        }
                    )
                    .then(() => {
                        console.log("Ce profil de a bien été supprimé");
                        window.location.reload();


                    })
                    .catch((error) => {
                        console.log(
                            error +
                            " ERREUR dans la suppression des infos utilisateur."
                        );

                    });
            }
        },
        deletePostByAdmin(id) {
            if (
                confirm("Êtes-vous sûr.e de vouloir supprimer ce post ?")
            ) {
                console.log(id);
                axios
                    .delete(
                        `http://127.0.0.1:3000/api/post/${id}`,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.token,
                            },
                        }
                    )
                    .then(() => {
                        console.log("Ce post de a bien été supprimé");
                        window.location.reload();

                    })
                    .catch((error) => {
                        console.log(
                            error +
                            " ERREUR dans la suppression du post."
                        );

                    });
            }
        }
    },
    computed: {
        imageURL() {
            return "http://127.0.0.1:3000/images/" + this.user.avatar;
        },
    },
});
</script>
<style lang="scss" scoped>
#profile {
    margin: 2rem auto;
    text-align: center;
    max-width: 90%;

}

p {
    margin: 2rem 0 0 0;
}

.UsersList,
.PostsList {
    display: flex;


    i {
        font-size: 1rem;
        margin-top: 1.5rem;
       
    }

    p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }


}

.user__avatar--large {
    margin: auto;
    max-width: 250px;
    clip-path: circle(100px at center);
}

@media screen and (min-width: 800px) {
    #profile {
        max-width: 60%;
    }
}
</style>
