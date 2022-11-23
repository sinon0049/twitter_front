<template>
  <div class="tweet-container">
    <!-- if you are watching your own followings -->
    <div v-if="isExactUser" @click="handleToggleFollowing">
      <div
        class="tweet-card"
        v-for="item in storeFollowings.lists.Followings"
        :key="item.id"
      >
        <router-link :to="{ name: 'self-page', params: { id: item.id } }">
          <img
            :src="item.Following.avatar"
            alt=""
            class="cursor-pointer avatar"
          />
        </router-link>
        <div class="tweet-content">
          <div class="name cursor-pointer">
            <router-link :to="{ name: 'self-page', params: { id: item.id } }">
              <span class="bold">{{ item.Following.name }}</span>
              <span class="light">@{{ item.Following.account }}</span>
            </router-link>
            <button
              class="btn-orange delete-following"
              :data-id="item.Following.id"
            >
              正在跟隨
            </button>
          </div>
          <div class="content">
            <span v-if="item.Following.introduction">{{
              item.Following.introduction
            }}</span>
            <span v-else class="light">no introduction</span>
          </div>
        </div>
      </div>
      <div>
        <div
          class="tweet-card"
          v-for="item in storeFollowings.lists.Unfollowings"
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

              <button class="btn-white add-following" :data-id="item.id">
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
        <img
          :src="item.Following.avatar"
          alt=""
          class="cursor-pointer avatar"
        />
        <div class="tweet-content">
          <div class="name cursor-pointer">
            <span class="bold">{{ item.Following.name }}</span>
            <span class="light">@{{ item.Following.account }}</span>
          </div>
          <div class="content">
            <span v-if="item.Following.introduction">{{
              item.Following.introduction
            }}</span>
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
    //event handler for adding/deleting following
    function handleToggleFollowing(e: Event) {
      const target = e.target as HTMLButtonElement;
      const followingId = Number(target.dataset.id);
      if (target.classList.contains("add-following")) {
        return storeFollowings.addFollowing(followingId);
      }
      if (target.classList.contains("delete-following")) {
        return storeFollowings.deleteFollowing(followingId);
      }
    }
    //check if current user is watching his/her own self page
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
      handleToggleFollowing,
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
