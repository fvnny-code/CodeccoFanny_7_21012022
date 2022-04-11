<template>
  <div class="postForm__container">
    <div class="postForm__card">
      <h2 class="postForm__title">Nouveau post</h2>
      <!-- <form action="" class="postForm__form"> -->
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
        </div>
        <div class="form-row">
          <div class="dropbox">
            <input
              class="input-upload"
              @change="onFileSelected"
              accept=".jpg, .jpeg, .png, .gif"
              type="file"
              name="image_url"
              id="images"
            />
            <p>
              ... Ou déposez votre fichier ici
            </p>
            <!-- <button @click="onUpload">Télécharger
            </button> -->
          </div>
          </div>      
        <div class="form-row">
          <button title="Poster" class="btn-success" @click="sendPost">Poster</button>
        </div>
      <!-- </form> -->
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
    onFileSelected(event) {  
      console.log(event)
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
  
      axios.post("http://localhost:3000/api/post/", this.dataPost.image_url.JSON.stringify, 
      {   headers: {
          "Content-Type" : "multipart/form-data",
          Authorization: "Bearer " + localStorage.token,
        },
      }
      )
      .then((response)=>{
        console.log(response)
      })
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
}
.postForm__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 90%;
 
  margin: 0 auto;
  padding: 2rem;
}
.postForm__card {
  max-width: 90%;
  display: flex;
  flex-direction: column;
}
.postForm__title {
  text-align: center;
  /* padding: 2rem; */
}
.postForm__form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 95%;
  margin: 0 auto;
  padding: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: .8rem;
  max-width: 100%;
}
input,
textarea {
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.5rem;
  padding: 1rem;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  /* outline-offset: -5px; */
  border-radius: 0.5rem;
  color: dimgray;
 
  margin-top: 2rem;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.dropbox:hover {
  background: #eee;
}
#images{ 
  margin: -.5rem;
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
  top: .5rem;
  left: .6rem;
  cursor: pointer;
}
.required {
  color: crimson;
  font-size: 0.8rem;
  font-style: italic;
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
</style>
