import { api } from "../utils/helper";

export const followingsAPI = {
  getFollowingList: function () {
    return api.get("/followship");
  },
};
