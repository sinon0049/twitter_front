<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <font-awesome-icon icon="arrow-left" class="cursor-pointer" size="lg" @click="goBackToPrevPage"/>
                <span>&nbsp;&nbsp;Apple</span>
            </div>
            <div class="cover-container">
                <img src="https://img.freepik.com/free-photo/view-landmark-asian-sky-reflection_1417-266.jpg?w=1380&t=st=1663766445~exp=1663767045~hmac=4e4b68d88985c031c59a4cd892f07faaa531ca9b091d90cadcfa0a05eb827c6a" alt="..." class="img-cover">
                <img src="https://images.unsplash.com/photo-1663691219171-93494f63b5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=397&q=80" alt="..." class="img-avatar">
                <button class="btn-orange">編輯個人資料</button>
            </div>
            <div class="self-info">
                <span class="info-name">Apple</span>
                <span class="light info-account">@apple</span>
                <span class="info-description">Hi!</span>
                <div>
                    <span>10個</span>
                    <span class="light">追隨中 </span>
                    <span> &nbsp;10個</span>
                    <span class="light">追隨者</span>
                </div>
            </div>
            <div class="self-tweet-menu">
                <span>推文</span>
                <span>推文及回覆</span>
                <span>喜歡的內容</span>
            </div>
            <TweetList :tweetList="tweetList" @onReply="onReply"/>
        </div>
        <PopularList />
        <ReplyModal :currentReplyingTweet="currentReplyingTweet"/>
    </div>
</template>

<style lang="scss" scoped>
.main-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    .cover-container {
        position: relative;
        height: 30vh;
        text-align: right;
        .img-cover {
            width: 100%;
            height: 80%;
            object-fit: cover;
        }
        .img-avatar {
            position: absolute;
            width: 120px;
            height: 120px;
            z-index: 999;
            left: 3%;
            bottom: 0;
            background: black;
            border-radius: 50%;
            border: 2px solid white;
            object-fit: cover;
        }
        button {
            position: relative;
            top: 3%;
            right: 1%;
            height: 35px;
            width: 120px;
            border-radius: 17.5px;
        }
    }
    .self-info {
        display: flex;
        flex-direction: column;
        margin: 0 3% 5% 3%;
        span {
            font-size: 14px;
        }
        .info-name {
            font-size: 20px;
            font-weight: bold;
        }
        .info-account, .info-description {
            display: block;
            margin-bottom: 3px;
        }
    }
    .self-tweet-menu {
        height: 40px;
        display: grid;
        grid-template-columns: 33% 33% 34%;
        text-align: center;
        border-bottom: 1px solid #e6ecf0;
        span {
            //outline: 1px solid orange;
            line-height: 30px;
        }
    }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import SideBar from "../components/SideBar.vue"
import PopularList from "../components/PopularList.vue"
import TweetList from '../components/TweetList.vue'
import ReplyModal from '../components/ReplyModal.vue'
import { tweetsAPI } from '@/apis/tweet'
import { useCurrentUser } from '@/stores/currentUser'
import { useRouter } from 'vue-router'
import type { tweet } from 'env'
import dayjs from 'dayjs'

export default defineComponent({
    setup() {
        const tweetList: tweet[] = reactive([])
        const currentUser = useCurrentUser()
        const router = useRouter()
        enum selfMenu {
            tweet = 'tweet',
            reply = 'reply',
            like = 'like'
        }
        const currentReplyingTweet: tweet = reactive({
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
            Likes: [],
            createdAt: new Date(),
            updatedAt: new Date()
        })

        //get tweet list when mounted
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
        
        //get time from now
        function dateFromNow(date: Date) {
            return dayjs().to(date)
        }

        //back to previous page feature of arrow on main-header
        function goBackToPrevPage() {
            router.go(-1)
        }

        function onReply(id: number) {
            tweetList.forEach(item => {
                if(item.id === id) {
                    Object.assign(currentReplyingTweet, item)
                } 
            })
        }

        // function changeContent() {

        // }

        return {
            tweetList,
            currentUser,
            currentReplyingTweet,
            dateFromNow,
            goBackToPrevPage,
            //changeContent,
            onReply,
            selfMenu
        }
    },
    components: {
        SideBar,
        PopularList,
        TweetList,
        ReplyModal
    },
})
</script>

