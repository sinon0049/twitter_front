/// <reference types="vite/client" />

export interface userInfo {
  id: number;
  name: string;
  account: string;
  avatar: string;
  cover: string;
  email?: string;
  introduction?: string;
}

export interface fullUserInfo extends userInfo {
  password: string;
  role: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface userDetail extends userInfo {
  cover: string;
  Followers: Array;
  Followings: Array;
  Likes: Array;
  Replies: Array;
  Tweets: tweet[];
  LikeCount?: number;
}

export interface reply {
  id: number;
  UserId: number;
  TweetId: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  User: userInfo;
}

export interface like {
  id: number;
  userId: number;
  TweetId: number;
  createdAt: Date;
  updatedAt: Date;
  Tweet: tweet;
}

export interface tweet {
  id: number;
  UserId: number;
  description: string;
  User: userInfo;
  Replies: reply[];
  Likes: like[];
  Like?: like;
  isLike?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface request {
  id?: number;
  description?: string;
  TweetId?: number;
  comment?: string;
  account?: string;
  password?: string;
  name?: string;
  email?: string;
}

export interface followship {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  Following: userInfo;
}

export interface followingList {
  Followings: followship[];
  Unfollowings: userInfo[];
}

export interface likeResponse {
  status: string;
  message: string;
  like: like;
}

export interface userUpdateResponse {
  status: string;
  message: string;
  avatar: string;
  cover: string;
  name: string;
  introduction: string;
}
