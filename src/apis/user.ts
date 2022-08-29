import { api } from '../utils/helper'
interface signInData {
    account: string,
    password: string
}

export const usersAPI = {
    signIn: function(payLoad: signInData)  {
        return api.post('/user/signin', payLoad)
    },

    getData: function() {
        return api.get('/tweet/all')
    }
}