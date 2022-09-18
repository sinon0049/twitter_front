<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <span>首頁</span>
            </div>
            <div id="tweet-input">
                <img :src="currentUser.info.avatar" alt="...">
                <textarea name="newTweet" cols="30" rows="5" placeholder="有什麼新鮮事?" maxlength="140" v-model="tweetContent"></textarea>
                <button class="btn-orange cursor-pointer" @click.stop.prevent="createTweet">推文</button>
            </div>
            <div class="reply-container">
                <div class="reply-card" v-for="item in tweetList">
                    <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="" class="cursor-pointer">
                    <div class="reply-content">
                        <div class="name cursor-pointer">
                            <span class="bold">{{item.User.name}}</span>
                            <span class="light">@{{item.User.account}}</span>
                        </div>
                        <div class="content">
                            <router-link :to="{ name: 'reply-list', params: { id: item.id }}">
                                {{item.description}}
                            </router-link>  
                        </div>
                        <div class="icon">
                            <div class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#replyModal" @click.stop.prevent="onReply(item.id)">
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
        <div class="modal fade" id="replyModal" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <font-awesome-icon icon="x" class="orange" data-bs-dismiss="modal" size="lg" @click.stop.prevent="clearReply"/>
                    </div>
                    <div class="container">
                        <div class="modal-tweet modal-body">
                            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
                            <div class="user-info">
                                <div>
                                    <span class="bold">{{currentReplyingTweet.User.name}} </span>
                                    <span class="light">@{{currentReplyingTweet.User.account}}</span>
                                </div>
                                <div>
                                    {{currentReplyingTweet.description}}.
                                </div>
                                <div class="reply-target">
                                    <span class="light">回覆給</span>
                                    <span class="orange">@{{currentReplyingTweet.User.account}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-reply modal-body">
                            <img :src="currentUser.info.avatar" alt="...">
                            <textarea name="" id="modal-reply-area" cols="40" rows="5" placeholder="推你的回覆" v-model="tweetComment"></textarea>
                        </div>
                    </div>
                    <button type="button" class="btn-orange" @click.stop.prevent="createReply(currentReplyingTweet.id)">回覆</button>
                </div>
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
        height: 200px;
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
            border-radius: 5px;
            height: 60%;
            margin: {
                top: 2%;
                left: 3%;
                right: 3%;
            };
        }
        button {
            width: 70px;
            height: 40px;
            border-radius: 20px;
            border: none;
            position: absolute;
            bottom: 5%;
            right: 5%;
        }
    }
}
.modal {
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
    .modal-body {
        display: flex;
        img {
            width: 50px;
            height: 50px;
            margin: {
                right: 3%;
            }
        }
        .user-info {
            .reply-target {
                font-size: 13px;
            }
            div {
                margin-bottom: 4%;
            }
        }
        textarea {
            width: 80%;
            border: 0;
            border-radius: 5px;
            height: 60%;
            margin: {
                top: 2%;
                right: 3%;
            };
        }
    }
        
    button {
        border-radius: 20px;
        width: 70px;
        height: 40px;
        border: none;
        align-self: flex-end;
        position: relative;
        right: 50px;
        bottom: 8px;
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
import { useCurrentUser } from '@/stores/currentUser'
import type { tweet } from 'env'

export default defineComponent({
    setup() {
        const tweetContent = ref('')
        const tweetComment = ref('')
        const tweetList: tweet[] = reactive([])
        const isModalOpen = ref(false)
        const currentUser = useCurrentUser()
        let currentReplyingTweet: tweet = reactive({
            id: -1,
            UserId: -1,
            description: '',
            User: {
                id: -1,
                name: '',
                account: '',
            },
            Replies: [],
            Likes: []
        })

        function onReply(id: number) {
            tweetList.forEach(item => {
                if(item.id === id) {
                    Object.assign(currentReplyingTweet, item)
                } 
            })
        }

        function clearReply() {
            tweetComment.value = ''
        }

        async function createTweet() {
            try {
                const payLoad = { description: tweetContent.value}
                const { data } = await tweetsAPI.createTweet(payLoad) 
            } catch (error) {
                console.log(error)
            }
        }

        async function createReply(id: number) {
            try {
                const TweetId = id
                const comment = tweetComment.value
                const payLoad = {
                    TweetId,
                    comment
                }
                const { data } = await tweetsAPI.createReply(payLoad)
                console.log(data)
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
            tweetContent,
            isModalOpen,
            currentUser,
            currentReplyingTweet,
            tweetComment,
            onReply,
            createTweet,
            createReply,
            clearReply
        }
    },
    components: {
        SideBar,
        PopularList,
    }
})
</script>

