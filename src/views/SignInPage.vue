<template>
  <div class="sign-container">
    <img
      src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
      alt="..."
    />
    <h4>登入Alphitter</h4>
    <div class="input-wrapper">
      <label for="account">帳號</label>
      <input type="text" id="account" v-model="signInData.account" />
    </div>
    <div class="input-wrapper">
      <label for="password">密碼</label>
      <input
        type="password"
        id="password"
        v-model="signInData.password"
        @keyup.enter="signIn"
      />
    </div>
    <button
      class="btn-orange cursor-pointer"
      @click.stop.prevent="signIn"
    >
      登入
    </button>
    <div class="options-container">
      <router-link to="/signup" class="link cursor-pointer"
        >註冊Alphitter</router-link
      >
      <span>‧</span>
      <router-link to="/admin/signin" class="link cursor-pointer"
        >後台登入</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { usersAPI } from "../apis/user";
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
        const { data } = await usersAPI.signIn(signInData);
        const token: string = data.token;
        if (token) {
          localStorage.setItem("token", token);
          currentUser.storeCurrentUser(data);
          router.push({
            name: "main",
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
