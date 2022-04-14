<template>
  <div class="modal-backdrop">
    <div class="modal">
      <form id="modal" action="" class="form-row" @submit="sendPost">
        <button class="btn--close" @click="close">X</button>
        <h2 class="postForm__title">Nouveau post</h2>
        <div class="form-row">
          <label for="title">Titre : </label>
          <span class="required"> * Ce champs est requis</span>
          <input
            v-model="dataPost.title"
            type="title"
            id="title"
            name="title"
            rows="8"
            cols="30"
            wrap="on"
            autofocus
            required
          />
          <label for="post-content">Que voulez-vous partager ?</label>
          <span class="required"> * Ce champs est requis</span>
          <textarea
            v-model="dataPost.content"
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

          <div class="dropbox">
            <input
              class="input-upload"
              @change="onFileSelected"
              accept=".jpg, .jpeg, .png, .gif"
              type="file"
              name="image_url"
              id="images"
            />
            <p>... Ou déposez votre fichier ici</p>
            <!-- <button @click="onUpload">Télécharger
            </button> -->
          </div>
        </div>
        <div class="card-actions">
          <button title="Poster" class="btn-success" @click="sendPost">
            Poster
          </button>
          <button title="Annuler" class="btn--cancel" @click="close">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "PostForm",
  data() {
    return {
      valid: true,
      selectedFile: "",

      dataPost: {
        userId: localStorage.userId,
        title: "",
        content: "",
        image_url: "",
      },
      dataPostS: "",
      msg: false,
      message: "",
    };
  },

  methods: {
    close() {
      this.$emit("close");
      this.$router.push("/home");
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      axios
        .post(
          "http://localhost:3000/api/post/",
          this.dataPost.image_url.JSON.stringify,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
    sendPost() {
      this.dataPostS = JSON.stringify(this.dataPost);
      console.log(this.dataPostS);
      axios
        .post("http://localhost:3000/api/post/", this.dataPostS, {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          let rep = response.data;
          this.message = rep.message;
          this.msg = true;
          this.form = false;
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          this.message = error;
          this.msg = true;
        });
    },
  },
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
  scroll-behavior: smooth;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
#modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 0.5rem;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  max-width: 80%;
}
.postForm__title {
  text-align: center;
  /* padding: 2rem; */
}

.form-row {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 0.8rem;
  max-width: 100%;
}
input,
textarea {
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 100%;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  /* outline-offset: -5px; */
  border-radius: 0.5rem;
  color: dimgray;
  /* margin-top: 2rem; */
  min-height: 50px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: #eee;
}
#images {
  margin: -0.5rem;
}
.dropbox p {
  text-align: center;
  margin: 1rem 2rem;

  padding: 4rem 0;
}
.input-upload {
  opacity: 1;
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0.5rem;
  left: 0.6rem;
  cursor: pointer;
}
.required {
  color: crimson;
  font-size: 0.8rem;
  font-style: italic;
}
.card-actions{
  display: flex;
}
button {
  border: none;
  margin: 2rem auto;
  max-width: 100%;
  min-width: 100px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #bbb;
}
button:hover {
  background-color: teal;
}
.btn--close {
  background-color: transparent;
  color: rgb(51, 49, 49);
  width: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 0.1rem;
  padding: 0;
}
.btn--close:hover{
  background-color: transparent;
  color: red;
}
.btn--cancel:hover {
  background-color: red;
}
</style>
