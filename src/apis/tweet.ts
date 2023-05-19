import { api } from "@/utils/helper";
import type { Request } from "env";

export const tweetsAPI = {
  getAllTweets: function () {
    return api.get("/tweet");
  },
  getTweet: function (payLoad: Request) {
    return api.get(`/tweet/${payLoad.id}`);
  },
  createTweet: function (payLoad: Request) {
    return api.post("/tweet", payLoad);
  },
  createReply: function (payLoad: Request) {
    return api.post("/reply", payLoad);
  },
  getTweetOfSelectedUser: function (payLoad: Request) {
    return api.get(`/tweet/user/${payLoad.id}`);
  },
};
