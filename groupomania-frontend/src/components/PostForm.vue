<template>
  <div class="postForm__container">
    <div class="postForm__card">
      <h2 class="postForm__title">Nouveau post</h2>
      <form action="" method="post" class="postForm__form">
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
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "PostForm",
  data() {
    return {
      valid: true,
      dataPost: {
        title: "",
        content: "",
        userId: localStorage.userId,
      },
      dataPostS: "",
      msg: false,
      message: "",
    };
  },
  methods: {
    sendPost() {
      this.dataPostS = JSON.stringify(this.dataPost);
      console.log(this.dataPostS);
      axios.post("http://localhost:3000/api/post/", this.dataPost, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response)=>{
          console.log(response.data)
          let rep = response.data;
          this.message = rep.message;
          this.msg = true;
          this.form= false;
          this.$router.push('/home')
      })
      .catch((error)=>{
          console.log(error);
          this.message = error;
          this.msg = true
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
  /* height: 100vh; */
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
  gap: 1rem;
  max-width: 100%;
}
input,
textarea {
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 0.5rem;
  padding: 1rem;
}
.required {
  color: crimson;
  font-size: 0.8rem;
  font-style: italic;
  margin: 0.1rem;
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
  background-color: teal;
}
</style>
