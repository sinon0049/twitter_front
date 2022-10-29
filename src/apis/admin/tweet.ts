import { api } from "@/utils/helper";
import type { request } from "env";

export const adminTweetsAPI = {
  getAllTweets: function () {
    return api.get("/admin/tweet");
  },
  deleteTweet: function (payLoad: request) {
    return api.delete(`/admin/tweet/${payLoad.id}`);
  },
};
