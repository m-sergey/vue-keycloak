import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AuthSuccess from "@/components/AuthSuccess.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/authsuccess",
    name: "AuthSuccess",
    component: AuthSuccess,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
