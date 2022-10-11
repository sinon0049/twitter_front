import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import RegistPage from "../views/RegistPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SettingPage from "../views/SettingPage.vue";
import MainPage from "../views/MainPage.vue";
import ReplyPage from "../views/ReplyPage.vue";
import SelfPage from "../views/SelfPage.vue";
import FollowPage from "../views/FollowPage.vue";
import { useCurrentUser } from "@/stores/currentUser";
import { usersAPI } from "@/apis/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/regist",
      name: "regist",
      component: RegistPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/setting",
      name: "setting",
      component: SettingPage,
    },
    {
      path: "/main",
      name: "main",
      component: MainPage,
    },
    {
      path: "/reply/:id",
      name: "reply-page",
      component: ReplyPage,
    },
    {
      path: "/self/:id",
      name: "self-page",
      component: SelfPage,
    },
    {
      path: "/follow/:id",
      name: "follow-page",
      component: FollowPage,
    },
    {
      path: "/",
      name: "not-found",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const pathsWithoutAuth = ["/login", "/regist"];
  const localToken = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  if (!localToken && !pathsWithoutAuth.includes(to.fullPath)) {
    router.push("/login");
  } else if (!localToken) next();
  else {
    const { data } = await usersAPI.getCurrentUser();
    currentUser.storeCurrentUser(data);
    next();
  }
});

export default router;
