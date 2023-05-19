<template>
  <div class="page-container">
    <SideBar />
    <main>
      <header style="border-bottom: 0">
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
      </header>
      <div class="follow-menu">
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === FollowMenu.follower }"
          @click.stop.prevent="changeList(FollowMenu.follower)"
          >跟隨者</span
        >
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === FollowMenu.following }"
          @click.stop.prevent="changeList(FollowMenu.following)"
          >正在跟隨</span
        >
      </div>
      <FollowerList
        :followshipList="followerList"
        v-if="listStatus === FollowMenu.follower"
      />
      <FollowingList
        :followshipList="followingList"
        v-if="listStatus === FollowMenu.following"
      />
    </main>
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
import type { Followship, Followings } from "env";
import { tweetsAPI } from "@/apis/tweet";
import { usersAPI } from "@/apis/user";

export default defineComponent({
  setup() {
    enum FollowMenu {
      following = "following",
      follower = "follower",
    }
    const router = useRouter();
    const route = useRoute();
    const listStatus = ref(FollowMenu.follower);
    const followerList: Followship[] = reactive([]);
    const followingList: Followings = reactive({
      Followings: [],
      Unfollowings: [],
    });
    const tweetCount = ref(-1);
    const userName = ref("");

    onMounted(async () => {
      try {
        const userId = Number(route.params.id);
        //get required data through axios
        const [followingData, followerData, tweetData, userData] =
          await Promise.all([
            followshipAPI.getFollowingList({ id: userId }),
            followshipAPI.getFollowerList({ id: userId }),
            tweetsAPI.getTweetOfSelectedUser({ id: userId }),
            usersAPI.getDetail({ id: userId }),
          ]);
        //assign list to reactive arrays
        followingList.Followings = [...followingData.data.Followings];
        followingList.Unfollowings = [...followingData.data.Unfollowings];
        followerData.data.forEach((item: Followship) =>
          followerList.push(item)
        );
        console.log(followerList[0]);
        tweetCount.value = tweetData.data.length;
        userName.value = userData.data.name;
      } catch (error) {
        console.log(error);
      }
    });
    //go back to previous page
    function goBackToPrevPage() {
      router.go(-1);
    }
    //control which list user is watching
    function changeList(status: FollowMenu) {
      listStatus.value = status;
    }
    return {
      goBackToPrevPage,
      changeList,
      FollowMenu,
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

<style lang="scss" scoped>
.page-container {
  main {
    header {
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
      border-bottom: 1px solid $border;
      .selected {
        color: $orange;
        border-bottom: 1px solid $orange;
      }
    }
  }
}
</style>
