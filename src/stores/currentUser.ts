import { defineStore } from "pinia";
import { reactive } from "vue";
import type { fullUserInfo } from "env";

export const useCurrentUser = defineStore('currentUser', () => {
    const currentUser = reactive({})
    function storeCurrentUser(payLoad: fullUserInfo) {
        Object.assign(currentUser, payLoad)
    }
    function cleanCurrentUser() {
        Object.assign(currentUser, {})
    }
    return {
        currentUser,
        storeCurrentUser,
        cleanCurrentUser
    }
})