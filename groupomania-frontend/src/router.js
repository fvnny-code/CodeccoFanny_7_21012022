import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";

import TheHeader from "./components/TheHeader";

Vue.use(VueRouter);

export default new VueRouter({
   
  routes: [
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/TheHeader",
      name: "TheHeader",
      component: TheHeader,
    },
  ],
});
