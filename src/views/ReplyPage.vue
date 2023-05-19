<template>
  <div class="page-container">
    <SideBar />
    <main>
      <header>
        <font-awesome-icon
          icon="arrow-left"
          class="cursor-pointer"
          size="lg"
          @click="goBackToPrevPage"
        />
        <span>&nbsp;&nbsp;推文</span>
      </header>
      <div class="tweet">
        <div class="tweet-header">
          <router-link
            :to="{ name: 'self-page', params: { id: tweet.User.id } }"
          >
            <img :src="tweet.User.avatar" alt="" />
          </router-link>

          <div id="user">
            <router-link
              :to="{ name: 'self-page', params: { id: tweet.User.id } }"
            >
              <span>{{ tweet.User.name }}</span>
              <span class="light">@{{ tweet.User.account }}</span>
            </router-link>
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
            class="light icon cursor-pointer"
            style="margin-right: 25%"
            data-bs-toggle="modal"
            data-bs-target="#replyModal"
          />
          <font-awesome-icon
            :icon="['far', 'heart']"
            class="fa-icon cursor-pointer"
            style="color: #657786"
            @click.stop.prevent="addLike(tweet.id)"
            v-if="!tweet.isLike"
          />
          <font-awesome-icon
            :icon="['far', 'heart']"
            class="fa-icon cursor-pointer"
            style="color: #e0245e"
            @click.stop.prevent="deleteLike(tweet.id)"
            v-else
          />
        </div>
      </div>
      <hr />
      <div class="tweet-container">
        <div
          class="tweet-card"
          v-for="item in tweet.Replies"
          :key="item.id"
          :id="String(item.id)"
        >
          <img :src="item.User.avatar" alt="" />
          <div class="tweet-content">
            <div>
              <router-link
                :to="{ name: 'self-page', params: { id: item.User.id } }"
              >
                <span>{{ item.User.name }}</span>
                <span class="light"> @{{ item.User.account }}</span>
              </router-link>

              <span class="light">．{{ dateFromNow(item.createdAt) }}</span>
            </div>
            <div>
              <span class="light">回覆</span>
              <router-link
                :to="{ name: 'self-page', params: { id: tweet.User.id } }"
              >
                <span class="orange"> @{{ tweet.User.account }}</span>
              </router-link>
            </div>
            <div class="content">
              {{ item.comment }}
            </div>
          </div>
        </div>
      </div>
    </main>
    <PopularList />
    <ReplyModal :currentReplyingTweet="tweet" @createReply="createReply" />
  </div>
</template>

<style lang="scss" scoped>
main {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .tweet {
    padding: {
      left: 15px;
      right: 15px;
    }
    hr {
      background-color: $border;
      opacity: 1;
    }
    .tweet-header {
      display: flex;
      margin: 20px 0;
      #user {
        margin: {
          left: 10px;
          top: auto;
          bottom: auto;
        }
        a {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: black;
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
      background-color: $border;
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
import { likesAPI } from "@/apis/like";
import type { Like, Tweet } from "env";
import { useCurrentUser } from "@/stores/currentUser";
import dayjs from "dayjs";
import router from "@/router";
import * as bootstrap from "bootstrap";
import { swalAlert } from "@/utils/helper";

interface newTweet {
  TweetId: number;
  content: string;
}

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser();
    const tweet: Tweet = reactive({
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
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    //get corresponding tweet of this page & assign to tweet
    onMounted(async () => {
      try {
        const { id } = useRoute().params;
        const { data } = await tweetsAPI.getTweet({ id: Number(id) });
        data.Likes.forEach(function (item: Like) {
          if (item.userId === currentUser.info.id) data.isLike = true;
        });
        Object.assign(tweet, data);
      } catch (error) {
        console.log(error);
      }
    });
    //add like and render if success
    async function addLike(tweetId: number) {
      try {
        const payLoad = { id: tweetId };
        const { data } = await likesAPI.addLike(payLoad);
        if (data.status === "success") {
          tweet.isLike = true;
          tweet.Likes.push(data.like);
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //delete like and render if success
    async function deleteLike(tweetId: number) {
      try {
        const payLoad = { id: tweetId };
        const { data } = await likesAPI.deleteLike(payLoad);
        if (data.status === "success") {
          tweet.isLike = false;
          tweet.Likes.forEach(function (item: Like) {
            if (item.userId === currentUser.info.id) {
              tweet.Likes.splice(tweet.Likes.indexOf(item), 1);
            }
          });
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
    //create reply
    async function createReply(payLoad: newTweet) {
      try {
        const replyModal = document.getElementById("replyModal") as Element;
        const modal = bootstrap.Modal.getInstance(replyModal);
        const { data } = await tweetsAPI.createReply(payLoad);
        //render new reply on page and close modal if success
        if (data.status === "success" && modal) {
          tweet.Replies.unshift({
            ...data.reply,
            User: {
              account: currentUser.info.account,
              name: currentUser.info.name,
              avatar: currentUser.info.avatar,
            },
          });
          modal.hide();
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      tweet,
      currentUser,
      dateFromNow,
      formattedDate,
      goBackToPrevPage,
      createReply,
      addLike,
      deleteLike,
    };
  },
  components: {
    SideBar,
    PopularList,
    ReplyModal,
  },
});
</script>
