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
        <img
          src="https://img.freepik.com/free-photo/view-landmark-asian-sky-reflection_1417-266.jpg?w=1380&t=st=1663766445~exp=1663767045~hmac=4e4b68d88985c031c59a4cd892f07faaa531ca9b091d90cadcfa0a05eb827c6a"
          alt="..."
          class="img-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1663691219171-93494f63b5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=397&q=80"
          alt="..."
          class="img-avatar"
        />
        <button class="btn-white">編輯個人資料</button>
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
    .img-cover {
      width: 100%;
      height: 80%;
      object-fit: cover;
    }
    .img-avatar {
      position: absolute;
      width: 120px;
      height: 120px;
      z-index: 999;
      left: 3%;
      bottom: 0;
      background: black;
      border-radius: 50%;
      border: 2px solid white;
      object-fit: cover;
    }
    button {
      position: relative;
      top: 3%;
      right: 1%;
      height: 35px;
      width: 120px;
      border-radius: 17.5px;
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
import { usersAPI } from "@/apis/user";
import { tweetsAPI } from "@/apis/tweet";
import { repliesAPI } from "@/apis/reply";
import { useCurrentUser } from "@/stores/currentUser";
import { useRoute, useRouter } from "vue-router";
import type { reply, tweet, userDetail } from "env";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    enum selfMenu {
      tweet = "tweet",
      reply = "reply",
      like = "like",
    }
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
    const currentUser = useCurrentUser();
    const router = useRouter();

    //get all lists and user info when mounted and assign them to refs and reactives
    onMounted(async () => {
      try {
        const userId = Number(useRoute().params.id);
        const payLoad = { id: userId };
        const userDetail = (await usersAPI.getDetail(payLoad)).data;
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
        console.log(replyList);
      } catch (error) {
        console.log(error);
      }
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
      currentReplyingTweet,
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
    ReplyList,
  },
});
</script>
