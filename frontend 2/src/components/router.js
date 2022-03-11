import Vue from "vue";
import VueRouter from "vue-router";
import HomeFeed from "./HomeFeed.vue";

Vue.use(VueRouter);

export default new VueRouter ({
    routes: [
    {
        path: "/Home",
        name: "HomeFeed",
        component: "Home"
    },
    ]
})