<template>
  <div class="feed__container scroller">
    <h2 class="feed__title">Le Mur</h2>
    <div class="container__allPosts">
      <button class="creatPostBtn" @click="displayPostForm">
        Créer un post
      </button>
      <!-- un post -->
      <div class="card__post" v-for="(post, index) in allPosts" :key="index">
        <div class="card__title">
          <div class="card-actions" v-if="post.userId == userId">
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
        <!-- affichage des commentaires relatifs au post -->

        <!-- checkbox - toggle -->
        <div class="custom-checkbox">
          <i class="fas fa-comment"></i>
          <input
            type="checkbox"
            name="checkbox"
            class="comment-toggle"
            @click="view = !view"
          />
          <!-- / -->
          <!-- formulaire - nouveau commentaire -->
          <transition name="form-anim" mode="in-out">
            <div class="card-comment__form container">
              <!-- il faut binder le commentaire au post concerné. -->
              <form
                class="form__comment form-row"
                v-bind="dataPost.id"
                v-if="view"
              >
                <button @click="toggleNewComment" class="btn--close">X</button>
                <label :for="dataPost.id">Nouveau commentaire</label>
                <textarea
                  v-model="dataCom.content"
                  label="commentaire"
                  autofocus
                >
                </textarea>
                <div class="card-actions">
                  <button class="btn--cancel" @click="close">Annuler</button>
                  <button class="btn--succes" @click="sendCom(post.id)">
                    OK
                  </button>
                </div>
              </form>
            </div>
          </transition>
          <i
            class="fas fa-eye"
            @click="displayComments(post.id)"
            title="voir les commentaires"
          ></i>
          <div :id="'list-comment' + post.id">
            <!-- la div va contenir la liste des commentaires correspondant à CE post précis -->
          </div>
          <!-- / -->
        </div>
        <!-- /checkbox - toggle/FIN -->

        <div class="container__allComments">
          <div>
            <!-- carte UN commentaire -->
            <!-- <div class="card__comment">
            <div class="card-actions"> -->
            <!-- ne fonctionne pas -->
            <!-- <button class="btn--close" @click="viewComments = !viewComments">
                X
              </button> -->
            <!-- / -->
            <!-- </div>
            <p class="comment__subtitle">
              le {{ dateFormat(dataCom.date_creation) }},
              {{ dataCom.userId }} commente :
            </p>
            <div class="card__content">
              <p class="comment__content">{{ dataCom.comContent }}</p>
            </div> -->
            <!-- modifier le commentaire - formulaire modal-->
            <!-- <div class="card-actions">
              <i
                id="showUpdateComModal"
                class="fas fa-pen card__action--icon"
                title="modifier le commentaire"
                @click="showUpdateComModal"
              ></i> -->
            <!-- ne fonctionne pas -->
            <!-- <button class="btn cancel">Annuler</button> -->
            <!-- / -->
            <!-- <i
                class="fas fa-trash"
                @click="deleteComment(dataCom.id)"
                title="supprimer le commentaire"
              ></i>
            </div>
            <UpdateComModal v-show="isModalVisible" @close="closeModal" /> -->
            <!-- /modifier le commentaire/FIN -->

            <!-- </div> -->
            <!-- /carte UN commentaire/FIN -->
          </div>
        </div>
        <!-- /afficher les commentaires relatifs à un post/FIN -->
      </div>
      <!-- / un post/FIN -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UpdatePostModal from "./UpdatePostModal.vue";
// import UpdateComModal from "./UpdateComModal.vue";

export default {
  name: "TheFeed",
  // components: { UpdatePostModal, UpdateComModal },
  components: { UpdatePostModal },
  data() {
    return {
      userId: "",
      userName: "",
      afficheFrmCm: false,
      allPosts: [],
      allComments: [],
      postId: "",
      valid: true,
      isModalVisible: false,
      view: false,
      viewComments: false, // ne fonctione pas
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
    };
  },
  methods: {
    close() {
      this.$emit("close");
    
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggleNewComment() {
      this.view = !this.view;
    },
    toggleAllComments() {
      // ne fonctionne pas
      this.viewComments = !this.viewComments;
    },
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
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleString("en-GB", options);
    },
    displayPostForm() {
      this.$router.push("/home/feed/post");
    },

    displayComments(postId) {
      // this.displayFrmCm = false;
      console.log("Aaaaaaaaaaaaaa" + postId);

      axios
        .get("http://localhost:3000/api/post/" + postId + "/comments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          console.log("bbbbbbbbbbbbbbbbbbbbbbb");
          console.log(response.data);
          let divComment = document.getElementById("list-comment" + postId); // récup de la div stockant tous les des commentaires de CE post
          divComment.innerHTML = response.data; // traduire en VueJS
          this.allComments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showUpdateComModal() {
      this.$router.push("/UpdateComModal");
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
}
.feed__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  height: 100vh;
  margin: 5rem auto;
  padding: 3rem;
  scroll-behavior: smooth;
}
.scroller {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
}
.container__allPosts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.card__post,
.card__comment,
.card-comment__form {
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  max-width: 100%;
  padding: 1rem;
  margin: 0.5rem;
}
.collapse {
  &-enter,
  &-leave-to {
    flex: 0;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  gap: 0.8rem;
  max-width: 100%;
  & .btn--close {
    align-self: flex-end;
    padding: 0;
    margin: 0;
  }
}
.card__content {
  margin: 1rem 0;
}
.post__subtitle,
.comment__subtitle {
  font-size: 0.8rem;
  font-style: italic;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.custom-checkbox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 100%;
  & input[type="checkbox"] {
    margin-left: -3.5rem;
    margin-top: 1rem;
    opacity: 0;
    width: 3rem;
  }
  & i {
    font-size: 2rem;
  }
}
.card-comment__form {
  position: relative;
  top: 0;
  left: 0;
  padding: 3rem 0;
  opacity: 0.85;
  transform: scale(1, 0);
  transform-origin: bottom;
  transition: transform 400ms ease-in-out;
}
.comment-toggle:checked ~ .card-comment__form {
  transform: scale(1, 1);
}
.comment-toggle:checked ~ .card-comment__form .form-row {
  opacity: 1;
  transition: opacity 250ms ease-in-out 250ms;
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

button {
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
.btn--close {
  background-color: transparent;
  color: rgb(51, 49, 49);
  width: 5px;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 0.1rem;
  padding: 0;
  &:hover {
    color: red;
    background-color: transparent !important;
  }
}
</style>
