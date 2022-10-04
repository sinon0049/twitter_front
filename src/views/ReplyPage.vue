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
        <span>&nbsp;&nbsp;推文</span>
      </div>
      <div class="tweet-container">
        <div class="tweet-header">
          <img :src="tweet.User.avatar" alt="" />
          <div id="user">
            <span>{{ tweet.User.name }}</span>
            <span class="light">@{{ tweet.User.account }}</span>
          </div>
        </div>
        <div class="tweet-content">
          {{ tweet.description }}
        </div>
        <div class="time-stamp light">
          {{ formattedDate() }}
        </div>
        <hr />
        <div id="count-list">
          <span class>{{ tweet.Replies.length }}</span>
          <span class="light"> 回覆 &nbsp;&nbsp;</span>
          <span> {{ tweet.Likes.length }}</span>
          <span class="light"> 喜歡次數</span>
        </div>
        <hr />
        <div class="icon-container">
          <font-awesome-icon
            :icon="['far', 'comment']"
            class="light icon"
            style="margin-right: 25%"
            data-bs-toggle="modal"
            data-bs-target="#replyModal"
          />
          <font-awesome-icon :icon="['far', 'heart']" class="light icon" />
        </div>
      </div>
      <hr />
      <div class="tweet-container">
        <div class="tweet-card" v-for="item in tweet.Replies" :key="item.id">
          <img :src="item.User.avatar" alt="" />
          <div class="tweet-content">
            <div>
              <span>{{ item.User.name }}</span>
              <span class="light"> @{{ item.User.account }}</span>
              <span class="light">．{{ dateFromNow(item.createdAt) }}</span>
            </div>
            <div>
              <span class="light">回覆</span>
              <span class="orange"> @{{ tweet.User.account }}</span>
            </div>
            <div class="content">
              {{ item.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopularList />
    <ReplyModal :currentReplyingTweet="tweet" />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  width: 40%;
  .break-line {
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #e6ecf0;
  }
  .tweet-container {
    padding: {
      left: 15px;
      right: 15px;
    }
    hr {
      background-color: #e6ecf0;
      opacity: 1;
    }
    .tweet-header {
      display: flex;
      margin: 20px 0;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      #user {
        display: flex;
        flex-direction: column;
        margin: {
          left: 10px;
          top: auto;
          bottom: auto;
        }
      }
    }
    .tweet-content {
      margin: {
        bottom: 2%;
      }
    }
    .time-stamp {
      margin: {
        bottom: 2%;
      }
    }
    hr {
      border: 0;
      height: 1px;
      background-color: #e6ecf0;
    }
    #count-list {
      margin: {
        top: 2%;
        bottom: 2%;
      }
    }
    .icon-container {
      margin: {
        top: 3%;
        bottom: 2%;
      }
      .icon {
        font-size: 20px;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import SideBar from "../components/SideBar.vue";
import PopularList from "../components/PopularList.vue";
import ReplyModal from "../components/ReplyModal.vue";
import { useRoute } from "vue-router";
import { tweetsAPI } from "@/apis/tweet";
import type { tweet } from "env";
import { useCurrentUser } from "@/stores/currentUser";
import dayjs from "dayjs";
import router from "@/router";

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser();
    const tweet: tweet = reactive({
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

    //get corresponding tweet of this page & assign to tweet
    onMounted(async () => {
      const { id } = useRoute().params;
      const { data } = await tweetsAPI.getTweet({ id: Number(id) });
      Object.assign(tweet, data);
    });

    //get time from now
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }

    //get formatted date
    function formattedDate() {
      return dayjs(tweet.createdAt).format("HH:MM．YYYY年MM月DD日");
    }

    //back to previous page feature of arrow on main-header
    function goBackToPrevPage() {
      router.go(-1);
    }

    return {
      tweet,
      currentUser,
      dateFromNow,
      formattedDate,
      goBackToPrevPage,
    };
  },
  components: {
    SideBar,
    PopularList,
    ReplyModal,
  },
});
</script>
