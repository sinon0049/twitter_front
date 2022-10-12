import { defineStore } from "pinia";
import { reactive } from "vue";
import type { fullUserInfo } from "env";

export const useCurrentUser = defineStore("currentUser", () => {
  //currently sign-in user info
  const info: fullUserInfo = reactive({
    id: -1,
    name: "",
    account: "",
    avatar: "",
    cover: "",
    email: "",
    introduction: "",
    password: "",
    role: "",
    token: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  //assign info from api to reactive object
  function storeCurrentUser(payLoad: fullUserInfo) {
    Object.assign(info, payLoad);
  }
  //clean info when sign out
  function cleanCurrentUser() {
    Object.assign(info, {});
  }
  return {
    info,
    storeCurrentUser,
    cleanCurrentUser,
  };
});
