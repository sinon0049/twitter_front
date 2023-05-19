<template>
  <div class="tweet-container" @click="handleClickEvent">
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
          >
            <font-awesome-icon
              :icon="['far', 'comment']"
              class="cursor-pointer comment on-reply"
              style="color: #657786"
              :data-id="item.id"
            />
            <span>{{ item.Replies.length }}</span>
          </div>
          <div>
            <font-awesome-icon
              :icon="['far', 'heart']"
              class="cursor-pointer add-like"
              style="color: #657786"
              :data-id="item.id"
              v-if="!item.isLike"
            />
            <font-awesome-icon
              :icon="['far', 'heart']"
              class="cursor-pointer delete-like"
              style="color: #e0245e"
              :data-id="item.id"
              v-else
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
import { likesAPI } from "@/apis/like";
import type { PropType } from "vue";
import type { Tweet } from "env";

export default defineComponent({
  props: {
    tweetList: {
      type: Array as PropType<Tweet[]>,
    },
  },
  setup(props, { emit }) {
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }
    //add like and call parent component for rendering if success
    async function addLike(tweetId: number) {
      try {
        const payLoad = { id: tweetId };
        const { data } = await likesAPI.addLike(payLoad);
        if (data.status === "success")
          emit("handleToggleLike", "add", tweetId, data);
      } catch (error) {
        console.log(error);
      }
    }
    //delete like and call parent component for rendering if success
    async function deleteLike(tweetId: number) {
      try {
        const payLoad = { id: tweetId };
        const { data } = await likesAPI.deleteLike(payLoad);
        if (data.status === "success")
          emit("handleToggleLike", "delete", tweetId, data);
      } catch (error) {
        console.log(error);
      }
    }
    //event listener for adding like, deleting like and opening reply modal
    function handleClickEvent(e: Event) {
      const target = e.target as Element;
      if (target.classList.contains("add-like")) {
        const tweetId = Number(target.getAttribute("data-id"));
        return addLike(tweetId);
      }
      if (target.classList.contains("delete-like")) {
        const tweetId = Number(target.getAttribute("data-id"));
        return deleteLike(tweetId);
      }
      if (target.classList.contains("on-reply")) {
        const tweetId = Number(target.getAttribute("data-id"));
        return emit("onReply", tweetId);
      }
    }
    return {
      dateFromNow,
      handleClickEvent,
    };
  },
});
</script>
