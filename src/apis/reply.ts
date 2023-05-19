import { api } from "@/utils/helper";
import type { Request } from "env";

export const repliesAPI = {
  getReplyOfSelectedUser: function (payLoad: Request) {
    return api.get(`/reply/user/${payLoad.id}`);
  },
};
