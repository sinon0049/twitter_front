import { api } from "../utils/helper";
import type { request } from "env";

export const usersAPI = {
  signIn: function (payLoad: request) {
    return api.post("/user/signin", payLoad);
  },
  getCurrentUser: function () {
    return api.get("/user/current_user");
  },
  getDetail: function (payLoad: request) {
    return api.get(`/user/${payLoad.id}`);
  },
};
