<template>
  <div class="tweet-container">
    <div class="tweet-card" v-for="item in tweetList" :key="item.id">
      <img :src="item.User.avatar" alt="" />
      <div class="tweet-content">
        <div class="user-info">
          <span>{{ item.User.name }}</span>
          <span class="light">&nbsp;@{{ item.User.name }}</span>
          <span class="light">&nbsp;．{{ dateFromNow(item.createdAt) }}</span>
        </div>
        <span>{{ item.description }}</span>
      </div>
      <font-awesome-icon
        icon="x"
        class="delete light cursor-pointer"
        size="sm"
        @click.stop.prevent="deleteTweet(item.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { adminTweetsAPI } from "@/apis/admin/tweet";
import type { tweet } from "env";
import dayjs from "dayjs";
import { swalAlert } from "@/utils/helper";

export default defineComponent({
  setup() {
    const tweetList: tweet[] = reactive([]);

    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }

    async function deleteTweet(tweetId: number) {
      try {
        const { data } = await adminTweetsAPI.deleteTweet({ id: tweetId });
        if (data.status === "success") {
          tweetList.forEach(function (item, index, tweetList) {
            if (item.id === tweetId) tweetList.splice(index, 1);
          });
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(async () => {
      try {
        const { data } = await adminTweetsAPI.getAllTweets();
        data.forEach((item: tweet) => tweetList.push(item));
      } catch (error) {
        console.log(error);
      }
    });

    return {
      tweetList,
      dateFromNow,
      deleteTweet,
    };
  },
});
</script>

<style lang="scss" scoped>
.tweet-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .tweet-card {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding-left: 10px;
    border: 1px solid #e6ecf0;
    img {
      height: 50px;
      width: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
    .tweet-content {
      display: flex;
      flex-direction: column;
      margin-left: 2%;
      justify-content: space-around;
      .user-info {
        display: flex;
        flex-direction: row;
      }
    }
    .delete {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
