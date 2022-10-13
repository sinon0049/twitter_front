<template>
  <div class="container">
    <img
      src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
      alt="..."
    />
    <h4>建立你的帳號</h4>
    <div class="input">
      <label for="account">帳號</label>
      <input type="text" id="account" v-model="user.account" />
    </div>
    <div class="input">
      <label for="name">名稱</label>
      <input type="text" id="name" v-model="user.name" />
    </div>
    <div class="input">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" />
    </div>
    <div class="input">
      <label for="password">密碼</label>
      <input type="password" id="password" v-model="user.password" />
    </div>
    <div class="input">
      <label for="confirmPasswprd">密碼確認</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />
    </div>
    <button
      id="register"
      class="btn-orange cursor-pointer"
      @click.stop.prevent="createNewUser"
    >
      註冊
    </button>
    <router-link to="/login" class="link cursor-pointer">取消</router-link>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  .input {
    display: flex;
    width: 80%;
    flex-direction: column;
    background-color: #ebebeb;
    margin-top: 20px;
    label {
      position: relative;
      left: 5px;
      top: 2px;
    }
    input {
      line-height: 20px;
      background-color: #ebebeb;
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
  #register {
    margin: 30px 0 15px 0;
    width: 80%;
    border-radius: 20px;
    height: 40px;
  }
}
</style>

<script lang="ts">
import { usersAPI } from "@/apis/user";
import { defineComponent, reactive, ref } from "vue";
import { swalAlert } from "@/utils/helper";
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const user = reactive({
      account: "",
      name: "",
      email: "",
      password: "",
    });
    const confirmPassword = ref("");
    const router = useRouter()

    async function createNewUser() {
      try {
        if(!user.account.trim()) {
          swalAlert.errorMsg("Please enter your account.")
          return
        }
        if(!user.name.trim()) {
          swalAlert.errorMsg("Please enter your name.")
          return
        }
        if(!user.email.trim()) {
          swalAlert.errorMsg("Please enter your email.")
          return
        }
        if(!user.password.trim()) {
          swalAlert.errorMsg("Please enter your password.")
          return
        }
        if(user.password !== confirmPassword.value) {
          swalAlert.errorMsg("Password and comfirmation don't match")
          return
        }
        const { data } = await usersAPI.signUp({ ...user });
        if (data.status === "error") swalAlert.errorMsg(data.message);
        router.push("/login")
        swalAlert.successMsg(data.message)
      } catch (error) {
        console.log(error)
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
