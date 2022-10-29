<template>
  <div class="page-container" style="justify-content: end">
    <SideBar @changeList="changeList" />
    <div class="main-container" style="width: 74%">
      <div class="main-header">
        <span v-if="listStatus === 'tweet'">推文清單</span>
        <span v-else>使用者清單</span>
      </div>
      <AdminTweetList v-if="listStatus === 'tweet'" />
      <AdminUserList v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SideBar from "@/components/SideBar.vue";
import AdminTweetList from "@/components/AdminTweetList.vue";
import AdminUserList from "@/components/AdminUserList.vue";

export default defineComponent({
  setup() {
    const listStatus = ref("tweet");

    function changeList(status: string) {
      listStatus.value = status;
    }

    return {
      listStatus,
      changeList,
    };
  },
  components: {
    SideBar,
    AdminTweetList,
    AdminUserList,
  },
});
</script>

<style lang="scss" scoped>
.page-container {
  .main-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
