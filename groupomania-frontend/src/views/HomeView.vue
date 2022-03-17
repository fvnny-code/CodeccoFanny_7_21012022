<template>
  <div class="home">
    <TheHeader />
    <hr>
    <FeedView />
   
   <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TheHeader from "../components/TheHeader.vue";
import FeedView from "@/components/FeedView.vue";
import TheFooter from "@/components/TheFooter.vue";



export default {
  name: "HomeView",
  components: {
    TheHeader,
    FeedView,
    TheFooter
},
};
</script>
