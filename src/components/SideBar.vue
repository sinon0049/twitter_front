<template>
    <div class="sidebar-container">
        <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" alt="...">
        <div class="btn-container">
            <div class="btn-group">
                <font-awesome-icon icon="home" size="xl" class="home" />
                <span>首頁</span>
            </div>
            <div class="btn-group">
                <font-awesome-icon :icon="['far', 'user']" size="xl" class="user " />
                <span>個人資料</span>
            </div>
            <div class="btn-group">
                <font-awesome-icon icon="gear" size="xl" class="gear" />
                <span>設定</span>
            </div>
            <button class="btn-orange" id="tweet">推文</button>
            <div class="btn-group" id="logout">
                <font-awesome-icon icon="arrow-right-from-bracket" size="xl" />
            <span>登出</span>
        </div>
        </div>
    </div>
</template>

<style lang="scss">
.sidebar-container {
    width: 25%;
    max-width: 200px;
    position: relative;
    height: 100%;
    margin: 0 8% 0 10%;

    span {
        font-weight: bold;
    }

    .btn-container {
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .btn-group {
            display: grid;
            grid-template-columns: 45px 1fr;
            height: 25px;
            line-height: 25px;
        }

        #logout {
            position: absolute;
            bottom: 10px;
        }

        #tweet {
            border: 0;
            height: 35px;
            width: 100%;
            border-radius: 17.5px;
        }
    }

    .gear {
        color: #f7670f;
    }

    img {
        margin-top: 10px;
        width: 30px;
        height: 30px;
        margin-bottom: 5vh;
    }
}
</style>