<template>
  <div class="tweet-container">
    <div
      class="tweet-card"
      v-for="item in followshipList.Followers"
      :key="item.id"
    >
      <router-link :to="{ name: 'self-page', params: { id: item.id } }">
        <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
      </router-link>
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <router-link :to="{ name: 'self-page', params: { id: item.id } }">
            <span class="bold">{{ item.name }}</span>
            <span class="light">@{{ item.account }}</span>
          </router-link>
        </div>
        <div class="content">
          <span>{{ item.introduction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  props: ["followshipList"],
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
