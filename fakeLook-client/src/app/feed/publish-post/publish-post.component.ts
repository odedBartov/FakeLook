import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { NavigatorService } from '../../shared/navigator.service'
import { postToUpload } from '../models/postToUpload';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {
  uploadedImage;
  date = new Date();
  dateString = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`
  post: postToUpload = new postToUpload();
  
  constructor(private postService: PostsService, private navigationService: NavigatorService) { 
  }

  ngOnInit() {
    this.post.image_tags = "cat,fur";
    this.post.text = "this is some text";
    this.post.user_tags = "oded,mushki"
  }

  fileUploaded(event){
    this.uploadedImage = event.target.files[0];
  }

  upload(){      
    this.postService.publishPost(this.post, this.uploadedImage).subscribe(
      res => { 
        alert('Your post uploaded successfuly!');      
        this.goBackToFeed();
     },
    err => {
      alert('An error occured:\n\n' + err.error.message)
    })
  }

  goBackToFeed(){
    this.navigationService.navigateToFeed();
  }
}
