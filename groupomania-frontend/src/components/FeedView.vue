<template>
  <div class="feed__container">
    <h2 class="feed__title">Le Mur</h2>
    <div class="container__allPosts">
      <button class="button" @click="displayPostForm">Créer un post</button>

      <!-- tous les posts -->
      <div class="card__post" v-for="(post, index) in allPosts" :key="index">
        <h3 class="post__title">{{ post.title }}</h3>
        <p class="post__subtitle">
          Par {{ post.userName }}, le {{ dateFormat(post.date_creation) }}
        </p>
        <p class="post__content">
          {{ post.content }}
        </p>
      </div>
    </div>
<!-- essai de fenêtre modale : non conluant -->

    <!-- <label>
      <span class="button showForm"> Créer un post </span>
      <input type="checkbox" />
      <div class="confirm-modal">
        <form action="#do-something" method="get">
          <div class="form-row">
            <label for="title">Titre : </label>
            <input
              type="title"
              id="title"
              name="post_title"
              rows="8"
              cols="30"
              wrap="on"
              autofocus
              required
            />
            <span class="required"> * Ce champs est requis</span>
            <label for="post-content">Que voulez-vous partager ?</label>
            <textarea
              id="content"
              name="content"
              placeholder="Dites quelque chose..."
              rows="5"
              cols="50"
              maxlength="500"
              autofocus
              required
            >
            </textarea>
            <span class="required"> * Ce champs est requis</span>
          </div>
          <div class="form-row">
            <button class="btn-success" @click="sendPost">Poster</button>
          </div>
        </form>
      </div>
    </label> -->
  </div>
</template>
<script>
import axios from "axios";
// import PostForm from "../components/PostForm.vue";
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
  // components: { PostForm },
  // created() {
  //   this.getAllUsers();
  // },
  methods: {
    getAllUsers() {
      axios
        .get("http://localhost:3000/api/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          this.users = response.data;
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
    // avec fenêtre modale pour formulaire
    // sendPost() {
    //   this.dataPostS = JSON.stringify(this.dataPost);
    //   console.log(this.dataPostS);
    //   axios.post("http://localhost:3000/api/post/", this.dataPost, {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: "Bearer " + localStorage.token,
    //     },
    //   })
    //   .then((response)=>{
    //       console.log(response.data)
    //       let rep = response.data;
    //       this.message = rep.message;
    //       this.msg = true;
    //       this.form= false;
    //       this.$router.push('/home')
    //   })
    //   .catch((error)=>{
    //       console.log(error);
    //       this.message = error;
    //       this.msg = true
    //   });
    // },
  },
  mounted() {
    this.userId = localStorage.userId;
    this.userName = localStorage.userName;
    axios
      .get("http://localhost:3000/api/post", {
        headers: { Authorization: "Bearer " + localStorage.token },
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
<style lang="scss">
.feed__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  margin: 5rem auto;
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
// Modal //
// input[type="checkbox"] {
//   position: relative;
//   width: 20px;
//   top: -20px;
//   left: 20px;
//   display: none;
// }
.button {
  transition: background-color 0.2s;
  background-color: transparent;
  color: #8a8a8a;
 
  padding: .8rem;
  cursor: pointer;
  border-radius: .5rem;
  border: 1px solid #8a8a8a;
  user-select: none;
  display: inline-block;
 
  top: 10px;
  // width: 200px;
   min-width: 10rem;
  margin: 0 auto;
  text-align: center;
  &:hover {
    color: #fafafa;
    background-color: #8a8a8a;
  }
  &:active,
  &:focus {
    color: #fafafa;
    background-color: #a0a0a0;
  }
}
// button:hover {
//   transform: scale(1.2);
//   transition: 0.6s;
//   cursor: pointer;
//   background-color: teal;
// }

.confirm-modal {
  display: block;
  pointer-events: none;
  transition: opacity 0.5s;
  .btn-success {
    width: auto;
    max-width: auto;
    margin: auto;
  }
  &::before {
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 200px;
    z-index: 99;
    opacity: 1;
    // pointer-events: all;
  }
  form {
    position: absolute;
    z-index: 99;
    top: 50px;
    transition: transform 0.75s;
    max-width: 90%;
    width: 450px;
    background-color: #fafafa;
    padding: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
    color: #080808;
    border-radius: 5px;
    pointer-events: none;
  }
}
input:not(:checked) + .confirm-modal {
  &,
  & * {
    opacity: 0;
  }
  &::before {
    height: 0;
    width: 0;
  }
}
input:not(:checked) + .confirm-modal form {
  transform: translate(-50%, 100px);
}
.confirm-modal button {
  pointer-events: all;
}

</style>
