import { CommentModel } from './commentModel';

export class PostModel{
    post_id: string;
    image_url: string;
    publishDate: Date;
    taggedUsers: string;
    imageTags: string;
    text: string;
    location: {lat: number, lon: number}
    likes: number;
    comments: CommentModel;
}