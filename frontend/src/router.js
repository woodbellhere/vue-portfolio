const HomePage = () => import("./pages/HomePage.vue");
const LoginPage = () => import("./pages/LoginPage.vue");
const SearchPage = () => import("./pages/SearchPage.vue");
const ProfilePage = () => import("./pages/ProfilePage.vue");
const ProfileEditingPage = () => import("./pages/ProfileEditingPage.vue");
import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";

const routeMap = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/search_result",
    name: "search_result",
    component: SearchPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    name: "profileEdit",
    component: ProfileEditingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  routes: routeMap,
  history: createWebHistory(),
});

// 全局登录控制
router.beforeEach((to) => {
  if (to.name !== "login" && !getJwtToken()) {
    return { name: "login" };
  }
  if (to.name === "login" && getJwtToken()) {
    return { name: "home" };
  }
});

export { router };
