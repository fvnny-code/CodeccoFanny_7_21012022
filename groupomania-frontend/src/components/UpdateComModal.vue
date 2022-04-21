<template>
  <div class="modal-backdrop">
    <div class="modal">
      <form id="modal" class="form-row" action="" @submit="Update">
      <button class="btn--close" @click="close">X</button>
        <label for="content">Commentaire</label>
        <textarea
          v-model="data.content"
          id="content"
          name="content"
          rows="5"
          cols="50"
          maxlength="500"
          autofocus
        >
        </textarea>
        <div class="form-row">
          <button type="submit" class="btn--cancel" @click="close">
            Annuler
          </button>
          <button type="submit" class="btn--success" @click="close">OK</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateModal",
  data() {
    return {
      data: {
        id: "",
        content: "",
        userId: "",
      },
      dataS: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.$router.push("/home");
    },


    Update() {
      this.dataS = JSON.stringify(this.data);
      console.log(this.dataS);

      axios
        .put("http://localhost:3000/api/post/:id", this.dataS, {
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          console.log("AAAAAAAAAAAAAAAAAAAAA")
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
  max-width: 80%;
}
.form-row {
  display: flex;
  flex-direction: row;
}
.btn--close{
  background-color: transparent;
  color: rgb(51, 49, 49);
  width: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-right: .1rem;
  padding: 0;
}
.btn--cancel:hover {
  background-color: red;
}

</style>
