<template>
    <div class="profile">
  <TheHeader />
  <hr>
  <div>
    <p>Pouet ! Tu veux voir mon profil ?</p>
  </div>
  <TheFooter/>
</div>
</template>
<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
    name: "ProfileView",
    components: {
    TheHeader,
    TheFooter
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
