<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <span>首頁</span>
            </div>
            <div class="tweet-card" id="tweet-input">
                <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
                <textarea name="newTweet" cols="30" rows="10" placeholder="有什麼新鮮事?" maxlength="140"></textarea>
                <button class="btn-orange">推文</button>
            </div>
            <div class="tweet-container">
                <div class="tweet-card">
                    <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
                    <div class="tweet-content">
                        <div class="name">
                            <span>ABC</span>
                            <span class="account">@ABC</span>
                        </div>
                        <div class="content">asdakdonewfiun kodnwoidnewoidwem kaslcmsdinweiodnweoim kasldmsalkdmqwlkdmwqkldmqwdlkqwmdlzd cxmnvgjtrkgbtrnjcknekcrencok</div>
                        <div class="icon">
                            <div>
                                <font-awesome-icon :icon="['far', 'comment']" style="color: #657786;"/>
                                <span>10</span>
                            </div>
                            <div>
                                <font-awesome-icon :icon="['far', 'heart']" style="color: #657786;" />
                                <span>20</span>
                            </div>
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
    display: flex;
    flex-direction: column;
    #tweet-input {
        position: relative;
        border-bottom: 10px solid #e6ecf0;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 10px auto auto 15px;
        }
        textarea {
            width: 75%;
            border: 0;
            height: 70%;
            margin: auto 0 auto 0;
            overflow: visible;
            resize: none;
        }
        button {
            width: 66px;
            height: 38px;
            border-radius: 20px;
            border: none;
            position: absolute;
            bottom: 10px;
            right: 15px;
        }
    }
    .tweet-container {
        overflow-y: auto;
        flex: 1;
    }
    .tweet-card {
        display: grid;
        grid-template-columns: 80px 1fr;
        height: fit-content;
        border-bottom: 1px solid #dddddd;
        img {
            width: 50px;
            height: 50px;
            margin: {
                left: 15px;
                top: 10px;
            }
        }
        .tweet-content {
            margin: {
                top: 10px;
                bottom: 10px;
            }
            .name {
                margin-bottom: 5px;
                span {
                    display: inline-block;
                    margin-right: 5px;
                }
                .account {
                    color: #657786;
                }
            }
            .content {
                margin-bottom: 10px;
            }
            .icon {
                display: flex;
                div {
                    width: 40px;
                    display: flex;
                    justify-content: space-between;
                    margin-right: 50px;
                    span {
                        color: #657786;
                    }
                }
            }
        }
    }
}
</style>

<script lang="ts">
import SideBar from "../components/SideBar.vue"
import PopularList from "../components/PopularList.vue"

export default {
    components: {
        SideBar,
        PopularList,
    }
}
</script>