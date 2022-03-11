<template>
  <div class="home">
    <TheHeader></TheHeader>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TheHeader from "../components/TheHeader.vue";

export default {
  name: "HomeView",
  components: {
    TheHeader,
  },
};
</script>
