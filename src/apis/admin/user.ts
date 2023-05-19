import { api } from "../../utils/helper";
import type { Request } from "env";

export const adminAPI = {
  signIn: function (payLoad: Request) {
    return api.post("/admin/signin", payLoad);
  },
  signUp: function (payLoad: Request) {
    return api.post("/admin/signup", payLoad);
  },
  getAllUsers: function () {
    return api.get("/admin/user");
  },
};
