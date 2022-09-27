<template>
  <div class="tweet-container">
    <div class="tweet-card" v-for="item in replyList" :key="item.id">
      <img :src="item.User.avatar" alt="" class="cursor-pointer" />
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <span class="bold">{{ item.User.name }}</span>
          <span class="light">@{{ item.User.account }}</span>
          <span class="light">．{{ dateFromNow(item.createdAt) }}</span>
        </div>
        <div class="reply-target">
          <span class="light">回覆給</span>
          <span class="orange"> @{{ item.Tweet.User.account }}</span>
        </div>
        <div class="content">
          <router-link :to="{ name: 'reply-page', params: { id: item.id } }">
            {{ item.comment }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tweet-content {
  .reply-target {
    font-size: 13px;
  }
  .content {
    margin-top: 5px;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  props: ["replyList"],
  setup() {
    //get time from now
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }
    return {
      dateFromNow,
    };
  },
});
</script>
