import { api } from "../../utils/helper";
import type { request } from "env";

export const adminAPI = {
  signIn: function (payLoad: request) {
    return api.post("/admin/signin", payLoad);
  },
  signUp: function (payLoad: request) {
    return api.post("/admin/signup", payLoad);
  },
  getAllUsers: function () {
    return api.get("/admin/user");
  },
};
