import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';

import { PostModel } from '../../models/postModel';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-info-window',
  animations: [
    trigger('rotation', [
      state('straight', style({ transform: 'rotate(0)' })),
      state('rotate', style({ transform: 'rotate(180deg)' })),
      transition('rotate => straight', animate('200ms ease-out')),
      transition('straight => rotate', animate('200ms ease-out'))
    ]),
  ],
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  @Input() postId: string;
  currentPost: PostModel;
  text: string;
  liked = false;

  constructor(private postServiec: PostsService) {  
  }
  
  ngOnInit() {
    this.postServiec.getPost(this.postId).subscribe((res: any) => {      
      this.currentPost = this.buildPostFromServer(res);                
    },
      err => {
        alert("can't get post\n\n" + err.error.message);
      })

    this.postServiec.checkIfLikedPost(this.postId).subscribe((res: boolean) => {
      this.liked = res
    }, err => {
      alert(err.error.message);
    })
  }

  like() {
    this.postServiec.likePost(this.currentPost.postId).subscribe((res: boolean) => {
      this.liked = res;
      this.currentPost.likes += this.liked ? 1 : -1;
    }, err => {
      alert(err.error.message)
    })
  }

  publishComment() {
    if (!this.text) {
      alert('Fill the comment');
    }
    else {
      var dat = new Date();
      var comment = {
        date: dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate(),
        text: this.text,
        postId: this.currentPost.postId
      };      
      this.postServiec.publishComment(comment).subscribe(res => {
        alert('Your comment published successfuly');
        this.text = '';
        console.log(res);
        
      })
    }
  }

  buildPostFromServer(post){    
    if (post.imageTags) {
      post.imageTags = JSON.parse(post.imageTags);
      post.imageTags = post.imageTags.tags.map(tag => tag.title);
    }
    
    if (post.taggedUsers) {      
      post.taggedUsers = JSON.parse(post.taggedUsers);
      post.taggedUsers = post.taggedUsers.tags.map(tag => tag.username);
    }

    if (post.comments) {
      post.comments = JSON.parse(post.comments);      
      post.comments = post.comments.comments;
    }    
    return post;
  }
}
