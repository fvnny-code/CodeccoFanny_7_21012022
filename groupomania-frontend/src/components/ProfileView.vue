<template>
  <div id="profile">
    <button class="btn--close" @click="close">X</button>
    <h2>Mon profil</h2>
    <div class="card">
      <div class="user__avatar">
        <img class="avatar" src="../assets/avatar.jpg" />
      </div>
      <p>
        Pseudo <br />
        {{ dataGet.userName }}
      </p>
      <p>
        Email <br />
        {{ dataGet.email }}
      </p>
      <div class="card-actions">
        <button
          @click="showUpdateModal"
          title="modifier mes informations"
        >
          Modifier
        </button>
        <button
          class="btn--cancel"
          title="supprimer mon profil"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import Axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
   
      msg: "",
      valid: true,
      dataGet: {
        pseudo: "",
        email: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.$router.push("/home");
    },
    showUpdateModal(){
        this.$router.push("/UpdateProfileModal")
    }
  },
};
</script>
<style scoped>
#profile {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 0.5rem;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  margin: 4rem auto;
  max-width: 80%;
}
h2 {
  text-align: center;
}
.user__avatar {
  
  margin: auto;
}
.avatar{
  max-width: 100px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem auto;
  padding: 1rem;
}
.card-actions {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  align-items: center;
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
