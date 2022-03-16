import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import TheHeader from "../components/TheHeader.vue";
import LoginForm from "../components/LoginForm.vue";

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
    path: "/login",
    name: "LoginForm",
    component:LoginForm,
  },
  {
    path: "/TheHeader",
    name: "TheHeader",
    component: TheHeader,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
