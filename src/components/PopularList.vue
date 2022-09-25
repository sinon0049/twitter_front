<template>
  <div class="popular-container">
    <div class="popular-head">
      <span>Popular</span>
    </div>
    <div class="popular-card" v-for="item in followingList" :key="item.id">
      <img
        src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
        alt=""
      />
      <div class="user-name">
        <span class="name bold">{{ item.name }}</span>
        <span class="account">@{{ item.account }}</span>
      </div>
      <button class="btn-orange cursor-pointer" v-if="item.isFollower">
        正在跟隨
      </button>
      <button class="btn-white cursor-pointer" v-else>跟隨</button>
    </div>
    <div class="popular-tail cursor-pointer">
      <span>顯示更多</span>
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
    span {
      line-height: 45px;
      margin-left: 15px;
      color: #ff6600;
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
import { followingsAPI } from "@/apis/following";
import { defineComponent, onMounted, reactive } from "vue";

interface followingData {
  id: number;
  name: string;
  account: string;
  avatar: string;
  isFollower: boolean;
}

export default defineComponent({
  setup() {
    const followingList: followingData[] = reactive([]);
    onMounted(async () => {
      try {
        const { data } = await followingsAPI.getFollowingList();
        data.forEach(function (item: followingData) {
          followingList.push(item);
        });
      } catch (error) {
        console.log(error);
      }
    });
    return {
      followingList,
    };
  },
});
</script>
