<template>
  <div class="page-container">
    <SideBar />
    <div class="main-container">
      <div class="main-header" style="border-bottom: 0">
        <font-awesome-icon
          icon="arrow-left"
          class="cursor-pointer"
          size="lg"
          @click="goBackToPrevPage"
        />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="name">
          <span>{{ userName }}</span>
          <span class="light">{{ tweetCount }}貼文</span>
        </div>
      </div>
      <div class="follow-menu">
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === followMenu.follower }"
          @click.stop.prevent="changeList(followMenu.follower)"
          >跟隨者</span
        >
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === followMenu.following }"
          @click.stop.prevent="changeList(followMenu.following)"
          >正在跟隨</span
        >
      </div>
      <FollowerList
        :followshipList="followerList"
        v-if="listStatus === followMenu.follower"
      />
      <FollowingList
        :followshipList="followingList"
        v-if="listStatus === followMenu.following"
      />
    </div>
    <PopularList />
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";
import PopularList from "@/components/PopularList.vue";
import FollowerList from "@/components/FollowerList.vue";
import FollowingList from "@/components/FollowingList.vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { followshipAPI } from "@/apis/followship";
import type { followData, followshipList } from "env";
import { tweetsAPI } from "@/apis/tweet";

export default defineComponent({
  setup() {
    enum followMenu {
      following = "following",
      follower = "follower",
    }
    const router = useRouter();
    const route = useRoute();
    const listStatus = ref(followMenu.follower);
    const followerList: followshipList = reactive({
      id: -1,
      name: "",
      account: "",
      avatar: "",
      cover: "",
      Followers: [],
      Followings: [],
      unfollowings: [],
    });
    const followingList: followshipList = reactive({
      id: -1,
      name: "",
      account: "",
      avatar: "",
      cover: "",
      Followings: [],
      unfollowings: [],
    });
    const tweetCount = ref(-1);
    const userName = ref("");

    onMounted(async () => {
      try {
        const userId = Number(route.params.id);
        const tweetData = (
          await tweetsAPI.getTweetOfSelectedUser({ id: userId })
        ).data;
        //get followship list
        const followingData = (
          await followshipAPI.getFollowingList({
            id: userId,
          })
        ).data;
        const followerData = (
          await followshipAPI.getFollowerList({
            id: userId,
          })
        ).data;
        //sort followship list by date
        followingData.Followings.sort(function (a: followData, b: followData) {
          return (
            new Date(b.Followship.createdAt).getTime() -
            new Date(a.Followship.createdAt).getTime()
          );
        });
        followerData.Followers.sort(function (a: followData, b: followData) {
          return (
            new Date(b.Followship.createdAt).getTime() -
            new Date(a.Followship.createdAt).getTime()
          );
        });
        //assign isFollowing attribute to followingData
        followingData.Followings.forEach(function (item: followData) {
          item.isFollowing = true;
        });
        followingData.unfollowings.map(function (item: followData) {
          item.isFollowing = false;
        });
        //assign list to reactive arrays
        Object.assign(followerList, followerData);
        Object.assign(followingList, followingData);
        tweetCount.value = tweetData.length;
        userName.value = followingData.name;
      } catch (error) {
        console.log(error);
      }
    });
    function goBackToPrevPage() {
      router.go(-1);
    }
    function changeList(status: followMenu) {
      listStatus.value = status;
    }

    return {
      goBackToPrevPage,
      changeList,
      followMenu,
      listStatus,
      followerList,
      followingList,
      userName,
      tweetCount,
    };
  },
  components: {
    SideBar,
    PopularList,
    FollowerList,
    FollowingList,
  },
});
</script>

<style lang="scss">
.page-container {
  .main-container {
    .main-header {
      .name {
        .light {
          font-size: 5px;
        }
        span {
          display: block;
          height: 20px;
          line-height: 20px;
          text-align: left;
        }
      }
    }
    .follow-menu {
      height: 40px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 25% 25%;
      text-align: center;
      border-bottom: 1px solid #e6ecf0;
      .selected {
        color: #ff6600;
        border-bottom: 1px solid #ff6600;
      }
    }
  }
}
</style>
