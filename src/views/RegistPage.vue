<template>
    <div class="container">
        <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
        <h3>建立你的帳號</h3>
        <div class="input">
            <label for="account">帳號</label>
            <input type="text" id="account">
        </div>
        <div class="input">
            <label for="name">名稱</label>
            <input type="text" id="name">
        </div>
        <div class="input">
            <label for="email">Email</label>
            <input type="email" id="email">
        </div>
        <div class="input">
            <label for="password">密碼</label>
            <input type="password" id="password">
        </div>
        <div class="input">
            <label for="confirmPasswprd">密碼確認</label>
            <input type="password" id="confirmPassword">
        </div>
        <button id="register" class="btn-orange">註冊</button>
        <router-link to="/login" class="link">取消</router-link>
    </div> 
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    margin: 0 auto;
    width: 400px;
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
    #register {
        margin: 30px 0 15px 0;
        border: 0;
        width: 400px;
        border-radius: 20px;
        height: 40px;
    }
}
</style>