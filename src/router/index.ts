import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import SettingPage from "../views/SettingPage.vue";
import MainPage from "../views/MainPage.vue";
import ReplyPage from "../views/ReplyPage.vue";
import SelfPage from "../views/SelfPage.vue";
import FollowPage from "../views/FollowPage.vue";
import AdminSignin from "../views/AdminSignin.vue";
import AdminMain from "../views/AdminMain.vue";
import { useCurrentUser } from "@/stores/currentUser";
import { usersAPI } from "@/apis/user";
import { followshipAPI } from "@/apis/followship";
import type { followData } from "env";
import { useStoreFollowings } from "@/stores/followship";
import { swalAlert } from "@/utils/helper";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "sign-up",
      //beforeEnter: checkSigninStatus,
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
      beforeEnter: checkIfUser,
      component: SettingPage,
    },
    {
      path: "/main",
      name: "main",
      beforeEnter: checkIfUser,
      component: MainPage,
    },
    {
      path: "/reply/:id",
      name: "reply-page",
      beforeEnter: checkIfUser,
      component: ReplyPage,
    },
    {
      path: "/self/:id",
      name: "self-page",
      beforeEnter: checkIfUser,
      component: SelfPage,
    },
    {
      path: "/follow/:id",
      name: "follow-page",
      beforeEnter: checkIfUser,
      component: FollowPage,
    },
    {
      path: "/admin/signin",
      name: "admin-signin",
      component: AdminSignin,
    },
    {
      path: "/admin/main",
      name: "admin-main",
      beforeEnter: checkIfAdmin,
      component: AdminMain,
    },
    {
      path: "/",
      name: "not-found",
      component: NotFound,
    },
  ],
});

function checkIfAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const currentUser = useCurrentUser();
  if (currentUser.info.role === "admin") next();
  else {
    next({ path: "/main" });
    swalAlert.errorMsg("No permission.");
  }
}

function checkIfUser(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const currentUser = useCurrentUser();
  if (currentUser.info.role === "user") next();
  else {
    next({ path: "/admin/main" });
    swalAlert.errorMsg("No permission.");
  }
}

router.beforeEach(async (to, from, next) => {
  const pathsWithoutAuth = ["/signin", "/signup", "/admin/signin"];
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
    if (currentUser.info.role === "user") {
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
    } else next();
  }
});

export default router;
