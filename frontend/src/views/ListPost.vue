<template>

    <div class="feed container scroller">
        <button class="btn btn--outline" @click="toggleShow($event)">Et si on postait un nouveau truc ?</button>

        <form class="form-row" v-show="show" v-on:submit.prevent="sendPost" enctype="multipart/form-data">
            <label for="title">Titre du post : </label>
            <input type="text" name="title" id="title" v-model="newPost.title">

            <label for="content">Contenu du post :</label>
            <textarea name="content" id="content" cols="30" rows="5" v-model="newPost.content"></textarea>
            <label for="file">Partager une image :</label>
            <div class="space-btwn">
                <input type="file" name="img" id="img" @change="handleFileUpload($event)">
            </div>
            <div class="card-actions">
                <button class="btn--outline-red" @click="toggleShow($event)"><i class="fas fa-eject i-red"
                        title="Annuler"></i></button>
                <button class="btn--outline" type="submit">Et hop, un nouveau post !</button>
            </div>

        </form>

        <SinglePost v-for="post in listPost" :key="post" v-bind="post" :listUser="listUser"
            @refreshListPost="loadAllPosts" />

    </div>
</template>

<script>
import axios from "axios"
import { defineComponent } from "vue"
import SinglePost from '../components/SinglePost.vue'

export default defineComponent({
    name: "ListPostComponent",
    components: { SinglePost },
    data() {
        return {
            listPost: [],
            listUser: [],
            newPost: {},
            sNewPost: "",
            show: false,
            file: '',
            postImg: null,
        }
    },
    beforeCreate() {
        // Avant de créer la page, si jamais on est pas loggé, on se redirige direct sur la page de login. 
        if (localStorage.getItem("token") == undefined) {
            this.$router.push("/login");
        }
    },
    created() {
        // Ici on récupère la liste des posts. 
        this.loadAllPosts();

    },
    methods: {
        toggleShow(event) {
            event.preventDefault();
            this.show = !this.show;
            this.loadAllPosts();
            this.newPost = {};

        },
        handleFileUpload(event) {
            this.newPost.file = event.target.files[0];
            // console.log(this.newPost.file);
        },
        sendPost(event) {
            // PréventDefault histoire de ne pas "poster" avec le bouton. 
            // On veut gérer le truc à la main. 
            event.preventDefault();
            this.newPost.userId = Number(localStorage.getItem("userId"));
            this.newPost.image_url = "fakeImage.jpg";

            var formData = new FormData();
            formData.append('userId', this.newPost.userId);
            formData.append('image', this.newPost.file);
            formData.append('title', this.newPost.title);
            formData.append('content', this.newPost.content);

            axios
                .post(
                    "http://127.0.0.1:3000/api/post/",
                    formData,
                    {
                        headers:
                        {
                            "Authorization": 'Bearer ' + localStorage.token,
                            "Content-Type": "application/json"
                        }
                    }
                ).then((response) => {
                    // Si ca s'est bien passé, on rajoute le nouveau post à la liste de nos posts. 
                    console.log(response);
                    this.toggleShow(event);
                }).catch(err => {
                    console.log( err + "Erreur dans l'enregistrement du post");
                })
        },
        loadAllPosts() {
            axios.get("http://127.0.0.1:3000/api/post", { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    this.listPost = data.data;
                })
                .catch(() => {
                    console.log("ERREUR dans la récupération de la liste des posts.");
                })

            axios.get("http://127.0.0.1:3000/api/auth", { headers: { Authorization: 'Bearer ' + localStorage.token } })
                .then((data) => {
                    this.listUser = data.data;
                })
                .catch(() => {
                    console.log("ERREUR dans la récupération de la liste des users.");
                })
        },

        
    },
})
</script>

<style lang="scss" scoped>
</style>