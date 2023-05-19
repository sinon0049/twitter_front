import { defineStore } from "pinia";
import { reactive } from "vue";
import type { CurrentUser } from "env";

export const useCurrentUser = defineStore("currentUser", () => {
  //currently sign-in user info
  const info: CurrentUser = reactive({
    id: -1,
    name: "",
    account: "",
    avatar: "",
    cover: "",
    email: "",
    introduction: "",
    role: "",
  });
  //assign info from api to reactive object
  function storeCurrentUser(payLoad: CurrentUser) {
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
