import { api } from "../utils/helper";
import type { Request } from "env";

export const usersAPI = {
  signIn: function (payLoad: Request) {
    return api.post("/user/signin", payLoad);
  },
  signUp: function (payLoad: Request) {
    return api.post("/user/signup", payLoad);
  },
  getCurrentUser: function () {
    return api.get("/user/current_user");
  },
  getDetail: function (payLoad: Request) {
    return api.get(`/user/${payLoad.id}`);
  },
  modifyInfo: function (payLoad: FormData) {
    return api.put("/user/info", payLoad, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  modifySetting: function (payLoad: Request) {
    return api.put("/user/setting", payLoad);
  },
};
