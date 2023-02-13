import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import login from "../components/Login.vue";
import register from "../components/Register.vue";
import changePassword from "../components/ChangePassword.vue";
import recoverPassword from "../components/RecoverPassword.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/login",
    name: "Login-Form",
    component: login,
  },
  {
    path: "/user/register",
    name: "Register-Form",
    component: register,
  },
  {
    path: "/changePassword/:id/:passwordToken",
    name: "ChangePassword-Form",
    component: changePassword,
  },
  {
    path: "/changePassword/",
    name: "RecoverPassword-Form",
    component: recoverPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
