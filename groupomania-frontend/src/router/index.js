import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";


import TheHeader from "../components/TheHeader.vue";
import FeedView from "../components/FeedView.vue";
import ProfileView from "../components/ProfileView.vue";
import PostForm from "../components/PostForm.vue";
import UpdatePostModal from "../components/UpdatePostModal.vue";
import UpdateComModal from "../components/UpdateComModal.vue";
import UpdateProfileModal from "../components/UpdateProfileModal.vue";
import TheFooter from "../components/TheFooter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AuthView",
    component: AuthView,
  },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/home/profile",
    name: "ProfileView",
    component: ProfileView,
  },
  {
    path: "/TheHeader",
    name: "TheHeader",
    component: TheHeader,
  },
  {
    path: "/home/feed",
    name: "FeedView",
    component: FeedView,
  },
  {
    path: "/home/feed/post",
    name: "PostForm",
    component: PostForm,
  },
  {
    path: "/UpdatePostModal",
    name: "UpdatePostModal",
    component: UpdatePostModal,
  },
  {
    path: "/UpdateComModal",
    name: "UpdateComModal",
    component: UpdateComModal,
  },
  {
    path: "/UpdateProfileModal",
    name: "UpdateProfileModal",
    component: UpdateProfileModal,
  },
  {
    path: "/TheFoter",
    name: "TheFooter",
    component: TheFooter,
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
