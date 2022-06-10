<!-- Cette page correspond à l'affichage du détail d'un post.  -->
<template>
    <TheHeader></TheHeader>
    <div class="about feed container">
        <h1>Détail d'un post !</h1>
        <div class="card postCard">
            <div class="space-btwn">
                <h2 class="card__title">{{ post.title }}</h2>
                <img v-if="post.avatar" v-bind:src="'http://127.0.0.1:3000/images/' + post.avatar" alt="avatar"
                    class="user__avatar--small">
                <img v-else class="user__avatar--small" src="../assets/avatar.jpg">
                <div class="card-actions">
                    <i v-if="post.userId == connectedUserId" v-on:click="show = !show" class="fas fa-pen"
                        title="Modifier le post"></i>
                </div>
            </div>
            <p class="card__subtitle">Créé le {{ formatDate(post.date_creation) }} par <strong>{{ post.username
            }}</strong>.
            </p>
            <div class="card__content">
                {{ post.content }}
                <img v-if="post.image_url" v-bind:src="'http://127.0.0.1:3000/images/' + post.image_url"
                    alt="Image du post">
            </div>
            <div class="card-actions">
                <i v-on:click="showCommentForm = !showCommentForm" class="fas fa-comment" title="Commenter"></i>
            </div>

            <form v-show="showCommentForm" class=" form-row">
                <label for="content">Contenu du commentaire :</label>
                <textarea id="content" name="content" rows="5" cols="50" maxlength="500" autofocus
                    v-model="newComment.comContent">
                </textarea>
                <div class="card-actions">
                    <button type="submit" class="btn--outline-red" @click="close"><i class="fas fa-eject i-red"
                            title="Annuler"></i></button>
                    <button type="submit" class="btn--outline" @click="sendComment($event)"><i class="fas fa-check"
                            title="OK"></i></button>
                </div>
            </form>
            <!-- Update post-->
            <form v-show="show" class="form-row" action="" @submit="updatePost">
                <label for="title">Titre : </label>
                <input type="title" id="title" name="title" rows="8" cols="30" wrap="on" autofocus
                    v-model="post.title" />
                <label for="content">Contenu du post :</label>
                <textarea id="content" name="content" rows="5" cols="50" maxlength="500" autofocus
                    v-model="post.content">
                </textarea>
                <div class="card-actions">
                    <button type="submit" class="btn--outline"><i class="fas fa-check"></i></button>
                    <!-- <button type="submit" class="btn btn-red" @click="close">Annuler</button> -->
                </div>
            </form>
        </div>
    </div>

    <div class="container__comments">
        <h3>Et voici la liste des commentaires associés : </h3>

        <SingleComment class="card" v-for="(comment) in comments" :key="comment.id" v-bind="comment"
            :listUser="listUser" />
    </div>

    <TheFooter></TheFooter>
</template>

<script>
import axios from "axios";
import { Utils } from "../Utils.js";
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"

import { defineComponent } from "vue";
import SingleComment from '../components/SingleComment.vue';

export default defineComponent({
    components: { TheHeader, SingleComment, TheFooter },
    // emits: ['refreshDetailPost'],

    data() {
        return {
            // pour vérifier si l'utilisateur est connecté on va le chercher dans le localStorage
            connectedUserId: localStorage.getItem("userId"),
            showCommentForm: false,
            isVisible: false,
            show: false,
            listUser: [],
            post: {},
            // Ici je peux récupérer mon id de post parce qu'il est dans l'url. 
            // (la route pour appeler DetailPost.vue c'est par exemple http://localhost:8080/#/detailPost/3)
            postId: this.$route.params.id,
            comments: [],
            newComment: {},
            commentId: "",
            userId: "",
            username: "",
            image_url: "",
            avatar: "",

        };
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

        formatDate(date) {
            return Utils.formatDateToJJMMAAAA(date);
        },
        sendComment(event) {
            console.log("tentative de commentaire")
            event.preventDefault();
            this.newComment.postId = this.post.id
            this.newComment.userId = Number(localStorage.getItem("userId"));

            let dataJson = JSON.stringify(this.newComment);
            console.log("Donnée : ", dataJson);
            axios
                .post(
                    `http://localhost:3000/api/post/${this.postId}/comments`, dataJson, {
                    headers:
                        { "Authorization": 'Bearer ' + localStorage.token, "Content-Type": "application/json" }
                }
                ).then((response) => {
                    console.log(response);
                    // On charge les nouveaux commentaire
                    this.loadAllComments();
                    // On vide le formulaire qui nous a permis de créer un commentaire. 
                    this.newComment = {};
                    // on replie le formulaire
                    this.showCommentForm = false;
                }
                ).catch(err => {
                    console.log("Erreur dans l'enregistrement du commentaire");
                    console.log(err);
                })
        },
        updatePost(event) {
            event.preventDefault();
            console.log("Tentative de mise à jour du post");
            let dataJson = JSON.stringify(this.post);
            console.log(dataJson);
            // On demande au back de mettre à jour le post. 
            axios.put(`http://localhost:3000/api/post/${this.postId}`, dataJson, {
                headers:
                    { "Authorization": 'Bearer ' + localStorage.token, "Content-Type": "application/json" }
            }).then((response) => {

                console.log(response);
                confirm("votre post a bien été modifié")
                // replie le formulaire une fois cliqué sur OK
                this.show = false;
            }).catch((err) => {

                console.log(err);
                confirm("Echec de la mise à jour")
            })
        },
        
        loadAllComments() {
            // Ici on récupère le post correspondant à postId
            axios.get(`http://127.0.0.1:3000/api/post/${this.postId}`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    console.log(data);
                    this.post = data.data;

                    axios.get(`http://127.0.0.1:3000/api/post/${this.post.id}/comments`, { headers: { Authorization: 'Bearer ' + localStorage.token } })
                        .then((data) => {
                            this.comments = data.data;
                        })
                        .catch((error) => {
                            console.log(error + "ERREUR dans la récupération des commentaires.");
                        })
                })
                .catch((error) => {
                    console.log(error + "ERREUR dans la récupération des posts.");
                })

            // Maintenant on récupère la liste des commentaires qui correspondent :  
            axios.get("http://127.0.0.1:3000/api/auth", { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    this.listUser = data.data;
                })
                .catch(() => {
                    console.log("ERREUR dans la récupération de la liste des users.");
                })

        },

        // updateComment(commentId) {
        //     let dataJson = JSON.stringify(this.comments);
        //     console.log(dataJson);
        //     axios.put(`http://localhost:3000/api/post/${this.postId}/comments/${commentId}`, dataJson, {
        //         headers:
        //             { "Authorization": 'Bearer ' + localStorage.token, "Content-Type": "application/json" }
        //     }).then((response) => {
        //         // console.log("Update comment ok");
        //         console.log(response);
        //         confirm("votre commentaire a bien été modifié")
        //         // replie le formulaire une fois cliqué sur OK
        //         this.isVisible = false;
        //     }).catch((err) => {
        //         console.log("Echec de la mise à jour : ");
        //         console.log(err);
        //         confirm("Echec de la mise à jour")
        //         this.isVisible = false;
        //     })
        // },

    },

});
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 100%;
    margin: 8rem 0 0 0;
}

.container__comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 100%;
    padding: 0 3rem 3rem 3rem;
    margin: 0.5rem 0 2.7rem 0;

}
h1 {
    color: var(--primary-color)
}
</style>
