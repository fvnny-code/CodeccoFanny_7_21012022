import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListPost from "../views/ListPost.vue";
import TheHeader from "../components/TheHeader.vue";




// Définition des routes possibles. 
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/AuthView.vue")
    },
    {
        path: "/home",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),

        // component: AboutView,
        meta: {
            toTop: true,
            smoothScroll: true
        }
    },

    {
        path: "/listPost",
        name: "listPost",
        component: ListPost
    },
    {
        // Ici on a une route "dynamique" pour pouvoir filer l'id du post qu'on veut afficher. 
        // <div>Item: {{ $route.params.name }}</div>
        path: "/detailPost/:id",
        name: "detailPost",
        component: () => import("../views/DetailPost.vue"),
    },

    {
        path: "/theHeader",
        name: "TheHeader",
        component: TheHeader
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        const scroll = {}
        if (to.meta.toTop) scroll.top = 0
        if (to.meta.smoothScroll) scroll.behavior = 'smooth'
        return scroll
    }
});

export default router;
