<template>
  <div class="modal-backdrop">
    <div class="modal">
      <!-- <header class="modal__header">
        <button type="button" class="btn--close" @click="close">X</button>
        <slot name="title">Titre du post</slot>
      </header>
      <section class="modal__body">
        <slot name="content">Contenu à modifier</slot>
      </section>
      <footer class="modal__footer">
        <slot name="validation"></slot>
        <button type="button" class="btn--success" @click="close">OK</button>
        <button type="button" class="btn--cancel" @click="close">
          Annuler
        </button>
      </footer> -->
      <form id="modal" class="form-row" action="" @submit="Update">
      <button class="btn--close" @click="close">X</button>
        <label for="title">Titre : </label>
        <input
          v-model="data.title"
          type="title"
          id="title"
          name="title"
          rows="8"
          cols="30"
          wrap="on"
          autofocus
        />
        <label for="content">Contenu</label>
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
  name: "UpdateModal",
  data() {
    return {
      data: {
        id: "",
        title: "",
        content: "",
        userName: "",
      },
      dataS: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
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

/* .modal__header,
  .modal__footer {
    padding: 15px;
    display: flex;
  }
  .modal__header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal__footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }
 .modal__body {
    position: relative;
    padding: 20px 10px;
  }
.btn--close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 1.5rem;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  .btn--success {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
   .btn--cancel {
    color: white;
    background: red;
    border: 1px solid red;
    border-radius: 2px;
  } */
</style>
