<template>
  <div class="feed__container">
    <h1>Le Mur</h1>
    <!-- <button v-on:click="getAllPosts()">Afficher les posts</button>
    <ul>
      <li v-for="post in posts" v-bind:key="post.id">
        {{ post.title }} {{ post.content }}
      </li>
    </ul> -->
    
  </div>
</template>
<script>
import axios from "axios";
export default {

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
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.feed__container {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;

}

h1, button {
  width: fit-content;
  margin: 0 auto;
}
button:hover {
  transform: scale(1.2);
  transition: 0.6s;
  cursor: pointer;
}
</style>
