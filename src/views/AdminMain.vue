<template>
  <div class="page-container" style="justify-content: end">
    <SideBar @changeList="changeList" />
    <main>
      <header>
        <span v-if="listStatus === 'tweet'">推文清單</span>
        <span v-else>使用者清單</span>
      </header>
      <AdminTweetList v-if="listStatus === 'tweet'" />
      <AdminUserList v-else />
    </main>
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
@media screen and (max-width: 768px) {
  main {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  main {
    width: 75%;
  }
}
</style>
