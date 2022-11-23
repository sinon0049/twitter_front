<template>
  <div class="tweet-container">
    <div class="tweet-card" v-for="item in followshipList" :key="item.id">
      <router-link :to="{ name: 'self-page', params: { id: item.id } }">
        <img :src="item.Follower.avatar" alt="" class="cursor-pointer avatar" />
      </router-link>
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <router-link :to="{ name: 'self-page', params: { id: item.id } }">
            <span class="bold">{{ item.Follower.name }}</span>
            <span class="light">@{{ item.Follower.account }}</span>
          </router-link>
        </div>
        <div class="content">
          <span>{{ item.Follower.introduction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["followshipList"],
});
</script>
