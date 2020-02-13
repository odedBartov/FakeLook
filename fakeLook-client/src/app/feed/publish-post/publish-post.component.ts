import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { PostModel } from '../models/postModel';
import { NavigatorService } from '../../services/navigator.service'

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {
  uploadedImage;
  date = new Date();
  dateString = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`
  post: PostModel = new PostModel();

  constructor(private postService: PostsService, private navigationService: NavigatorService) { 
  }

  ngOnInit() {
  }

  fileUploaded(event){
    this.uploadedImage = event.target.files[0];
  }

  upload(){
    this.post.publishDate = this.date;    

    this.postService.publishPost(this.post, this.uploadedImage).subscribe(
      res => { alert('Your post uploaded successfuly!');
      this.goBackToFeed();
     },
    err => {
      // Write to log      
      alert('An error occured:\n\n' + err.error)
    })
  }

  goBackToFeed(){
    this.navigationService.navigateToFeed();
  }
}
