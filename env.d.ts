/// <reference types="vite/client" />

export interface userInfo {
    id: number,
    name: string,
    account: string,
    avatar?: string
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