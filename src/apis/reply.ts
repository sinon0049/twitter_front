import { api } from "@/utils/helper";
import type { request } from "env";

export const repliesAPI = {
  getReplyOfSelectedUser: function (payLoad: request) {
    return api.get(`/reply/user/${payLoad.id}`);
  },
};
