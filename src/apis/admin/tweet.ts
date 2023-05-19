import { api } from "@/utils/helper";
import type { Request } from "env";

export const adminTweetsAPI = {
  getAllTweets: function () {
    return api.get("/admin/tweet");
  },
  deleteTweet: function (payLoad: Request) {
    return api.delete(`/admin/tweet/${payLoad.id}`);
  },
};
