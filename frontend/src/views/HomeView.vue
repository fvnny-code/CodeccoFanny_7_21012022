<template>
  <div class="home">
    
    <!-- <h1>Bienvenue</h1> -->
    <TheHeader></TheHeader>
    <ListPost></ListPost>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import ListPost from "./ListPost.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomeView",
    components: { ListPost, TheHeader, TheFooter }
})
</script>
