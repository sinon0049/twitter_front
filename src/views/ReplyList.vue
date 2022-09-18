<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <font-awesome-icon icon="arrow-left" size="lg" />
                <span>推文</span>
            </div>
            <div class="tweet-container">
                <div class="tweet-header">
                    <img :src="tweet.User.avatar" alt="">
                    <div id="user">
                        <span>{{tweet.User.name}}</span>
                        <span class="light">@{{tweet.User.account}}</span>
                    </div>
                </div>
                <div class="tweet-content">
                    {{tweet.description}}
                </div>
                <div class="time-stamp light">
                    上午10:05 2022年9月9日
                </div>
                <hr>
                <div id="count-list">
                    <span class>{{tweet.Replies.length}}</span>
                    <span class="light">回覆 </span>
                    <span>{{tweet.Likes.length}}</span>
                    <span class="light">喜歡次數</span>
                </div>
                <hr>
                <div class="icon-container">
                    <font-awesome-icon :icon="['far', 'comment']" class="light icon" style="margin-right: 25%;" />
                    <font-awesome-icon :icon="['far', 'heart']" class="light icon"/>
                </div>
            </div>
            <hr class="break-line">
            <div class="reply-container">
                <div class="reply-card" v-for="item in tweet.Replies">
                    <img :src="item.User.avatar" alt="">
                    <div class="reply-content">
                        <div>
                            <span>{{item.User.name}} </span>
                            <span class="light">@{{item.User.account}}</span>
                        </div>
                        <div>
                            <span class="light">回覆 </span>
                            <span class="orange">@{{tweet.User.account}}</span>
                        </div>
                        <div class="content">
                            {{item.comment}}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <PopularList />
    </div>
</template>

<style lang="scss" scoped>
.main-container {
    width: 40%;
    .break-line {
        width: 100%;
        border: 0;
        height: 1px;
        background-color: #e6ecf0;
    }
    .tweet-container {
        padding: {
            left: 15px;
            right: 15px;
        }
        hr {
            background-color: #e6ecf0;
            opacity: 1;
        }
        .tweet-header {
            display: flex;
            margin: 20px 0;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            #user {
                display: flex;
                flex-direction: column;
                margin: {
                    left: 10px;
                    top: auto;
                    bottom: auto;
                }
            }
        }
        .tweet-content {
            margin: {
                bottom: 2%;
            }
        }

        .time-stamp {
            margin: {
                bottom: 2%;
            }
        }

        hr {
            border: 0;
            height: 1px;
            background-color: #e6ecf0;
        }

        #count-list {
            margin: {
                top: 2%;
                bottom: 2%;
            }
        }

        .icon-container {
            margin: {
                top: 3%;
                bottom: 2%;
            }

            .icon {
                font-size: 20px;
            }
        }
    }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import SideBar from '../components/SideBar.vue'
import PopularList from '../components/PopularList.vue';
import { useRoute } from 'vue-router';
import { tweetsAPI } from '@/apis/tweet';
import type { tweet } from 'env';

export default defineComponent({
    setup() {
        const tweet: tweet = reactive({
            id: -1,
            UserId: -1,
            description: '',
            User: {
                id: -1,
                name: '',
                account: '',
                avatar: ''
            },
            Replies: [],
            Likes: []
        })
        const { id } = useRoute().params
        console.log(Number(id))
        onMounted(async () => {
            const { data } = await tweetsAPI.getTweet({ id: Number(id)})
            Object.assign(tweet, data)
        })

        return {
            tweet,
        }
    },
    components: {
        SideBar,
        PopularList
    }
})
</script>
