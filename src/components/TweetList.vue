<template>
  <div class="tweet-container">
    <div class="tweet-card" v-for="item in tweetList" :key="item.id">
      <router-link :to="{ name: 'self-page', params: { id: item.User.id } }">
        <img :src="item.User.avatar" alt="" class="cursor-pointer avatar" />
      </router-link>
      <div class="tweet-content">
        <div class="name">
          <router-link
            :to="{ name: 'self-page', params: { id: item.User.id } }"
          >
            <span class="bold cursor-pointer">{{ item.User.name }}</span>
            <span class="light cursor-pointer">@{{ item.User.account }}</span>
          </router-link>
          <span class="light">．{{ dateFromNow(item.createdAt) }}</span>
        </div>
        <div class="content">
          <router-link :to="{ name: 'reply-page', params: { id: item.id } }">
            {{ item.description }}
          </router-link>
        </div>
        <div class="icon">
          <div
            class="cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#replyModal"
            @click.stop.prevent="$emit('onReply', item.id)"
          >
            <font-awesome-icon
              :icon="['far', 'comment']"
              class="fa-icon"
              style="color: #657786"
            />
            <span>{{ item.Replies.length }}</span>
          </div>
          <div>
            <font-awesome-icon
              :icon="['far', 'heart']"
              class="fa-icon cursor-pointer"
              style="color: #657786"
            />
            <span>{{ item.Likes.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  props: ["tweetList"],
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
