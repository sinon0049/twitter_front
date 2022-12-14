<template>
  <div class="container">
    <img
      src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
      alt="..."
    />
    <h4>後台登入</h4>
    <div class="input">
      <label for="account">帳號</label>
      <input type="text" id="account" v-model="signInData.account" />
    </div>
    <div class="input">
      <label for="password">密碼</label>
      <input
        type="password"
        id="password"
        v-model="signInData.password"
        @keyup.enter="signIn"
      />
    </div>
    <button
      id="login"
      class="btn-orange cursor-pointer"
      @click.stop.prevent="signIn"
    >
      登入
    </button>
    <div id="options-container">
      <router-link to="/signup" class="link cursor-pointer"
        >註冊Alphitter</router-link
      >
      <span>‧</span>
      <router-link to="/signin" class="link cursor-pointer"
        >使用者登入</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  position: relative;
  .input {
    display: flex;
    flex-direction: column;
    background-color: $input-background;
    margin-top: 20px;
    width: 80%;
    label {
      position: relative;
      left: 5px;
      top: 2px;
    }
    input {
      line-height: 20px;
      background-color: $input-background;
      border: {
        top: 0;
        left: 0;
        right: 0;
      }
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
  button {
    font-weight: bold;
    font-size: 16px;
  }
  #login {
    margin: 30px 0 15px 0;
    width: 80%;
    border-radius: 20px;
    height: 40px;
  }
  #options-container {
    position: absolute;
    right: 50px;
    bottom: 20px;
    span {
      display: inline-block;
      width: 15px;
      text-align: center;
      color: $link;
      background-color: white;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { adminAPI } from "../apis/admin/user";
import { useCurrentUser } from "@/stores/currentUser";
import { swalAlert } from "@/utils/helper";

export default defineComponent({
  setup() {
    const signInData = reactive({
      account: "",
      password: "",
    });
    const router = useRouter();
    const currentUser = useCurrentUser();
    //sign in
    async function signIn() {
      try {
        if (!signInData.account.trim() || !signInData.password.trim()) {
          swalAlert.errorMsg("Please enter your account and password.");
          return;
        }
        const { data } = await adminAPI.signIn(signInData);
        const token: string = data.token;
        if (token) {
          localStorage.setItem("token", token);
          currentUser.storeCurrentUser(data);
          router.push({
            name: "admin-main",
          });
          swalAlert.successMsg("Sign in successfully.");
        }
      } catch (error) {
        swalAlert.errorMsg("Incorrect account or password.");
      }
    }

    return {
      signInData,
      signIn,
    };
  },
});
</script>
