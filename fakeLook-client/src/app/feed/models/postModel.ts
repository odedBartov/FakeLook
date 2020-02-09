import { CommentModel } from "./commentModel"

export class PostModel{
    imageSrc: string;
    publisherName: string;
    publishDate: Date;
    taggedUsers: string[];
    imageTags: string[];
    text: string;
    comments: CommentModel[];
    latitude: number;
    longitude: number;
}