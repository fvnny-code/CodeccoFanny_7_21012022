<template>
    <div class="profile">
  <TheHeader />
  <hr>
  <div>
    <p>Pouet ! Tu veux voir mon profil ?</p>
  </div>
  
</div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";

export default {
    name: "ProfileView",
    components: {
    TheHeader,
  
},
}

</script>

<style scoped>
hr{
    width: 75%;
}
p{
    text-align: center;
}
</style>
