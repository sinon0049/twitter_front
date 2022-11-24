<template>
  <div class="popular-container" @click="handleToggleFollowing">
    <div class="popular-head">
      <span>Popular</span>
    </div>
    <div
      class="popular-card"
      v-for="item in storeFollowings.lists.Followings"
      :key="item.id"
    >
      <router-link :to="{ name: 'self-page', params: { id: item.id } }">
        <img :src="item.Following.avatar" alt="" />
        <div class="user-name">
          <span class="name bold">{{ item.Following.name }}</span>
          <span class="light">@{{ item.Following.account }}</span>
        </div>
      </router-link>

      <button
        class="btn-orange cursor-pointer delete-following"
        :data-id="item.Following.id"
      >
        正在跟隨
      </button>
    </div>
    <div
      class="popular-card"
      v-for="item in storeFollowings.lists.Unfollowings"
      :key="item.id"
    >
      <router-link :to="{ name: 'self-page', params: { id: item.id } }">
        <img :src="item.avatar" alt="..." />
        <div class="user-name">
          <span class="name bold">{{ item.name }}</span>
          <span class="light">@{{ item.account }}</span>
        </div>
      </router-link>
      <button class="btn-white cursor-pointer add-following" :data-id="item.id">
        跟隨
      </button>
    </div>
    <div class="popular-tail cursor-pointer">
      <router-link
        :to="{ name: 'follow-page', params: { id: currentUser.info.id } }"
      >
        顯示更多
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
  .popular-container {
    display: none;
  }
}
.popular-container {
  margin: {
    left: 30px;
    top: 15px;
  }
  width: 25%;
  max-width: 350px;
  height: fit-content;
  border-radius: 14px;
  background-color: #f5f8fa;
  .popular-head {
    height: 45px;
    span {
      line-height: 45px;
      margin-left: 15px;
      font: {
        weight: bold;
        size: 18px;
      }
    }
  }
  .popular-tail {
    height: 45px;
    border-top: 1px solid $border;
    a {
      line-height: 45px;
      margin-left: 15px;
      color: $orange;
      text-decoration: none;
      font: {
        size: 15px;
        weight: bold;
      }
    }
  }
  .popular-card {
    border-top: 1px solid $border;
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 15px;
    }
    .user-name {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    button {
      height: 35px;
      position: absolute;
      right: 15px;
    }
    .btn-orange {
      width: 90px;
      height: 35px;
      border-radius: 100px;
    }
    .btn-white {
      width: 70px;
      height: 35px;
      border-radius: 20px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useCurrentUser } from "../stores/currentUser";
import { useStoreFollowings } from "../stores/followship";

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser();
    const storeFollowings = useStoreFollowings();

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

    return {
      currentUser,
      storeFollowings,
      handleToggleFollowing,
    };
  },
});
</script>
