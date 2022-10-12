<template>
  <div class="sidebar-container">
    <router-link to="/main">
      <img
        src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
        alt="..."
      />
    </router-link>
    <div class="btn-container">
      <router-link :to="{ name: 'main' }" class="btn-group cursor-pointer">
        <font-awesome-icon icon="home" size="lg" class="home" />
        <span>首頁</span>
      </router-link>
      <router-link
        :to="{ name: 'self-page', params: { id: currentUser.info.id } }"
        class="btn-group cursor-pointer"
      >
        <font-awesome-icon :icon="['far', 'user']" size="lg" class="user" />
        <span>個人資料</span>
      </router-link>
      <router-link
        :to="{ name: 'follow-page', params: { id: currentUser.info.id } }"
        class="btn-group cursor-pointer"
        id="btn-popular"
      >
        <font-awesome-icon icon="people-arrows" size="lg" />
        <span>Popular list</span>
      </router-link>
      <router-link :to="{ name: 'setting' }" class="btn-group cursor-pointer">
        <font-awesome-icon icon="gear" size="lg" />
        <span>設定</span>
      </router-link>
      <button class="btn-orange cursor-pointer" id="tweet">推文</button>
      <div
        class="btn-group cursor-pointer"
        id="logout"
        @click.stop.prevent="logout"
      >
        <font-awesome-icon icon="arrow-right-from-bracket" size="lg" />
        <span>登出</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (min-width: 960px) {
  #btn-popular {
    display: none;
  }
}
.sidebar-container {
  width: 25%;
  max-width: 200px;
  position: relative;
  height: 100%;
  margin: {
    right: 3%;
  }
  span {
    font-weight: bold;
  }
  .btn-container {
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .btn-group {
      display: grid;
      grid-template-columns: 45px 1fr;
      height: 25px;
      line-height: 25px;
      margin-bottom: 15px;
      text-decoration: none;
      color: black;
    }
    #logout {
      position: absolute;
      bottom: 10px;
    }
    #tweet {
      border: 0;
      height: 35px;
      width: 100%;
      border-radius: 17.5px;
    }
  }
  img {
    margin-top: 10px;
    width: 30px;
    height: 30px;
    margin-bottom: 5vh;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "@/stores/currentUser";

export default defineComponent({
  setup() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    //delete token in local storage when logged out
    function logout() {
      localStorage.removeItem("token");
      router.push({
        name: "login",
      });
    }

    return {
      logout,
      currentUser,
    };
  },
});
</script>
