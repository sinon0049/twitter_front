<template>
  <div class="tweet-container">
    <div
      class="tweet-card"
      v-for="item in followshipList.Followers"
      :key="item.id"
    >
      <img :src="item.avatar" alt="" class="cursor-pointer avatar" />
      <div class="tweet-content">
        <div class="name cursor-pointer">
          <span class="bold">{{ item.name }}</span>
          <span class="light">@{{ item.account }}</span>
        </div>
        <div class="content">
          <span>{{ item.introduction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCurrentUser } from "../stores/currentUser";
import dayjs from "dayjs";

export default defineComponent({
  props: ["followshipList"],
  setup() {
    const currentUser = useCurrentUser();
    const isExactUser = ref(false);
    const route = useRoute();
    onMounted(() => {
      if (Number(route.params.id) === currentUser.info.id)
        isExactUser.value = true;
    });
    //get time from now
    function dateFromNow(date: Date) {
      return dayjs().to(date);
    }
    return {
      dateFromNow,
      isExactUser,
    };
  },
});
</script>
