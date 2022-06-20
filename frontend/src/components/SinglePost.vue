<!-- Ce component représente un seul post dans la liste des posts  -->
<template>

    <div class=" card postCard">
        <div class="space-btwn">
            <h2 class="card__title"> {{ title }}</h2>
            <img v-if="avatar" v-bind:src="'http://127.0.0.1:3000/images/' + avatar" alt="avatar"
                class="user__avatar--small">
            <img v-else class="user__avatar--small" src="../assets/avatar.jpg">
        </div>

        <p class="card__subtitle">
            Posté le {{ formatedDateCreation }} par <strong>{{ username }}</strong>.
        </p>
        <div class="card__content">
            <p>{{ content }}</p>
            <img v-if="image_url" v-bind:src="'http://127.0.0.1:3000/images/' + image_url" alt="Image du post">
        </div>
        <div class="space-btwn">

            <router-link :to="{ name: 'detailPost', params: { id: id } }">Voir le détail</router-link>
            <i v-if="userId == connectedUserId || isAdmin" @click="deletePost(id)" class="fas fa-trash i-red"
                title="Supprimer le post"></i>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { Utils } from "../Utils.js";
import { defineComponent } from "vue";

export default defineComponent({
    name: "SinglePost",
    emits: ['refreshListPost'],

    data() {
        return {
            connectedUserId: localStorage.getItem("userId"),
            isAdmin: Number(localStorage.getItem("isAdmin")) === 1,
            user: {},
        }
    },
    // Ces props viennent du "parent", c'est à dire ici ListPost.vue. 
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
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
        image_url: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        },

    },

    methods: {

        deletePost(id) {
            if (confirm("Voulez vous supprimer ce post ?")) {

                axios.delete(`http://127.0.0.1:3000/api/post/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                    .then(() => {
                        console.log(`Le post ${id} a bien été supprimé.
                        `);
                        confirm(`Le post a bien été supprimé.
                        `);                        
                        this.$emit('refreshListPost');

                    })
                    .catch(() => {
                        this.$emit('refreshListPost');
                        alert("ERREUR dans la suppression du post.")
                    })
            }
        }
    },
    computed: {
        // Récupéré à plusieurs reprises, on crée un petit composant pour afficher la date, dans un fichier "Utils"
        formatedDateCreation() {
            return Utils.formatDateToJJMMAAAA(this.date_creation);
        },
        
    },

})
</script>

<style lang="scss" scoped>
#SinglePost {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
}
</style>