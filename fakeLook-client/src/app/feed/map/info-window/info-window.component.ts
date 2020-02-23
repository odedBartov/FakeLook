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
    this.postServiec.getPost(this.postId).subscribe((res: PostModel) => {
      this.currentPost = res;
      console.log(res);
    },
      error => {
        alert("can't get post\n\n" + error.error);
      })

    this.postServiec.checkIfLikedPost(this.postId).subscribe((res: boolean) => {
      this.liked = res
    }, err => {
      alert(err.error);
    })
  }

  like() {
    this.postServiec.likePost(this.currentPost.postId).subscribe((res: boolean) => {
      this.liked = res;
      this.currentPost.likes += this.liked ? 1 : -1;
    }, err => {
      alert(err.error)
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
      })
    }
  }
}
