import { defineStore } from "pinia";
import type { followshipList } from "env";
import { reactive } from "vue";
import { followshipAPI } from "@/apis/followship";
import { swalAlert } from "@/utils/helper";

export const useStoreFollowings = defineStore("storeFollowings", () => {
  //follow list used in PopularList.vue, SelfPage.vue & FollowingList.vue
  const lists: followshipList = reactive({
    id: -1,
    name: "",
    account: "",
    avatar: "",
    cover: "",
    Followings: [],
    unfollowings: [],
  });
  //isFollowing control in SelfPage.vue
  const isSelfPageUserYourFollowing = reactive({
    id: -1,
    isFollowing: false,
  });

  //get id of currently visited user in SelfPage.vue & check if is following
  function visitSelfPage(selfPageUserId: number) {
    isSelfPageUserYourFollowing.id = selfPageUserId;
    lists.Followings.forEach((item) => {
      if (item.id === selfPageUserId)
        isSelfPageUserYourFollowing.isFollowing = true;
    });
  }

  //assign followings from api to reactive object
  function pushFollowings(payLoad: followshipList) {
    if (payLoad.Followings) {
      lists.Followings = payLoad.Followings;
    }
    if (payLoad.unfollowings) {
      lists.unfollowings = payLoad.unfollowings;
    }
  }

  //delete following function
  async function deleteFollowing(id: number) {
    try {
      //delete following in backend db
      const { data } = await followshipAPI.deleteFollowing({ id });
      //modify reactive objects
      lists.Followings.forEach((item) => {
        if (item.id === id && data.status === "success") {
          const popped = lists.Followings.splice(
            lists.Followings.indexOf(item),
            1
          );
          lists.unfollowings.push(popped[0]);
        }
      });
      //modify following status when in SelfPage.vue
      if (id === isSelfPageUserYourFollowing.id) {
        isSelfPageUserYourFollowing.isFollowing = false;
      }
      swalAlert.successMsg(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  //add following function
  async function addFollowing(id: number) {
    try {
      //add following to backend db
      const { data } = await followshipAPI.addFollowing({ id });
      //modify reactive object
      lists.unfollowings.forEach((item) => {
        if (item.id === id && data.status === "success") {
          const popped = lists.unfollowings.splice(
            lists.unfollowings.indexOf(item),
            1
          );
          lists.Followings.push(popped[0]);
        }
      });
      //modify following status when in SelfPage.vue
      if (id === isSelfPageUserYourFollowing.id) {
        isSelfPageUserYourFollowing.isFollowing = true;
      }
      swalAlert.successMsg(data.message);
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
