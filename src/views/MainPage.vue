<template>
  <div class="page-container">
    <SideBar />
    <div class="main-container">
      <div class="main-header">
        <span>首頁</span>
      </div>
      <div id="tweet-input">
        <img :src="currentUser.info.avatar" alt="..." />
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
    <ReplyModal :currentReplyingTweet="currentReplyingTweet" />
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
      border-radius: 50%;
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
import type { tweet } from "env";

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
      },
      Replies: [],
      Likes: [],
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
        const payLoad = { description: tweetContent.value };
        await tweetsAPI.createTweet(payLoad);
      } catch (error) {
        console.log(error);
      }
    }

    //get tweet list when mounted
    onMounted(async () => {
      try {
        const { data } = await tweetsAPI.getAllTweets();
        data.forEach(function (item: tweet) {
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
