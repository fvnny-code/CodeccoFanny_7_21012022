<template>
  <div class="feed__container">
    <h2 class="feed__title">Le Mur</h2>
    <div class="container__allPosts">
      <button class="button" @click="displayPostForm">Créer un post</button>
      <!-- tous les posts -->
      <div
        class="card__post"
        v-for="(post, index) in allPosts"
        :key="index"
      >
        <h3 class="post__title">{{ post.title }}</h3>
        <p class="post__subtitle">
          Par {{ post.userName }}, le {{ dateFormat(post.date_creation) }}
        </p>
        <p class="post__content">
          {{ post.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TheFeed",
  data() {
    return {
      userId: "",
      allPosts: [],
      postId: "",

      dataPost: {
        id: "",
        title: "",
        content: "",
        userId: "",
      },
      dataPostS: "",

      form: true,
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios
        .get("http://localhost:3000/api/auth", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
          },
        })
        .then((response) => {
          this.users = response.data;
          this.getAllposts();
        });
    },

    dateFormat(date) {
      const postCreatedAt = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return postCreatedAt.toLocaleString("en-GB", options);
    },
    displayPostForm(){
      this.$router.push('/home/feed/post')
    }
  },
  mounted() {
    this.userId = localStorage.userId;
    axios
      .get("http://localhost:3000/api/post", {
        headers: { Authorization: 'Bearer '+ localStorage.token },
      })
      .then((response) => {
        console.log(response.data);
        let posts = response.data;
        this.allPosts = posts;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.feed__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
}
.container__allPosts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card__post {
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 95%;
  margin: 0 auto;
  padding: 1rem;
}
.post__subtitle {
  font-size: 0.8rem;
  font-style: italic;
}

button {
  border: none;
  margin: auto;
  max-width: 100%;
  min-width: 200px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #bbb;
}
button:hover {
  transform: scale(1.2);
  transition: 0.6s;
  cursor: pointer;
  background-color: teal;
}
</style>
