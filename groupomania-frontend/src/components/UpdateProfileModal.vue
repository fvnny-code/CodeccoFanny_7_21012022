<template>
  <div class="modal-backdrop">
    <div class="modal">
      <form id="modal" class="form-row" action="" @submit="Update">
        <button class="btn--close" @click="close">X</button>
        <h2>Modifier mon profil</h2>
        <div class="form-row">
          <div class="user__avatar">
            <img class="avatar" src="../assets/avatar.jpg" />
            <input
              class="input-upload"
              accept=".jpg,
            .jpeg, .png, .gif"
              type="file"
              name="image_url"
              id="images"
            />
          </div>
        </div>
        <label for="title">Pseudo : </label>
        <input
          v-model="data.userName"
          type="text"
          id="pseudo"
          name="pseudo"
          rows="8"
          cols="30"
          wrap="on"
          autofocus
        />
        <label for="title">Email : </label>
        <input
          v-model="data.userName"
          type="text"
          id="email"
          name="email"
          rows="8"
          cols="30"
          wrap="on"
          autofocus
        />
        <div class="form-row">
          <button type="submit" class="btn--success" @click="close">OK</button>
          <button type="submit" class="btn--cancel" @click="close">
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
  name: "UpdateProfileModal",
  data() {
    return {
      data: {
        id: "",
        userName: "",
        email: "",
        image_url: "",
      },
      dataS: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.$router.push("/home/profile");
    },

    Update() {
      this.dataS = JSON.stringify(this.data);
      console.log(this.dataS);

      axios
        .put("http://localhost:3000/api/:id", this.dataS, {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          console.log("AAAAAAAAAAAAAAAAAAAAA");
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

<style scoped>
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
  max-width: 100%;
}
h2 {
  text-align: center;

}
.user__avatar {
  max-width: 100px;
  display: flex;
  flex-direction: column;
  
}
.form-row {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1.5rem;
}
.input-upload {
  width: 100%;
  height: 50px !important;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px;
  position: relative;
  left: -.1rem;
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
.btn--cancel:hover {
  background-color: red;
}
</style>
