import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import RegistPage from "../views/RegistPage.vue"
import LoginPage from "../views/LoginPage.vue"
import SettingPage from "../views/SettingPage.vue"
import MainPage from "../views/MainPage.vue"
import ReplyList from "../views/ReplyList.vue"

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
      name: "reply-list",
      component: ReplyList,
    },
    {
      path: "/",
      name: "not-found",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pathsWithoutAuth = ['/login', '/regist']
  const localToken = localStorage.getItem('token')
  if(!localToken && !pathsWithoutAuth.includes(to.fullPath)) {
    router.push('/login')
  }
  else next()
})

export default router;
