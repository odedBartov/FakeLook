import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {
  uploadedImage;
  date = new Date();
  dateString = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`
  taggedFriends = '';
  imageTags = '';

  constructor(private postService: PostsService) { }

  ngOnInit() {
  }

  fileUploaded(event){
    this.uploadedImage = event.target.files[0]
  }

  upload(){
    const formData = new FormData();
    formData.append('file', this.uploadedImage);

    this.postService.publishPost(formData);
  }
}
