<template>
  <div class="page-container" style="justify-content: end">
    <SideBar />
    <div class="main-container" style="width: 74%">
      <div class="main-header">
        <span>帳戶設定</span>
      </div>
      <div class="input-container">
        <div class="input">
          <label for="account">帳號</label>
          <input type="text" id="account" v-model="tempRender.account" />
        </div>
        <div class="input">
          <label for="name">名稱</label>
          <input type="text" id="name" v-model="tempRender.name" />
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="tempRender.email" />
        </div>
        <div class="input">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="tempRender.password" />
        </div>
        <div class="input">
          <label for="confirmPasswprd">密碼確認</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>
        <button
          id="confirm"
          class="btn-orange"
          @click.stop.prevent="updateUser"
        >
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useCurrentUser } from "@/stores/currentUser";
import SideBar from "../components/SideBar.vue";
import { swalAlert } from "@/utils/helper";
import { usersAPI } from "@/apis/user";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const currentUser = useCurrentUser();
    //temporary data in case setting is not stored
    const tempRender = reactive({
      name: currentUser.info.name,
      account: currentUser.info.account,
      email: currentUser.info.email || "",
      password: "",
    });
    const confirmPassword = ref("");
    const router = useRouter();
    //update user
    async function updateUser() {
      try {
        //check if any input is empty
        if (!tempRender.account.trim()) {
          swalAlert.errorMsg("Please enter your account.");
          return;
        }
        if (!tempRender.name.trim()) {
          swalAlert.errorMsg("Please enter your name.");
          return;
        }
        if (!tempRender.email.trim()) {
          swalAlert.errorMsg("Please enter your email.");
          return;
        }
        if (!tempRender.password.trim()) {
          swalAlert.errorMsg("Please enter your password.");
          return;
        }
        if (tempRender.password !== confirmPassword.value) {
          swalAlert.errorMsg("Password and comfirmation don't match");
          return;
        }
        const { data } = await usersAPI.modifySetting(tempRender);
        if(data.status === 'success') {
          router.push("/main");
          swalAlert.successMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      currentUser,
      tempRender,
      confirmPassword,
      updateUser,
    };
  },
  components: {
    SideBar,
  },
});
</script>

<style lang="scss" scoped>
.page-container {
  .main-container {
    .input-container {
      width: 50%;
      margin-left: 20px;
      margin-top: 40px;
      position: relative;
      .input {
        display: flex;
        flex-direction: column;
        background-color: #ebebeb;
        margin-top: 20px;
        label {
          position: relative;
          left: 5px;
          top: 2px;
        }
        input {
          width: 100%;
          padding: 0;
          line-height: 20px;
          background-color: #ebebeb;
          border: {
            top: 0;
            left: 0;
            right: 0;
          }
        }
      }
      #confirm {
        margin: 30px 0 15px 0;
        width: 120px;
        border-radius: 20px;
        height: 40px;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
