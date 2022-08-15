<template>
    <div class="container">
        <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
        <h3>登入Alphitter</h3>
        <div class="input">
            <label for="account">帳號</label>
            <input type="text" id="account">
        </div>
        <div class="input">
            <label for="password">密碼</label>
            <input type="password" id="password">
        </div>
        <button id="login" class="btn-orange">登入</button>
        <div id="options-container">
            <router-link to="/regist" class="link">註冊Alphitter</router-link>
            <span>‧</span>
            <router-link to="/regist" class="link">後台登入</router-link>
        </div>
    </div> 
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    margin: 0 auto;
    width:400px;
    position: relative;
    .input {
        display: flex;
        flex-direction: column;
        background-color: #ebebeb;
        margin-top: 20px;
        label {
            position: relative;
            left: 5px;
            top: 2px;
        }
        input {
            width: 400px;
            line-height: 20px;
            background-color: #ebebeb;
            border: {
                top: 0;
                left: 0;
                right: 0;
            }
        }
    }
    img {
        width: 50px;
        height: 50px;
    }
    button {
        font-weight: bold;
        font-size: 16px;
    }
    #login {
        margin: 30px 0 15px 0;
        border: 0;
        width: 400px;
        border-radius: 20px;
        height: 40px;
    }
    #options-container {
        position: absolute;
        right: 50px;
        bottom: 20px;
        span {
            display: inline-block;
            width: 15px;
            text-align: center;
            color: #1589c9;
            background-color: white;
        }
    }
}
</style>