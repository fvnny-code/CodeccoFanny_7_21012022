import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import ProfileView from "../views/ProfileView.vue";

import TheHeader from "../components/TheHeader.vue";
// import LoginForm from "../components/LoginForm.vue";
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
    path: "/MyProfile",
    name: "ProfileView",
    component: ProfileView,
  },
  // {
  //   path: "/login",
  //   name: "LoginForm",
  //   component:LoginForm,
  // },
  {
    path: "/TheHeader",
    name: "TheHeader",
    component: TheHeader,
  },
  {
    path: "/TheFoter",
    name: "TheFooter",
    component: TheFooter,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
