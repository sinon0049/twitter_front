import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegistPage from "../views/RegistPage.vue"
import LoginPage from "../views/LoginPage.vue"
import SettingPage from "../views/SettingPage.vue"
import MainPage from "../views/MainPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
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
    }
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
