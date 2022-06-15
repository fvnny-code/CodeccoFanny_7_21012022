<template>
    <div class="card">
        <div class="space-btwn">
            <p class="card__subtitle">
                Posté le {{ formatDate(date_creation) }} Par <strong>{{ username }}</strong>.
            </p>
        </div>

        <!-- Commentaires  -->
        <div class="card__content">
            {{ comContent }}
        </div>
        <div class="card-actions">
            <i v-if="userId == connectedUserId || isAdmin" @click="deleteComment(id)" class="fas fa-trash i-red"
                title="Supprimer"></i>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Utils } from "../Utils.js";
import { defineComponent } from "vue";

export default defineComponent({
    name: "SingleComment",

    props: {
        id: {
            type: Number,
            required: true
        },
        comContent: {
            type: String,
            required: true
        },
        date_creation: {
            type: String,
            required: true
        },
        listUser: {
            type: Array,
            required: true
        },
        userId: {
            type: Number,
            required: true
        },
        postId: {
            type: Number,
            required: true
        },
        username: {
            type: String,
            required: true
        },

    },
    data() {
        return {
            // pour vérifier si l'utilisateur est connecté on va le chercher dans le localStorage
            connectedUserId: localStorage.getItem("userId"),
            isAdmin: Number(localStorage.getItem("isAdmin")) === 1,

            isVisible: false,
            comments: [],
            newComment: {},
            commentId: "",
            listUserLocal: this.listUser,
            user: {},
        }
    },
    beforeCreate() {
        // Avant de créer la page, si jamais on est pas loggé, on se redirige direct sur la page de login. 
        if (localStorage.getItem("token") == undefined) {
            this.$router.push("/login");
        }
    },
    created() {
        this.loadAllComments();
    },

    methods: {

        loadAllComments() {
            // Ici on récupère le post correspondant à postId
            axios.get(`http://127.0.0.1:3000/api/post/${this.postId}`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    this.post = data.data;
                })
                .catch(() => {
                    console.log("ERREUR dans la récupération du post correspondant à postId.");
                })

            // Maintenant on récupère la liste des commentaires qui correspondent :
            axios.get(`http://127.0.0.1:3000/api/post/${this.postId}/comments`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    this.comments = data.data;
                })
                .catch(() => {
                    console.log("ERREUR dans la récupération de la liste des commentaires associés au post.");
                })
            // Récupération des utilisateurs correspondant au commentaire:
            axios.get("http://127.0.0.1:3000/api/auth", { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    console.log("Utiliser DATA ICI", data)

                })
                .catch(() => {
                    console.log("ERREUR dans la récupération de la liste des users.");
                })

        },
        deleteComment(id) {
            if (confirm("Voulez vous supprimer ce commentaire ?")) {


                axios.delete(`http://localhost:3000/api/post/${this.postId}/comments/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                    .then((response) => {
                        confirm(`Le commentaire ${id} a bien été supprimé.`)
                        window.location.reload();

                    })
                    .catch(() => {
                        window.location.reload();
                        alert("ERREUR dans la suppression du post.")
                    })
            }
        },

        formatDate(date) {
            return Utils.formatDateToJJMMAAAA(date);
        },
    },
})

</script>
<style lang="scss" scoped>
.card {
    margin: .5rem .5rem 2rem .5rem;

}
</style>