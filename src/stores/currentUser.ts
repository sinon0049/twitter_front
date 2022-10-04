import { defineStore } from "pinia";
import { reactive } from "vue";
import type { fullUserInfo } from "env";

export const useCurrentUser = defineStore("currentUser", () => {
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
  function storeCurrentUser(payLoad: fullUserInfo) {
    Object.assign(info, payLoad);
  }
  function cleanCurrentUser() {
    Object.assign(info, {});
  }
  return {
    info,
    storeCurrentUser,
    cleanCurrentUser,
  };
});
