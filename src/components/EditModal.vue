<template>
  <div class="modal fade reply-modal" id="editModal" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="form-info" @submit.stop.prevent="handleSubmit">
          <div class="modal-header">
            <font-awesome-icon
              icon="x"
              class="orange"
              data-bs-dismiss="modal"
              size="lg"
              @click.stop.prevent="clearForm"
            />
            <span class="bold" style="display: block; margin: 0 5%"
              >編輯個人資料</span
            >
            <button class="btn-orange" type="submit">儲存</button>
          </div>
          <div class="cover-container">
            <div class="cover">
              <label for="cover">
                <font-awesome-icon icon="camera" class="icon cursor-pointer" />
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  accept=".jpg"
                  @change="handleCoverChange"
                />
              </label>
              <img :src="coverURL" alt="..." class="img-cover" />
            </div>
            <div class="avatar">
              <label for="avatar">
                <font-awesome-icon icon="camera" class="icon cursor-pointer" />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept=".jpg"
                  @change="handleAvatarChange"
                />
              </label>
              <img :src="avatarURL" alt="..." class="img-avatar" />
            </div>
          </div>
          <div class="info-container modal-body">
            <div class="input">
              <label for="name">名稱</label>
              <input type="text" name="name" v-model="name" />
              <span class="counter">0/50</span>
            </div>
            <div class="input" style="margin-bottom: 10%">
              <label for="introduction">自我介紹</label>
              <textarea
                name="introduction"
                rows="6"
                columns="300"
                v-model="introduction"
              ></textarea>
              <span class="counter">0/160</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply-modal {
  .modal-dialog {
    max-width: unset;
    width: 40%;
    .modal-header {
      width: 100%;
      height: 15%;
      border: {
        bottom: 1px solid #e6ecf0;
      }
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        color: #ff6600;
        margin: {
          left: 3%;
        }
      }
      button {
        border-radius: 20px;
        width: 70px;
        height: 40px;
        border: none;
        position: absolute;
        right: 5%;
      }
    }
    .cover-container {
      position: relative;
      height: 30vh;
      text-align: right;
      input[type="file"] {
        display: none;
      }
      .cover {
        width: 100%;
        height: 80%;
        label {
          position: absolute;
          left: 47%;
          bottom: 55%;
          z-index: 103;
          .icon {
            font-size: 1.5rem;
          }
        }
        .img-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
        }
      }
      .avatar {
        position: absolute;
        width: 120px;
        height: 120px;
        z-index: 100;
        left: 3%;
        bottom: 0;
        border-radius: 50%;
        background-color: white;
        .img-avatar {
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 101;
          border-radius: 50%;
          border: 2px solid white;
          object-fit: cover;
          opacity: 0.7;
        }
        label {
          z-index: 102;
          position: absolute;
          left: calc(50% - 12px);
          bottom: calc(50% - 13px);
          .icon {
            font-size: 1.5rem;
          }
        }
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      .input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #ebebeb;
        margin: 20px auto 0 auto;
        width: 90%;
        label {
          position: relative;
          left: 5px;
          top: 2px;
        }
        input,
        textarea {
          line-height: 20px;
          width: 100%;
          background-color: #ebebeb;
          border: {
            top: 0;
            left: 0;
            right: 0;
          }
        }
        .counter {
          display: block;
          width: 100%;
          align-self: flex-end;
          font-size: 15px;
          background-color: white;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCurrentUser } from "@/stores/currentUser";
import { usersAPI } from "@/apis/user";

export default defineComponent({
  props: ["currentReplyingTweet"],
  setup() {
    const currentUser = useCurrentUser();
    const name = ref("");
    const introduction = ref("");
    const avatarURL = ref(currentUser.info.avatar);
    const coverURL = ref(currentUser.info.cover);
    //clear form when modal is closed
    function clearForm() {
      name.value = "";
      introduction.value = "";
    }
    //get avatar preview when avatar input is changed
    function handleAvatarChange(e: Event) {
      const { files } = e.target as HTMLInputElement;
      if (!files) return;
      else {
        const imageURL = window.URL.createObjectURL(files[0]);
        avatarURL.value = imageURL;
      }
    }
    //get cover preview when avatar input is changed
    function handleCoverChange(e: Event) {
      const { files } = e.target as HTMLInputElement;
      if (!files) return;
      else {
        const imageURL = window.URL.createObjectURL(files[0]);
        coverURL.value = imageURL;
      }
    }
    //modify backend db when form is submitted
    async function handleSubmit(e: Event) {
      try {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        await usersAPI.modifyInfo(formData);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      name,
      introduction,
      currentUser,
      avatarURL,
      coverURL,
      clearForm,
      handleAvatarChange,
      handleCoverChange,
      handleSubmit,
    };
  },
});
</script>
