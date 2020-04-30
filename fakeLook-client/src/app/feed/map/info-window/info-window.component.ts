import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { Socket } from 'ngx-socket-io';

import { PostModel } from '../../models/postModel';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { CommentModel } from '../../models/commentModel';
import { environment } from 'src/environments/environment.prod';

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
export class InfoWindowComponent implements OnInit, OnDestroy {

  @Input() postId: string;
  currentPost: PostModel = new PostModel
  text: string;
  liked = false;
  isShown = false;
  enableLike = true;

  constructor(private postServiec: PostsService,
    private activatedRouter: ActivatedRoute,
    private routerService: NavigatorService,
    private socket: Socket) {
  }

  ngOnInit() {
    let postId = this.activatedRouter.snapshot.paramMap.get("postId")
    if (postId) {
      this.postId = postId
      this.isShown = true
    }
    this.postServiec.getPost(this.postId).subscribe((res: any) => {
      this.currentPost = res;
      debugger;
    },
      err => {
        alert("can't get post\n\n" + err.error.message);
      })

    this.postServiec.checkIfLikedPost(this.postId).subscribe((res: boolean) => {
      this.liked = res
    }, err => {
      alert(err.error.message);
    })

    this.initSocketIO();
  }

  initSocketIO() {
    this.socket.on('like', (data) => {
      this.currentPost.likes += parseInt(data);
    })

    this.socket.on('newCommentPostId' + this.postId, (comment) => {
      this.currentPost.comments.push(comment)
    })
  }

  like() {
    this.enableLike = false;
    this.postServiec.likePost(this.currentPost.post_id).subscribe((res: boolean) => {
      this.liked = res;
      this.currentPost.likes += this.liked ? 1 : -1;
      this.enableLike = true;
      this.socket.emit('like', this.liked ? 1 : -1)
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
      var date = new Date();
      var comment = {
        comment_publish_date: date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2),
        comment_text: this.text,
        postId: this.postId,
        comment_publisher: environment.userName
      };
      this.postServiec.publishComment(comment).subscribe((res: { commentId: string }) => {
        const newComment = new CommentModel;
        newComment.comment_id = res.commentId;
        newComment.comment_publisher = environment.userName;
        newComment.comment_publish_date = date;
        newComment.comment_text = this.text;
        this.currentPost.comments.push(newComment);
        this.socket.emit('newComment', { postId: this.postId, comment: newComment });
        alert('Your comment published successfuly');
        this.text = '';
      }, error => {
        alert(error.error.message)
        }
      )
    }
  }

  navToFeed() {
    this.routerService.navigateToScrollFeed();
  }

  ngOnDestroy() {
  }
}
