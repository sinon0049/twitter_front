<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <span>首頁</span>
            </div>
            <div id="tweet-input">
                <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
                <textarea name="newTweet" cols="30" rows="10" placeholder="有什麼新鮮事?" maxlength="140"></textarea>
                <button class="btn-orange cursor-pointer">推文</button>
            </div>
            <div class="reply-container">
                <div class="reply-card" v-for="item in tweetList">
                    <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="" class="cursor-pointer">
                    <div class="reply-content">
                        <div class="name cursor-pointer">
                            <span>{{item.User.name}}</span>
                            <span class="light">@{{item.User.account}}</span>
                        </div>
                        <div class="content">
                            <router-link :to="{ name: 'reply-list', params: { id: item.id }}">
                                {{item.description}}
                            </router-link>  
                        </div>
                        <div class="icon">
                            <div @click.stop.prevent="toggleModal" class="cursor-pointer">
                                <font-awesome-icon :icon="['far', 'comment']" class="fa-icon" style="color: #657786;" />
                                <span>{{item.Replies.length}}</span>
                            </div>
                            <div>
                                <font-awesome-icon :icon="['far', 'heart']" class="fa-icon cursor-pointer" style="color: #657786;" />
                                <span>{{item.Likes.length}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <PopularList />
        <div class="modal" :class="{close: !isModalOpen}">
            <div class="modal-header">
                <font-awesome-icon class="icon" icon="x" size="lg"  @click.stop.prevent="toggleModal"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    #tweet-input {
        position: relative;
        border-bottom: 10px solid #e6ecf0;
        display: flex;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: {
                top: 10px;
                left: 15px;
            };
        }
        textarea {
            width: 80%;
            border: 0;
            outline: 0;
            height: 60%;
            margin: {
                top: 2%;
                left: 3%;
            };
            overflow: visible;
            resize: none;
        }
        button {
            width: 66px;
            height: 38px;
            border-radius: 20px;
            border: none;
            position: absolute;
            bottom: 6px;
            right: 5%;
        }
    }
}
.modal {
    width: 40%;
    background-color: white;
    position: absolute;
    border: 1px solid black;
    height: 60%;
    left: 30%;
    top: 15%;
    border-radius: 10px;
    transition: transform 0.3s ease-in 0.3s;
    transform-origin: top;
    .modal-header {
        width: 100%;
        height: 15%;
        border: {
            bottom: 1px solid #e6ecf0;
        }
        display: flex;
        align-items: center;
        .icon {
            color: #ff6600;
            margin: {
                left: 3%;
            }
        }
    }
}

.close {
    transform: scale(1, 0);
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import SideBar from "../components/SideBar.vue"
import PopularList from "../components/PopularList.vue"
import { tweetsAPI } from '@/apis/tweet'
import type { tweet } from 'env'

export default defineComponent({
    setup() {
        const tweetList: tweet[] = reactive([])
        const isModalOpen = ref(false)

        const toggleModal = function () {
            try {
                isModalOpen.value = !isModalOpen.value
                console.log('toggle')
            } catch (error) {
                console.log(error)
            }
        }
        onMounted( async () => {
            try {
                const { data } = await tweetsAPI.getAllTweets()
                data.forEach(function(item: tweet) {
                    tweetList.push(item)
                })
            } catch (error) {
                console.log(error)
            }
        })
        return {
            tweetList,
            isModalOpen,
            toggleModal
        }
    },
    components: {
        SideBar,
        PopularList,
    }
})
</script>

