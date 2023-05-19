import { api } from "@/utils/helper";
import type { Request } from "env";

export const likesAPI = {
  addLike: function (payLoad: Request) {
    return api.post(`/like/${payLoad.id}`);
  },
  deleteLike: function (payLoad: Request) {
    return api.delete(`/like/${payLoad.id}`);
  },
  getLike: function (payLoad: Request) {
    return api.get(`/like/user/${payLoad.id}`);
  },
};
