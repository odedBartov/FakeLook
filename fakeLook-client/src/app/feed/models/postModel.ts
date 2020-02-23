import { CommentModel } from './commentModel';

export class PostModel{
    postId: string;
    imageSrc: string;
    publishDate: Date;
    taggedUsers: string;
    imageTags: string;
    text: string;
    latitude: number;
    longitude: number;
    likes: number;
    comments: CommentModel;
}