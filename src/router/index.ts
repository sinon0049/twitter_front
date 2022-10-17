import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import SettingPage from "../views/SettingPage.vue";
import MainPage from "../views/MainPage.vue";
import ReplyPage from "../views/ReplyPage.vue";
import SelfPage from "../views/SelfPage.vue";
import FollowPage from "../views/FollowPage.vue";
import { useCurrentUser } from "@/stores/currentUser";
import { usersAPI } from "@/apis/user";
import { followshipAPI } from "@/apis/followship";
import type { followData } from "env";
import { useStoreFollowings } from "@/stores/followship";
import { swalAlert } from "@/utils/helper";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "sign-up",
      component: SignUpPage,
    },
    {
      path: "/signin",
      name: "sign-in",
      component: SignInPage,
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
  const pathsWithoutAuth = ["/signin", "/signup"];
  const localToken = localStorage.getItem("token");
  const currentUser = useCurrentUser();
  const storeFollowings = useStoreFollowings();
  if (!localToken && !pathsWithoutAuth.includes(to.fullPath)) {
    router.push("/signin");
    swalAlert.errorMsg("Please sign in.");
  } else if (!localToken) next();
  else {
    const { data } = await usersAPI.getCurrentUser();
    currentUser.storeCurrentUser(data);
    const followshipList = await followshipAPI.getFollowingList({
      id: currentUser.info.id,
    });
    followshipList.data.Followings.sort(function (
      a: followData,
      b: followData
    ) {
      return (
        new Date(b.Followship.createdAt).getTime() -
        new Date(a.Followship.createdAt).getTime()
      );
    });
    storeFollowings.pushFollowings(followshipList.data);
    next();
  }
});

export default router;
