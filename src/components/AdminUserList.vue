<template>
  <div class="user-container">
    <div class="user-card" v-for="item in userList" :key="item.id">
      <div class="image-container">
        <img :src="item.cover" alt="" class="cover" />
        <img :src="item.avatar" alt="" class="avatar" />
      </div>
      <div class="user-info">
        <span class="bold">{{ item.name }}</span>
        <span class="light">{{ item.account }}</span>
        <div class="tweet-count">
          <font-awesome-icon
            :icon="['far', 'comment']"
            size="lg"
            class="light"
          />
          <span>{{ item.Tweets.length }}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <font-awesome-icon :icon="['far', 'heart']" size="lg" class="light" />
          <span>{{ item.LikeCount }}</span>
        </div>
        <div class="follow-count">
          <span>{{ item.Followings.length }}&nbsp;位</span>
          <span class="light">跟隨中&nbsp;&nbsp;&nbsp;</span>
          <span>{{ item.Followers.length }}&nbsp;位</span>
          <span class="light">追隨者</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-container {
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 300px;
  row-gap: 10px;
  column-gap: 10px;
  padding: {
    top: 10px;
    left: 10px;
    right: 10px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: $scrollbar-thumb;
    border-radius: 3px;
  }
  .user-card {
    border-radius: 10px;
    background-color: $border;
    .image-container {
      height: 50%;
      position: relative;
      .cover {
        height: 80%;
        width: 100%;
        border-radius: 10px 10px 0 0;
      }
      .avatar {
        width: 100px;
        height: 100px;
        z-index: 10;
        border-radius: 50%;
        border: 2px solid white;
        position: absolute;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
        background-color: white;
      }
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .tweet-count {
        margin: 5% auto;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { adminAPI } from "@/apis/admin/user";
import type { userDetail } from "env";

export default defineComponent({
  setup() {
    const userList: userDetail[] = reactive([]);
    onMounted(async () => {
      const { data } = await adminAPI.getAllUsers();
      data.forEach((item: userDetail) => {
        let LikeCount = 0;
        item.Tweets.forEach((tweet) => {
          LikeCount += tweet.Likes.length;
        });
        userList.push({
          ...item,
          LikeCount,
        });
      });
    });

    return {
      userList,
    };
  },
});
</script>
