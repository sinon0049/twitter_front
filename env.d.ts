/// <reference types="vite/client" />

export interface userInfo {
    id: number,
    name: string,
    account: string,
    avatar?: string,
    email?: string,
    introduction?: string,
}

export interface fullUserInfo extends userInfo {
    password: string,
    role: string,
    token: string,
    createdAt: Date,
    updatedAt: Date
}

export interface reply {
    id: number,
    UserId: number,
    TweetId: number,
    comment: string,
    createdAt: Date,
    updatedAt: Date,
    User: userInfo
}

export interface tweet {
    id: number,
    UserId: number,
    description: string,
    User: userInfo,
    Replies: reply[],
    Likes: []
}