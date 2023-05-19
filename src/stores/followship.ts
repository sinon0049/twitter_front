import { defineStore } from "pinia";
import type { Followings } from "env";
import { reactive } from "vue";
import { followshipAPI } from "@/apis/followship";
import { swalAlert } from "@/utils/helper";

export const useStoreFollowings = defineStore("storeFollowings", () => {
  //follow list used in PopularList.vue, SelfPage.vue & FollowingList.vue
  const lists: Followings = reactive({
    Followings: [],
    Unfollowings: [],
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
  function pushFollowings(payLoad: Followings) {
    lists.Followings = [...payLoad.Followings];
    lists.Unfollowings = [...payLoad.Unfollowings];
  }

  //delete following function
  async function deleteFollowing(id: number) {
    try {
      //delete following in backend db
      const { data } = await followshipAPI.deleteFollowing({ id });
      //modify reactive objects
      lists.Followings.forEach((item) => {
        if (item.Following.id === id && data.status === "success") {
          const popped = lists.Followings.splice(
            lists.Followings.indexOf(item),
            1
          );
          lists.Unfollowings.push(popped[0].Following);
        }
      });
      //modify following status when in others' self page
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
      lists.Unfollowings.forEach((item) => {
        if (item.id === id && data.status === "success") {
          const popped = lists.Unfollowings.splice(
            lists.Unfollowings.indexOf(item),
            1
          );
          lists.Followings.push({ ...data.newData, Following: popped[0] });
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
