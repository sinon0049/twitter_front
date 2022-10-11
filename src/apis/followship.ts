import { api } from "../utils/helper";
import type { request } from "env";

export const followshipAPI = {
  getFollowingList: function (payLoad: request) {
    return api.get(`/followship/following/${payLoad.id}`);
  },
  getFollowerList: function (payLoad: request) {
    return api.get(`/followship/follower/${payLoad.id}`);
  },
};
