<template>
  <div class="sign-container">
    <img
      src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
      alt="..."
    />
    <h4>建立你的帳號</h4>
    <div class="input-wrapper">
      <label for="account">帳號</label>
      <input type="text" id="account" v-model="user.account" />
    </div>
    <div class="input-wrapper">
      <label for="name">名稱</label>
      <input type="text" id="name" v-model="user.name" />
    </div>
    <div class="input-wrapper">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" />
    </div>
    <div class="input-wrapper">
      <label for="password">密碼</label>
      <input type="password" id="password" v-model="user.password" />
    </div>
    <div class="input-wrapper">
      <label for="confirmPasswprd">密碼確認</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />
    </div>
    <button
      class="btn-orange cursor-pointer"
      @click.stop.prevent="createNewUser"
    >
      註冊
    </button>
    <router-link to="/signin" class="link cursor-pointer">取消</router-link>
  </div>
</template>

<script lang="ts">
import { usersAPI } from "@/apis/user";
import { defineComponent, reactive, ref } from "vue";
import { swalAlert } from "@/utils/helper";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const user = reactive({
      account: "",
      name: "",
      email: "",
      password: "",
    });
    const confirmPassword = ref("");
    const router = useRouter();

    async function createNewUser() {
      try {
        if (!user.account.trim()) {
          swalAlert.errorMsg("Please enter your account.");
          return;
        }
        if (!user.name.trim()) {
          swalAlert.errorMsg("Please enter your name.");
          return;
        }
        if (!user.email.trim()) {
          swalAlert.errorMsg("Please enter your email.");
          return;
        }
        if (!user.password.trim()) {
          swalAlert.errorMsg("Please enter your password.");
          return;
        }
        if (user.password !== confirmPassword.value) {
          swalAlert.errorMsg("Password and comfirmation don't match");
          return;
        }
        const { data } = await usersAPI.signUp({ ...user });
        if (data.status === "error") {
          return swalAlert.errorMsg(data.message);
        }
        router.push("/signin");
        swalAlert.successMsg(data.message);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      user,
      confirmPassword,
      createNewUser,
    };
  },
});
</script>
