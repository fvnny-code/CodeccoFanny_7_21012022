<template>
  <div class="feed__container">
    <h2 class="feed__title">Le Mur</h2>
    <div class="container__allPosts">
      <button class="creatPostBtn" @click="displayPostForm">
        Créer un post
      </button>
      <!-- un post -->
      <div class="card__post" v-for="(post, index) in allPosts" :key="index">
        <div class="card__title">
          <div class="card-actions" v-if="post.userId == userId">
            <!-- <i id="showDialogUpdatePost"
              class="fas fa-pen card__action--icon"
              title="modifier le post"
              @click="showDialogUpdatePost(post.title, post.content, post.id)"
            ></i> -->
            <i
              id="showModal"
              class="fas fa-pen card__action--icon"
              title="modifier le post"
              @click="showModal"
            ></i>
            <UpdatePostModal v-show="isModalVisible" @close="closeModal" />
            <i
              class="fas fa-trash"
              @click="deletePost(post.id)"
              title="supprimer le post"
            ></i>
          </div>
          <h3 class="post__title">{{ post.title }}</h3>
          <p class="post__subtitle">
            Par {{ post.userName }}, le {{ dateFormat(post.date_creation) }}
          </p>
        </div>
        <div class="card__content">
          <p class="post__content">{{ post.content }}</p>
        </div>
        <div class="card-actions">
          <i
            class="fas fa-eye"
            @click="displayComment(post.id)"
            title="voir les commentaires"
          ></i>

          <!-- nouveau commentaire - formulaire -->
          <!-- <div class="CommentForm__card">
            <textarea
              v-model="dataCom.content"
              background-color="rgba(255,215,215,0.3)"
              label="commentaire"
              autofocus
              required
              placeholder="Votre commentaire..."
            >
            </textarea>
            <button class="card-actions__button" @click="sendComment(post.id)">
              Poster
            </button>
          </div> -->
        </div>
        <!-- modifier un post - boîte de dialogue -->
        <!-- KO -->
        <!-- <dialog @onchange="dialogUpdatePost" max-width="400px" >
          <div class="updateForm__card">
            <div class="form-row">
              <label for="updatePost">modifier le post : </label>
              <input v-model="dataPost.title" label="Titre" type="title" />
              <textarea v-model="dataPost.content" label="Commentaire">
              </textarea>
              <div class="card__actions">
                <button
                  class="card-actions__button cancel"
                  @click="dialogUpdatePost = false"
                >
                  Annuler
                </button>
                <button
                  class="card-actions__button success"
                  @click="updatePost()"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </dialog> -->
      </div>
      <!-- Commentaires -->
      <div class="container__allComments" v-if="commentId === comment.id">
        <div
          class="card__comment"
          v-for="(comment, index) in allComments"
          :key="index"
          outlined
        >
          <p class="comment__subtitle">
            le {{ dateFormat(comment.date_creation) }},
            {{ comment.userName }} commente :
          </p>
          <div class="card__content">
            <p class="comment__content">{{ comment.comContent }}</p>
          </div>
          <!-- modifier le commentaire - formulaire -->
          <div class="card-actions">
            <i
              id="showModal"
              class="fas fa-pen card__action--icon"
              title="modifier le commentaire"
              @click="showModal"
            ></i>
            <UpdateComModal v-show="isModalVisible" @close="closeModal" />
            <i
              class="fas fa-trash"
              @click="deleteComment(comment.id)"
              title="supprimer le commentaire"
            ></i>
          </div>
        </div>
      </div>
      <button
        v-if="!displayFrmCm"
        title="Commenter le post"
        class="card-actions__button"
        @click="displayCommentForm()"
      >
        Commenter
      </button>
      <!-- formulaire - nouveau commentaire -->
      <div class="card-comment__form" v-if="displayFrmCm">
        <form class="form-row" ref="form" v-if="form">
          <textarea v-model="dataCom.content" label="commentaire" autofocus>
          </textarea>
          <button class="btn--succes" @click="sendCom(post.id)">Poster</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UpdatePostModal from "./UpdatePostModal.vue";
import UpdateComModal from "./UpdateComModal.vue";


export default {
  name: "TheFeed",
  components: { UpdatePostModal, UpdateComModal },
  data() {
    return {
      userId: "",
      userName: "",
      allPosts: [],
      allComments: [],
      postId: "",
      // dialogUpdatePost: false,
      // dialogUpdateComment: false,
      isModalVisible: false,
      valid: true,
      dataPost: {
        id: "",
        title: "",
        content: "",
        userName: "",
      },
      dataPostS: "",
      dataCom: {
        id: "",
        content: "",
        userId: "",
      },
      dataComS: "",
      form: true,
    };
  },
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
    displayPostForm() {
      this.$router.push("/home/feed/post");
    },
    // showDialogUpdatePost(postTitle, postContent, postId) {
    //   this.dataPost.title = postTitle;
    //   this.dataPost.content = postContent;
    //   this.dataPost.id = postId;
    //   // console.log(postTitle, postContent, postId)//ok
    //   this.dialogUpdatePost= true;
    // },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    displayComment(postId) {
      this.displayFrmCm = false;
      axios
        .get("http://localhost:3000/api/post" + postId + "/comments", {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => {
          this.allComments = response.data;
        })
        .catch((error)=>{
          console.log(error)
        });
    },
    // updatePost() {
    //   this.dataPost.userId = localStorage.userId;
    //   this.dataPostS = JSON.stringify(this.dataPost);
    //   axios
    //     .put(
    //       "http://localhost:3000/api/post/" + this.dataPost.id,
    //       this.dataPostS,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: "Bearer" + localStorage.token,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response.data.message);
    //       this.dataPost.title = "";
    //       this.dataPost.content = "";
    //       this.dataPost.userId = "";
    //       this.dataPost.id = "";
    //       this.dialogUpdatePost = false;
    //       window.location.assign("http://localhost:8080/home/feed");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
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
<style lang="scss" scoped>
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
.creatPostBtn {
  transition: background-color 0.2s;
  background-color: transparent;
  color: #8a8a8a;

  padding: 0.8rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #8a8a8a;
  user-select: none;
  display: inline-block;
  top: 10px;

  min-width: 10rem;
  margin: 0 auto;
  text-align: center;
  &:hover {
    color: #fafafa;
    background-color: teal;
  }
  &:active,
  &:focus {
    color: #fafafa;
    background-color: teal;
  }
}
.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
i {
  color: rgb(51, 49, 49);
  font-size: 1.5rem;

  padding: 0.5rem 1rem;
  &:hover {
    transition: 0.6s;
    cursor: pointer;
    color: teal;
  }
}
.fa-trash:hover {
  color: red;
}
.card-actions__button {
  border: none;
  max-width: 100%;
  min-width: 100px;
  margin: 0 0.2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #bbb;
  &:hover {
    background-color: teal;
  }
}
.cancel:hover {
  background-color: red;
}
</style>
