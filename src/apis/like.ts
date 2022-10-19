import { api } from "@/utils/helper";
import type { request } from "env";

export const likesAPI = {
  addLike: function (payLoad: request) {
    return api.post(`/like/${payLoad.id}`);
  },
  deleteLike: function (payLoad: request) {
    return api.delete(`/like/${payLoad.id}`);
  },
  getLike: function (payLoad: request) {
    return api.get(`/like/user/${payLoad.id}`);
  },
};
