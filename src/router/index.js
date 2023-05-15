import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import AuthSuccess from "@/components/AuthSuccess.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/user",
    name: "UserInfoView",
    component: UserInfoView,
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
