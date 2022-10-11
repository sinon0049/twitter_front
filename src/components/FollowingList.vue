<template>
  <div class="tweet-container">
    <div
      class="tweet-card"
      v-for="item in followshipList.Followings"
      :key="item.id"
    >
      <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <span class="bold">{{ item.name }}</span>
          <span class="light">@{{ item.account }}</span>
          <button class="btn-orange" v-if="item.isFollowing && isExactUser">
            正在跟隨
          </button>
          <button
            class="btn-white"
            v-else-if="!item.isFollowing && isExactUser"
          >
            跟隨
          </button>
        </div>
        <div class="content">
          <span>{{ item.introduction }}</span>
        </div>
      </div>
    </div>
    <div v-if="isExactUser">
      <div
        class="tweet-card"
        v-for="item in followshipList.unfollowings"
        :key="item.id"
      >
        <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
        <div class="tweet-content">
          <div class="name cursor-pointer">
            <span class="bold">{{ item.name }}</span>
            <span class="light">@{{ item.account }}</span>
            <button class="btn-orange" v-if="item.isFollowing">正在跟隨</button>
            <button class="btn-white" v-else>跟隨</button>
          </div>
          <div class="content">
            <span>{{ item.introduction }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCurrentUser } from "../stores/currentUser";
import dayjs from "dayjs";

export default defineComponent({
  props: ["followshipList"],
  setup() {
    const currentUser = useCurrentUser();
    const isExactUser = ref(false);
    const route = useRoute();
    onMounted(() => {
      if (Number(route.params.id) === currentUser.info.id)
        isExactUser.value = true;
    });
    //get time from now
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }
    return {
      dateFromNow,
      isExactUser,
    };
  },
});
</script>

<style lang="scss">
.tweet-container {
  .tweet-card {
    .tweet-content {
      .name {
        button {
          width: 90px;
          height: 30px;
          border-radius: 15px;
          float: right;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
