/// <reference types="vite/client" />

export interface User {
  id: number;
  name: string;
  account: string;
  avatar: string;
  cover: string;
  email?: string;
  introduction?: string;
}

export interface CurrentUser extends User {
  role: string;
}

export interface UserSocialStatus extends User {
  Followers: Array;
  Followings: Array;
  Tweets: tweet[];
  LikeCount?: number;
}

export interface Reply {
  id: number;
  UserId: number;
  TweetId: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
  Tweet: Tweet;
}

interface NewReply {
  TweetId: number;
  content: string;
}

export interface Like {
  id: number;
  userId: number;
  TweetId: number;
  createdAt: Date;
  updatedAt: Date;
  Tweet: tweet;
}

export interface Tweet {
  id: number;
  UserId: number;
  description: string;
  User: User;
  Replies: reply[];
  Likes: like[];
  Like?: like;
  isLike?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Request {
  id?: number;
  description?: string;
  TweetId?: number;
  comment?: string;
  account?: string;
  password?: string;
  name?: string;
  email?: string;
}

export interface Followship {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  Follower: User;
}

export interface Followings {
  Followings: followship[];
  Unfollowings: User[];
}

export interface ResponseOfAddingLike {
  status: string;
  message: string;
  like: Like;
}

export interface UserUpdateResponse {
  status: string;
  message: string;
  avatar: string;
  cover: string;
  name: string;
  introduction: string;
}
