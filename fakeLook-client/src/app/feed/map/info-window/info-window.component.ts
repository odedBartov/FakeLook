import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';

import { PostModel } from '../../models/postModel';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { NavigatorService } from 'src/app/shared/navigator.service';

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
  isShown = false;
  enableLike = true;

  constructor(private postServiec: PostsService,
    private activatedRouter: ActivatedRoute,
    private routerService: NavigatorService) {
  }

  ngOnInit() {
    let postId = this.activatedRouter.snapshot.paramMap.get("postId")
    if (postId) {
      this.postId = postId
      this.isShown = true
    }
    this.postServiec.getPost(this.postId).subscribe((res: any) => {    
      this.currentPost = res;
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
    this.enableLike = false;
    this.postServiec.likePost(this.currentPost.post_id).subscribe((res: boolean) => {
      this.liked = res;
      this.currentPost.likes += this.liked ? 1 : -1;
      this.enableLike = true;   
    }, err => {
      alert(err.error.message)
      this.enableLike = true;
    })
  }

  publishComment() {
    if (!this.text) {
      alert('Fill the comment');
    }
    else {
      var dat = new Date();
      var comment = {
        comment_publish_date: dat.getFullYear() + '/' + ("0" + (dat.getMonth() + 1)).slice(-2) + '/' + ("0" + dat.getDate()).slice(-2),
        comment_text: this.text,
        postId: this.currentPost.post_id
      };      
      this.postServiec.publishComment(comment).subscribe(res => {
        alert('Your comment published successfuly');
        this.text = '';
        console.log(res);

      })
    }
  }

  // buildPostFromServer(post){
  //   if (post.imageTags) {
  //     post.imageTags = JSON.parse(post.imageTags);
  //     post.imageTags = post.imageTags.tags.map(tag => tag.title);
  //   }

  //   if (post.taggedUsers) {
  //     post.taggedUsers = JSON.parse(post.taggedUsers);
  //     post.taggedUsers = post.taggedUsers.tags.map(tag => tag.username);
  //   }

  //   if (post.comments) {
  //     post.comments = JSON.parse(post.comments);
  //     post.comments = post.comments.comments;
  //   }     
  //   return post;
  // }

  navToFeed() {
    this.routerService.navigateToScrollFeed();
  }
}
