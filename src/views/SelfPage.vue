<template>
  <div class="page-container">
    <SideBar />
    <div class="main-container">
      <div class="main-header">
        <font-awesome-icon
          icon="arrow-left"
          class="cursor-pointer"
          size="lg"
          @click="goBackToPrevPage"
        />
        <span>&nbsp;&nbsp;{{ detailOfUser.name }}</span>
      </div>
      <div class="cover-container">
        <div class="cover">
          <img :src="detailOfUser.cover" alt="..." class="img-cover" />
        </div>
        <img :src="detailOfUser.avatar" alt="..." class="img-avatar" />
        <button
          class="btn-white btn-modal"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          v-if="isExactUser"
        >
          編輯個人資料
        </button>
        <div class="btn-group" v-else>
          <button class="btn-white icon">
            <font-awesome-icon :icon="['far', 'envelope']" size="lg" />
          </button>
          <button class="btn-white icon">
            <font-awesome-icon :icon="['far', 'bell']" size="lg" />
          </button>
          <button
            class="btn-orange follow"
            v-if="storeFollowings.isSelfPageUserYourFollowing.isFollowing"
            @click.stop.prevent="
              storeFollowings.deleteFollowing(detailOfUser.id)
            "
          >
            正在跟隨
          </button>
          <button
            class="btn-white follow"
            v-else
            @click.stop.prevent="storeFollowings.addFollowing(detailOfUser.id)"
          >
            跟隨
          </button>
        </div>
        <EditModal :currentReplyingTweet="currentReplyingTweet" />
      </div>
      <div class="self-info">
        <span class="info-name">{{ detailOfUser.name }}</span>
        <span class="light info-account">@{{ detailOfUser.account }}</span>
        <span class="info-description">{{ detailOfUser.introduction }}</span>
        <div>
          <span>{{ detailOfUser.Followings.length }}個</span>
          <span class="light">追隨中 </span>
          <span> &nbsp;{{ detailOfUser.Followers.length }}個</span>
          <span class="light">追隨者</span>
        </div>
      </div>
      <div class="self-tweet-menu">
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === selfMenu.tweet }"
          @click.stop.prevent="changeList(selfMenu.tweet)"
          >推文</span
        >
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === selfMenu.reply }"
          @click.stop.prevent="changeList(selfMenu.reply)"
          >推文及回覆</span
        >
        <span
          class="cursor-pointer"
          :class="{ selected: listStatus === selfMenu.like }"
          @click.stop.prevent="changeList(selfMenu.like)"
          >喜歡的內容</span
        >
      </div>
      <TweetList
        :tweetList="tweetList"
        @onReply="onReply"
        v-if="listStatus === selfMenu.tweet"
      />
      <ReplyList
        :replyList="replyList"
        @onReply="onReply"
        v-else-if="listStatus === selfMenu.reply"
      />
      <TweetList :tweetList="likeList" @onReply="onReply" v-else />
    </div>
    <PopularList />
    <ReplyModal :currentReplyingTweet="currentReplyingTweet" />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  .cover-container {
    position: relative;
    height: 30vh;
    text-align: right;
    .cover {
      width: 100%;
      height: 80%;
    }
    .img-cover {
      width: 100%;
      height: 100%;
    }
    .img-avatar {
      position: absolute;
      width: 120px;
      height: 120px;
      z-index: 999;
      left: 3%;
      bottom: 0;
      background: white;
      border-radius: 50%;
      border: 2px solid white;
      object-fit: cover;
    }
    button {
      height: 35px;
    }
    .btn-modal {
      position: relative;
      top: 3%;
      right: 1%;
      width: 120px;
      border-radius: 17.5px;
    }
    .btn-group {
      position: relative;
      top: 3%;
      right: 1%;
      display: flex;
      justify-content: space-between;
      width: 160px;
      float: right;
      button {
        border-radius: 17.5px;
      }
      .icon {
        width: 35px;
      }
      .follow {
        width: 80px;
      }
    }
  }
  .self-info {
    display: flex;
    flex-direction: column;
    margin: 0 3% 5% 3%;
    span {
      font-size: 14px;
    }
    .info-name {
      font-size: 20px;
      font-weight: bold;
    }
    .info-account,
    .info-description {
      display: block;
      margin-bottom: 3px;
    }
  }
  .self-tweet-menu {
    height: 40px;
    display: grid;
    grid-template-columns: 33% 33% 34%;
    text-align: center;
    border-bottom: 1px solid #e6ecf0;
    span {
      line-height: 30px;
    }
    .selected {
      color: #ff6600;
      border-bottom: 1px solid #ff6600;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import SideBar from "../components/SideBar.vue";
import PopularList from "../components/PopularList.vue";
import TweetList from "../components/TweetList.vue";
import ReplyList from "../components/ReplyList.vue";
import ReplyModal from "../components/ReplyModal.vue";
import EditModal from "../components/EditModal.vue";
import { usersAPI } from "@/apis/user";
import { tweetsAPI } from "@/apis/tweet";
import { repliesAPI } from "@/apis/reply";
import { useCurrentUser } from "@/stores/currentUser";
import { useStoreFollowings } from "@/stores/followship";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import type { reply, tweet, userDetail } from "env";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    enum selfMenu {
      tweet = "tweet",
      reply = "reply",
      like = "like",
    }
    //check if user is watching his/her own information
    const isExactUser = ref(false);
    const currentUser = useCurrentUser();
    const storeFollowings = useStoreFollowings();
    const router = useRouter();
    const route = useRoute();
    const listStatus = ref(selfMenu.tweet);
    const tweetList: tweet[] = reactive([]);
    const likeList: tweet[] = reactive([]);
    const replyList: reply[] = reactive([]);
    const currentReplyingTweet: tweet = reactive({
      id: -1,
      UserId: -1,
      description: "",
      User: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
      },
      Replies: [],
      Likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const detailOfUser: userDetail = reactive({
      id: -1,
      name: "",
      account: "",
      introduction: "",
      avatar: "",
      cover: "",
      Followings: [],
      Followers: [],
      Likes: [],
    });

    //get all lists and user info when mounted and assign them to refs and reactives
    async function loadUser(userId: number) {
      try {
        tweetList.splice(0, tweetList.length);
        likeList.splice(0, likeList.length);
        replyList.splice(0, replyList.length);
        const payLoad = { id: userId };
        const userDetail = (await usersAPI.getDetail(payLoad)).data;
        isExactUser.value = userId === currentUser.info.id;
        storeFollowings.visitSelfPage(userId);
        Object.assign(detailOfUser, userDetail);
        const tweetsOfUser = (await tweetsAPI.getTweetOfSelectedUser(payLoad))
          .data;
        const replyOfUser = (await repliesAPI.getReplyOfSelectedUser(payLoad))
          .data;
        const likeOfUser = userDetail.Likes;
        tweetsOfUser.forEach(function (item: tweet) {
          tweetList.push(item);
        });
        likeOfUser.forEach(function (item: tweet) {
          likeList.push(item);
        });
        replyOfUser.forEach(function (item: reply) {
          replyList.push(item);
        });
      } catch (error) {
        console.log(error);
      }
    }

    //onMounted action
    onMounted(() => {
      loadUser(Number(route.params.id));
    });
    //onBeforeRouteUpdate action
    onBeforeRouteUpdate((to) => {
      loadUser(Number(to.params.id));
    });

    //get time from now
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }

    //back to previous page feature of arrow on main-header
    function goBackToPrevPage() {
      router.go(-1);
    }

    //get current replying tweet when clicking comment icon in TweetList.vue
    function onReply(id: number) {
      tweetList.forEach((item) => {
        if (item.id === id) {
          Object.assign(currentReplyingTweet, item);
        }
      });
    }

    //change status of list
    function changeList(status: selfMenu) {
      listStatus.value = status;
    }

    return {
      selfMenu,
      listStatus,
      detailOfUser,
      tweetList,
      likeList,
      replyList,
      currentUser,
      storeFollowings,
      currentReplyingTweet,
      isExactUser,
      dateFromNow,
      goBackToPrevPage,
      changeList,
      onReply,
    };
  },
  components: {
    SideBar,
    PopularList,
    TweetList,
    ReplyModal,
    EditModal,
    ReplyList,
  },
});
</script>
