import { api } from "../utils/helper";
import type { Request } from "env";

export const followshipAPI = {
  getFollowingList: function (payLoad: Request) {
    return api.get(`/followship/following/${payLoad.id}`);
  },
  getFollowerList: function (payLoad: Request) {
    return api.get(`/followship/follower/${payLoad.id}`);
  },
  deleteFollowing: function (payLoad: Request) {
    return api.delete(`/followship/following/${payLoad.id}`);
  },
  addFollowing: function (payLoad: Request) {
    return api.post(`/followship/following/${payLoad.id}`);
  },
};
