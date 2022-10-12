import { api } from "../utils/helper";
import type { request } from "env";

export const followshipAPI = {
  getFollowingList: function (payLoad: request) {
    return api.get(`/followship/following/${payLoad.id}`);
  },
  getFollowerList: function (payLoad: request) {
    return api.get(`/followship/follower/${payLoad.id}`);
  },
  deleteFollowing: function (payLoad: request) {
    return api.delete(`/followship/following/${payLoad.id}`);
  },
  addFollowing: function (payLoad: request) {
    return api.post(`/followship/following/${payLoad.id}`);
  },
};
