import { CommentModel } from './commentModel';

export class PostModel{
    post_id: string;
    image_url: string;
    post_publish_date: Date;
    user_tags: string;
    image_tags: string;
    text: string;
    location: {lat: number, lon: number}
    likes: number;
    comments: CommentModel[];
}