<template>
  <div class="login__container">
    <hr />
    <p>Coucou ici, la page de formulaire de login</p>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
};
</script>
<style scoped>
.login__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
p {
  text-align: center;
  padding: 2rem;
}
hr {
  width: 100%;
}

</style>
