<template>
  <div class="tweet-container">
    <!-- if you are watching your own followings -->
    <div v-if="isExactUser">
      <div
        class="tweet-card"
        v-for="item in storeFollowings.lists.Followings"
        :key="item.id"
      >
        <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
        <div class="tweet-content">
          <div class="name cursor-pointer">
            <span class="bold">{{ item.name }}</span>
            <span class="light">@{{ item.account }}</span>
            <button
              class="btn-orange"
              @click.stop.prevent="storeFollowings.deleteFollowing(item.id)"
            >
              正在跟隨
            </button>
          </div>
          <div class="content">
            <span>{{ item.introduction }}</span>
          </div>
        </div>
      </div>
      <div>
        <div
          class="tweet-card"
          v-for="item in storeFollowings.lists.unfollowings"
          :key="item.id"
        >
          <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
          <div class="tweet-content">
            <div class="name cursor-pointer">
              <span class="bold">{{ item.name }}</span>
              <span class="light">@{{ item.account }}</span>

              <button
                class="btn-white"
                @click.stop.prevent="storeFollowings.addFollowing(item.id)"
              >
                跟隨
              </button>
            </div>
            <div class="content">
              <span v-if="item.introduction">{{ item.introduction }}</span>
              <span v-else class="light">no introduction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- if you are NOT watching your own followings -->
    <div v-else>
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
          </div>
          <div class="content">
            <span v-if="item.introduction">{{ item.introduction }}</span>
            <span v-else class="light">no introduction</span>
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
import { useStoreFollowings } from "../stores/followship";
import dayjs from "dayjs";

export default defineComponent({
  props: ["followshipList"],
  setup() {
    const currentUser = useCurrentUser();
    const storeFollowings = useStoreFollowings();
    //check if user is watch his/her own following list
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
      storeFollowings,
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
