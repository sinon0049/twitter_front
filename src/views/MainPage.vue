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

                </div>
                <div class="tweet-card">

                </div>
                <div class="tweet-card">

                </div>
                <div class="tweet-card">

                </div>
                <div class="tweet-card">

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
        border-bottom: 10px solid #dddddd;
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
        grid-template-columns: 2fr 8fr;
        height: 120px;
        border-bottom: 1px solid #dddddd;
    }
}
</style>

<script lang="ts">
import SideBar from "../components/SideBar.vue"

export default {
    components: {
        SideBar,
    }
}
</script>