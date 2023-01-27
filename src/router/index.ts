import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { useCurrentUser } from "@/stores/currentUser";
import { usersAPI } from "@/apis/user";
import { followshipAPI } from "@/apis/followship";
import { useStoreFollowings } from "@/stores/followship";
import { swalAlert } from "@/utils/helper";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "sign-up",
      component: defineAsyncComponent(() => import("../views/SignUpPage.vue")),
    },
    {
      path: "/signin",
      name: "sign-in",
      component: defineAsyncComponent(() => import("../views/SignInPage.vue")),
    },
    {
      path: "/setting",
      name: "setting",
      beforeEnter: checkIfUser,
      component: defineAsyncComponent(() => import("../views/SettingPage.vue")),
    },
    {
      path: "/main",
      name: "main",
      beforeEnter: checkIfUser,
      component: defineAsyncComponent(() => import("../views/MainPage.vue")),
    },
    {
      path: "/reply/:id",
      name: "reply-page",
      beforeEnter: checkIfUser,
      component: defineAsyncComponent(() => import("../views/ReplyPage.vue")),
    },
    {
      path: "/self/:id",
      name: "self-page",
      beforeEnter: checkIfUser,
      component: defineAsyncComponent(() => import("../views/SelfPage.vue")),
    },
    {
      path: "/follow/:id",
      name: "follow-page",
      beforeEnter: checkIfUser,
      component: defineAsyncComponent(() => import("../views/FollowPage.vue")),
    },
    {
      path: "/admin/signin",
      name: "admin-signin",
      component: defineAsyncComponent(() => import("../views/AdminSignin.vue")),
    },
    {
      path: "/admin/main",
      name: "admin-main",
      beforeEnter: checkIfAdmin,
      component: defineAsyncComponent(() => import("../views/AdminMain.vue")),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: defineAsyncComponent(() => import("../views/NotFound.vue")),
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
      storeFollowings.pushFollowings(followshipList.data);
      next();
    } else next();
  }
});

export default router;
