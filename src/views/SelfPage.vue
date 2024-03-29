<template>
  <div class="page-container">
    <SideBar />
    <main>
      <LoadingSpinner v-if="isProcessing" />
      <div class="loaded" v-else>
        <header>
          <font-awesome-icon
            icon="arrow-left"
            class="cursor-pointer"
            size="lg"
            @click="goBackToPrevPage"
          />
          <span>&nbsp;&nbsp;{{ detailOfUser.name }}</span>
        </header>
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
              @click.stop.prevent="
                storeFollowings.addFollowing(detailOfUser.id)
              "
            >
              跟隨
            </button>
          </div>
          <EditModal
            :currentReplyingTweet="currentReplyingTweet"
            @handleUpdateUser="handleUpdateUser"
          />
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
            :class="{ selected: listStatus === SelfMenu.tweet }"
            @click.stop.prevent="changeList(SelfMenu.tweet)"
            >推文</span
          >
          <span
            class="cursor-pointer"
            :class="{ selected: listStatus === SelfMenu.reply }"
            @click.stop.prevent="changeList(SelfMenu.reply)"
            >推文及回覆</span
          >
          <span
            class="cursor-pointer"
            :class="{ selected: listStatus === SelfMenu.like }"
            @click.stop.prevent="changeList(SelfMenu.like)"
            >喜歡的內容</span
          >
        </div>
        <TweetList
          :tweetList="tweetList"
          @onReply="onReply"
          @handleToggleLike="handleToggleLike"
          v-if="listStatus === SelfMenu.tweet"
        />
        <ReplyList
          :replyList="replyList"
          @onReply="onReply"
          v-else-if="listStatus === SelfMenu.reply"
        />
        <TweetList
          :tweetList="likeList"
          @onReply="onReply"
          @handleToggleLike="handleToggleLike"
          v-else
        />
      </div>
    </main>
    <PopularList />
    <ReplyModal
      :currentReplyingTweet="currentReplyingTweet"
      @createReply="createReply"
    />
  </div>
</template>

<style lang="scss" scoped>
main {
  .cover-container {
    position: relative;
    height: 30vh;
    text-align: right;
    img {
      object-fit: cover;
    }
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
    border-bottom: 1px solid $border;
    span {
      line-height: 30px;
    }
    .selected {
      color: $orange;
      border-bottom: 1px solid $orange;
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
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { usersAPI } from "@/apis/user";
import { tweetsAPI } from "@/apis/tweet";
import { repliesAPI } from "@/apis/reply";
import { useCurrentUser } from "@/stores/currentUser";
import { useStoreFollowings } from "@/stores/followship";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import type {
  Reply,
  Tweet,
  UserSocialStatus,
  Like,
  ResponseOfAddingLike,
  UserUpdateResponse,
  NewReply,
} from "env";
import { likesAPI } from "@/apis/like";
import * as bootstrap from "bootstrap";
import { swalAlert } from "@/utils/helper";

export default defineComponent({
  setup() {
    enum SelfMenu {
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
    const listStatus = ref(SelfMenu.tweet);
    const tweetList: Tweet[] = reactive([]);
    const likeList: Tweet[] = reactive([]);
    const replyList: Reply[] = reactive([]);
    const currentReplyingTweet: Tweet = reactive({
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
    const detailOfUser: UserSocialStatus = reactive({
      id: -1,
      name: "",
      account: "",
      introduction: "",
      avatar: "",
      cover: "",
      Followings: [],
      Followers: [],
      Tweets: [],
    });
    const isProcessing = ref(true);
    //get all lists and user info when mounted and assign them to refs and reactives
    async function loadUser(userId: number) {
      try {
        isProcessing.value = true;
        //clear list
        tweetList.splice(0, tweetList.length);
        likeList.splice(0, likeList.length);
        replyList.splice(0, replyList.length);
        //get data via api
        const payLoad = { id: userId };
        const [UserSocialStatus, tweetsOfUser, replyOfUser, likeOfUser] =
          await Promise.all([
            usersAPI.getDetail(payLoad),
            tweetsAPI.getTweetOfSelectedUser(payLoad),
            repliesAPI.getReplyOfSelectedUser(payLoad),
            likesAPI.getLike(payLoad),
          ]);
        isExactUser.value = userId === currentUser.info.id;
        storeFollowings.visitSelfPage(userId);
        Object.assign(detailOfUser, UserSocialStatus.data);
        //push data into list
        tweetsOfUser.data.forEach(function (item: Tweet) {
          item.Likes.forEach(function (like: Like) {
            if (like.userId === currentUser.info.id) item.isLike = true;
          });
          if (!item.isLike) item.isLike = false;
          tweetList.push(item);
        });
        likeOfUser.data.forEach(function (item: Like) {
          likeList.push({
            ...item.Tweet,
            isLike: true,
          });
        });
        replyOfUser.data.forEach(function (item: Reply) {
          replyList.push(item);
        });
        isProcessing.value = false;
      } catch (error) {
        console.log(error);
      }
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
    //modify tweetList when successfully add/delete like for rendering
    function handleToggleLike(
      action: string,
      tweetId: number,
      resData: ResponseOfAddingLike
    ) {
      if (action === "add") {
        tweetList.forEach((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLike = true;
            tweet.Likes.push(resData.like);
            swalAlert.successMsg(resData.message);
          }
        });
        likeList.forEach((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLike = true;
            tweet.Likes.push(resData.like);
            swalAlert.successMsg(resData.message);
          }
        });
      }
      if (action === "delete") {
        tweetList.forEach((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLike = false;
            tweet.Likes.forEach(function (item: Like) {
              if (item.userId === currentUser.info.id) {
                tweet.Likes.splice(tweet.Likes.indexOf(item), 1);
              }
            });
          }
        });
        likeList.forEach((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLike = false;
            tweet.Likes.forEach(function (item: Like) {
              if (item.userId === currentUser.info.id) {
                tweet.Likes.splice(tweet.Likes.indexOf(item), 1);
              }
            });
          }
        });
        swalAlert.successMsg(resData.message);
      }
    }
    //update detailOfUser when successfully updated
    function handleUpdateUser(data: UserUpdateResponse) {
      detailOfUser.avatar = data.avatar;
      detailOfUser.cover = data.cover;
      detailOfUser.name = data.name;
      detailOfUser.introduction = data.introduction;
      return swalAlert.successMsg(data.message);
    }
    //create reply
    async function createReply(payLoad: NewReply) {
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
          likeList.forEach(function (item: Tweet) {
            if (item.id === payLoad.TweetId) {
              item.Replies.unshift({
                ...data.reply,
                User: {
                  account: currentUser.info.account,
                  name: currentUser.info.name,
                  avatar: currentUser.info.avatar,
                },
              });
            }
          });
          modal.hide();
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //change status of list
    function changeList(status: SelfMenu) {
      listStatus.value = status;
    }
    //onMounted action
    onMounted(() => {
      loadUser(Number(route.params.id));
    });
    //onBeforeRouteUpdate action
    onBeforeRouteUpdate((to) => {
      loadUser(Number(to.params.id));
    });

    return {
      SelfMenu,
      listStatus,
      detailOfUser,
      tweetList,
      likeList,
      replyList,
      currentUser,
      storeFollowings,
      currentReplyingTweet,
      isExactUser,
      isProcessing,
      goBackToPrevPage,
      changeList,
      onReply,
      createReply,
      handleToggleLike,
      handleUpdateUser,
    };
  },
  components: {
    SideBar,
    PopularList,
    TweetList,
    ReplyModal,
    EditModal,
    ReplyList,
    LoadingSpinner,
  },
});
</script>
