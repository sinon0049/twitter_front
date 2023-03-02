<template>
  <aside>
    <!-- side bar for user -->
    <div v-if="currentUser.info.role === 'user'">
      <router-link to="/main" class="main">
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
        <div
          class="btn-group cursor-pointer"
          id="sign-out"
          @click.stop.prevent="signOut"
        >
          <font-awesome-icon icon="arrow-right-from-bracket" size="lg" />
          <span>登出</span>
        </div>
      </div>
    </div>
    <!-- side bar for admin -->
    <div v-else>
      <router-link to="/admin/main" class="main">
        <img
          src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
          alt="..."
        />
      </router-link>
      <div class="btn-container">
        <div
          class="btn-group cursor-pointer"
          @click.stop.prevent="changeList('tweet')"
          :class="{ orange: listStatus === 'tweet' }"
        >
          <font-awesome-icon icon="home" size="lg" class="home" />
          <span>推文清單</span>
        </div>
        <div
          class="btn-group cursor-pointer"
          @click.stop.prevent="changeList('user')"
          :class="{ orange: listStatus === 'user' }"
        >
          <font-awesome-icon :icon="['far', 'user']" size="lg" class="user" />
          <span>使用者列表</span>
        </div>
        <div
          class="btn-group cursor-pointer"
          id="sign-out"
          @click.stop.prevent="signOut"
        >
          <font-awesome-icon icon="arrow-right-from-bracket" size="lg" />
          <span>登出</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  aside {
    background-color: $input-background;
    z-index: 999;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 50px;
    div {
      width: 100%;
      .btn-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .btn-group {
          color: black;
          margin: 0;
          display: block;
          width: fit-content;
        }
      }
      .main,
      span,
      #tweet {
        display: none;
      }
    }
  }
}

@media screen and (min-width: 960px) {
  #btn-popular {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  aside {
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
      #sign-out {
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
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "@/stores/currentUser";
import { swalAlert } from "@/utils/helper";

export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter();
    const currentUser = useCurrentUser();
    const listStatus = ref("tweet");
    //delete token in local storage when logged out
    function signOut() {
      localStorage.removeItem("token");
      router.push({
        name: "sign-in",
      });
      swalAlert.successMsg("Sign out successfully.");
    }
    //change list of main page (admin main page only)
    function changeList(status: string) {
      listStatus.value = status;
      emit("changeList", status);
    }
    return {
      signOut,
      changeList,
      currentUser,
      listStatus,
    };
  },
});
</script>
