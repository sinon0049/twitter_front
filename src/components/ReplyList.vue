<template>
  <div class="tweet-container">
    <div class="tweet-card" v-for="item in replyList" :key="item.id">
      <img :src="item.User.avatar" alt="" class="cursor-pointer avatar" />
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <span class="bold">{{ item.User.name }}</span>
          <span class="light">@{{ item.User.account }}</span>
          <span class="light">．{{ dateFromNow(item.createdAt) }}</span>
        </div>
        <div class="reply-target">
          <span class="light">回覆給</span>
          <router-link
            :to="{ name: 'self-page', params: { id: item.Tweet.User.id } }"
          >
            <span class="orange"> @{{ item.Tweet.User.account }}</span>
          </router-link>
        </div>
        <div class="content">
          <router-link
            :to="{
              name: 'reply-page',
              params: { id: item.Tweet.id },
              hash: `#${item.id}`,
            }"
          >
            {{ item.Tweet.description }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
import type { PropType } from "vue";
import type { Reply } from "env";

export default defineComponent({
  props: {
    replyList: {
      type: Array as PropType<Reply[]>,
    },
  },
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
