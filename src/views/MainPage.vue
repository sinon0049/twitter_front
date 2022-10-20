<template>
  <div class="page-container">
    <SideBar />
    <div class="main-container">
      <div class="main-header">
        <span>首頁</span>
      </div>
      <div id="tweet-input">
        <img :src="currentUser.info.avatar" alt="..." class="avatar" />
        <textarea
          name="newTweet"
          cols="30"
          rows="5"
          placeholder="有什麼新鮮事?"
          maxlength="140"
          v-model="tweetContent"
        ></textarea>
        <button
          class="btn-orange cursor-pointer"
          @click.stop.prevent="createTweet"
        >
          推文
        </button>
      </div>
      <TweetList :tweetList="tweetList" @onReply="onReply" />
    </div>
    <PopularList />
    <ReplyModal
      :currentReplyingTweet="currentReplyingTweet"
      @createReply="createReply"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  #tweet-input {
    position: relative;
    border-bottom: 10px solid #e6ecf0;
    display: flex;
    height: 200px;
    img {
      width: 50px;
      height: 50px;
      margin: {
        top: 10px;
        left: 15px;
      }
    }
    textarea {
      width: 80%;
      border: 0;
      border-radius: 5px;
      height: 60%;
      margin: {
        top: 2%;
        left: 3%;
        right: 3%;
      }
    }
    button {
      width: 70px;
      height: 40px;
      border-radius: 20px;
      border: none;
      position: absolute;
      bottom: 5%;
      right: 5%;
    }
  }
}
.close {
  transform: scale(1, 0);
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import SideBar from "../components/SideBar.vue";
import PopularList from "../components/PopularList.vue";
import ReplyModal from "../components/ReplyModal.vue";
import TweetList from "../components/TweetList.vue";
import { tweetsAPI } from "@/apis/tweet";
import { useCurrentUser } from "@/stores/currentUser";
import type { tweet, like } from "env";
import { swalAlert } from "@/utils/helper";
import * as bootstrap from "bootstrap";

interface newTweet {
  TweetId: number;
  content: string;
}

export default defineComponent({
  setup() {
    const tweetContent = ref("");
    const tweetComment = ref("");
    const tweetList: tweet[] = reactive([]);
    const currentUser = useCurrentUser();
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
      isLike: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    //assign clicked tweet to currentReplyingTweet for modal usage
    function onReply(id: number) {
      tweetList.forEach((item) => {
        if (item.id === id) {
          Object.assign(currentReplyingTweet, item);
        }
      });
    }
    //create new tweet
    async function createTweet() {
      try {
        if (!tweetContent.value.trim()) {
          swalAlert.errorMsg("Please enter your tweet.");
          return;
        }
        const payLoad = { description: tweetContent.value };
        const { data } = await tweetsAPI.createTweet(payLoad);
        //render new tweet if success
        if(data.status === 'success') {
          tweetList.unshift({
            ...data.tweet,
            User: {
              id: currentUser.info.id,
              name: currentUser.info.name,
              account: currentUser.info.account,
              avatar: currentUser.info.avatar,
              cover: currentUser.info.cover,
            },
            Replies: [],
            Likes: [],
          });
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //create reply
    async function createReply(payLoad: newTweet) {
      try {
        const replyModal = document.getElementById("replyModal") as Element;
        const modal = bootstrap.Modal.getInstance(replyModal);
        const { data } = await tweetsAPI.createReply(payLoad);
        //render new reply on page and close modal if success
        if (data.status === "success" && modal) {
          currentReplyingTweet.Replies.unshift({
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

    //get tweet list when mounted
    onMounted(async () => {
      try {
        const { data } = await tweetsAPI.getAllTweets();
        data.forEach(function (item: tweet) {
          item.Likes.forEach(function (like: like) {
            if (like.userId === currentUser.info.id) item.isLike = true;
          });
          if (!item.isLike) item.isLike = false;
          tweetList.push(item);
        });
      } catch (error) {
        console.log(error);
      }
    });

    return {
      tweetList,
      tweetContent,
      currentUser,
      currentReplyingTweet,
      tweetComment,
      onReply,
      createTweet,
      createReply,
    };
  },
  components: {
    SideBar,
    PopularList,
    ReplyModal,
    TweetList,
  },
});
</script>
