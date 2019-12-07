import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/product_detail",
    name: "product_detail",

    component: () => import("../views/product_detail.vue")
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("../views/wallet.vue")
  },
  {
    path: "/backups",
    name: "backups",
    component: () => import("../views/Backups.vue")
  },
  {
    path: "/confirm",
    name: "confirm",
    component: () => import("../views/Confirm.vue")
  },
  {
    path: "/orderInfo",
    name: "orderInfo",
    component: () => import("../views/order_detail.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
