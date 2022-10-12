import { defineStore } from "pinia";
import type { followshipList } from "env";
import { reactive } from "vue";
import { followshipAPI } from "@/apis/followship";

export const useStoreFollowings = defineStore("storeFollowings", () => {
  const lists: followshipList = reactive({
    id: -1,
    name: "",
    account: "",
    avatar: "",
    cover: "",
    Followings: [],
    unfollowings: [],
  });
  const isSelfPageUserYourFollowing = reactive([-1, false]);
  function visitSelfPage(selfPageUserId: number) {
    isSelfPageUserYourFollowing[0] = selfPageUserId;
    lists.Followings.forEach((item) => {
      if (item.id === selfPageUserId) isSelfPageUserYourFollowing[1] = true;
    });
  }
  function pushFollowings(payLoad: followshipList) {
    if (payLoad.Followings) {
      lists.Followings = payLoad.Followings;
    }
    if (payLoad.unfollowings) {
      lists.unfollowings = payLoad.unfollowings;
    }
  }
  async function deleteFollowing(id: number) {
    try {
      const { data } = await followshipAPI.deleteFollowing({ id });
      lists.Followings.forEach((item) => {
        if (item.id === id && data.status === "success") {
          const popped = lists.Followings.splice(
            lists.Followings.indexOf(item),
            1
          );
          lists.unfollowings.push(popped[0]);
        }
      });
      if (id === isSelfPageUserYourFollowing[0])
        isSelfPageUserYourFollowing[1] = false;
    } catch (error) {
      console.log(error);
    }
  }
  async function addFollowing(id: number) {
    try {
      if (lists.Followings) {
        const { data } = await followshipAPI.addFollowing({ id });
        lists.unfollowings.forEach((item) => {
          if (item.id === id && data.status === "success") {
            const popped = lists.unfollowings.splice(
              lists.unfollowings.indexOf(item),
              1
            );
            lists.Followings.push(popped[0]);
          }
        });
      }
      if (id === isSelfPageUserYourFollowing[0])
        isSelfPageUserYourFollowing[1] = true;
    } catch (error) {
      console.log(error);
    }
  }
  return {
    pushFollowings,
    deleteFollowing,
    addFollowing,
    visitSelfPage,
    lists,
    isSelfPageUserYourFollowing,
  };
});
