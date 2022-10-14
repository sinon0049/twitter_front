import { api } from "../utils/helper";
import type { request } from "env";

export const usersAPI = {
  signIn: function (payLoad: request) {
    return api.post("/user/signin", payLoad);
  },
  signUp: function (payLoad: request) {
    return api.post("/user/signup", payLoad);
  },
  getCurrentUser: function () {
    return api.get("/user/current_user");
  },
  getDetail: function (payLoad: request) {
    return api.get(`/user/${payLoad.id}`);
  },
  modifyInfo: function (payLoad: FormData) {
    return api.put("/user/info", payLoad, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  modifySetting: function (payLoad: request) {
    return api.put("/user/setting", payLoad);
  },
};
