<template>
    <div class="modal fade reply-modal" id="replyModal" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <font-awesome-icon icon="x" class="orange" data-bs-dismiss="modal" size="lg" @click.stop.prevent="clearReply"/>
                </div>
                <div class="container">
                    <div class="modal-tweet modal-body">
                        <img :src="currentReplyingTweet.User.avatar" alt="...">
                        <div class="user-info">
                            <div>
                                <span class="bold">{{currentReplyingTweet.User.name}} </span>
                                <span class="light">@{{currentReplyingTweet.User.account}}</span>
                            </div>
                            <div>
                                {{currentReplyingTweet.description}}
                            </div>
                            <div class="reply-target">
                                <span class="light">回覆給</span>
                                <span class="orange">@{{currentReplyingTweet.User.account}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-reply modal-body">
                        <img :src="currentUser.info.avatar" alt="...">
                        <textarea name="" id="modal-reply-area" cols="40" rows="5" placeholder="推你的回覆" v-model="reply"></textarea>
                    </div>
                </div>
                <button type="button" class="btn-orange" @click.stop.prevent="createReply(currentReplyingTweet.id)">回覆</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.reply-modal {
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
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCurrentUser } from '@/stores/currentUser';
import { tweetsAPI } from '@/apis/tweet';

export default defineComponent({
    props: ['currentReplyingTweet'],
    setup() {
        const currentUser = useCurrentUser()
        const reply = ref('')

        function clearReply() {
            reply.value = ''
        }

        async function createReply(id: number) {
            try {
                const TweetId = id
                const comment = reply.value
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

        return {
            reply,
            currentUser,
            clearReply,
            createReply
        }
    },
})
</script>