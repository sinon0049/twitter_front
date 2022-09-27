import { api } from "@/utils/helper";
import type { request } from "env";

export const tweetsAPI = {
  getAllTweets: function () {
    return api.get("/tweet");
  },
  getTweet: function (payLoad: request) {
    return api.get(`/tweet/${payLoad.id}`);
  },
  createTweet: function (payLoad: request) {
    return api.post("/tweet", payLoad);
  },
  createReply: function (payLoad: request) {
    return api.post("/reply", payLoad);
  },
  getTweetOfSelectedUser: function (payLoad: request) {
    return api.get(`/tweet/user/${payLoad.id}`);
  },
};
