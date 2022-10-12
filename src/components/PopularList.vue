<template>
  <div class="popular-container">
    <div class="popular-head">
      <span>Popular</span>
    </div>
    <div
      class="popular-card"
      v-for="item in storeFollowings.lists.Followings"
      :key="item.id"
    >
      <img
        src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
        alt=""
      />
      <div class="user-name">
        <span class="name bold">{{ item.name }}</span>
        <span class="account">@{{ item.account }}</span>
      </div>
      <button
        class="btn-orange cursor-pointer"
        @click.stop.prevent="storeFollowings.deleteFollowing(item.id)"
      >
        正在跟隨
      </button>
    </div>
    <div
      class="popular-card"
      v-for="item in storeFollowings.lists.unfollowings"
      :key="item.id"
    >
      <img
        src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
        alt=""
      />
      <div class="user-name">
        <span class="name bold">{{ item.name }}</span>
        <span class="account">@{{ item.account }}</span>
      </div>
      <button
        class="btn-white cursor-pointer"
        @click.stop.prevent="storeFollowings.addFollowing(item.id)"
      >
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
    border-top: 1px solid #e6ecf0;
    a {
      line-height: 45px;
      margin-left: 15px;
      color: #ff6600;
      text-decoration: none;
      font: {
        size: 15px;
        weight: bold;
      }
    }
  }
  .popular-card {
    border-top: 1px solid #dddddd;
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      margin-left: 15px;
    }
    .user-name {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .account {
        color: #657786;
      }
    }
    button {
      height: 35px;
      position: absolute;
      margin: {
        top: auto;
        bottom: auto;
      }
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

    return {
      currentUser,
      storeFollowings,
    };
  },
});
</script>
