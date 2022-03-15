<template>
  <div class="feed__container">
    <h1>The wall</h1>
    <button v-on:click="getAllPosts()">Afficher les posts</button>
    <ul>
      <li v-for="post in posts" v-bind:key="post.id">{{ post.title}} {{ post.content }}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  el: ".feed__container",  
  name: "TheFeed",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/post")
        .then((response) => (this.posts = response.data))
        .catch((error) => {console.log(error)});
    },
  },
};
</script>
