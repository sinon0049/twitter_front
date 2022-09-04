import { api } from "@/utils/helper";

export const tweetsAPI = {
    getAllTweets: function() {
        return api.get('/tweet')
    }
}