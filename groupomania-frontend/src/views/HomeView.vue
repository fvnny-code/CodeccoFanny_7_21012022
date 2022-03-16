<template>
  <div class="home">
    <TheHeader />
    <hr>
    <FeedView />
   
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TheHeader from "../components/TheHeader.vue";
import FeedView from "@/components/FeedView.vue";



export default {
  name: "HomeView",
  components: {
    TheHeader,
    FeedView
  },
};
</script>
