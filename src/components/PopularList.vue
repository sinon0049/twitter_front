<template>
    <div class="popular-container">
        <div class="popular-head">
            <span>Popular</span>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">
                <span class="name">ABC</span>
                <span class="account">@ABC</span>
            </div>
            <button class="btn-orange">正在跟隨</button>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">
                <span class="name">ABC</span>
                <span class="account">@ABC</span>
            </div>
            <button class="btn-white">跟隨</button>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">

            </div>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">

            </div>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">

            </div>
        </div>
        <div class="popular-card">
            <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="">
            <div class="user-name">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popular-container {
    margin: {
        left: 30px;
        top: 15px;
    }
    width: 350px;
    height: fit-content;
    border-radius: 14px;
    background-color: #f5f8fa;
    .popular-head {
        height: 45px;
        span {
            line-height: 45px;
            margin-left: 15px;
            font: {
                weight: bold;
                size: 18px;
            }
        }
    }
    .popular-card {
        border-top: 1px solid #dddddd;
        height: 70px;
        display: flex;
        align-items: center;
        position: relative;
        img {
            width: 50px;
            height: 50px;
            margin-left: 15px;
        }
        .user-name {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            .account {
                color: #657786;
            }
        }
        button {
            height: 35px;
            position: absolute;
            margin: {
                top: auto;
                bottom: auto;
            }
            right: 15px;
        }
        .btn-orange {
            width: 90px;
            height: 35px;
            border-radius: 100px;
        }
        .btn-white {
            width: 70px;
            height: 35px;
            border-radius: 20px;
        }
    }
}
</style>