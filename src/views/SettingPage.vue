<template>
    <div class="page-container">
        <SideBar />
        <div class="main-container">
            <div class="main-header">
                <span>帳戶設定</span>
            </div>
            <div class="input-container">
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
                <button id="confirm" class="btn-orange">儲存</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SideBar from "../components/SideBar.vue"

export default {
    components: {
        SideBar,
    }
}
</script>

<style lang="scss" scoped>
.page-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    .main-container {
        width: 100%;

        .input-container {
            width: 50%;
            margin-left: 20px;
            margin-top: 40px;
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
                    width: 100%;
                    padding: 0;
                    line-height: 20px;
                    background-color: #ebebeb;
                    border: {
                        top: 0;
                        left: 0;
                        right: 0;
                    }
                }
            }

            #confirm {
                margin: 30px 0 15px 0;
                width: 120px;
                border-radius: 20px;
                height: 40px;
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>