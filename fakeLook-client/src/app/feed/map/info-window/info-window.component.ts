import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, animate, transition,} from '@angular/animations';

import { PostModel } from '../../models/postModel';
import { PostsService } from '../../services/posts.service';
import { LoggerService } from 'src/app/shared/logger.service';

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
  comment: string;
  liked = false;
  
  constructor(private postServiec: PostsService, private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.postServiec.getPost(this.postId).subscribe((res: any) => {
      this.currentPost = res;
    },
    error => {
      console.log(error);
      alert("can't get post\n\n" + error.error);
      this.loggerService.writeToLog(error);
      // Write to log
    })
  }

  like() {
    if (this.liked) {
      this.currentPost.likes--;
      this.liked = false;
    }
    else {
      this.postServiec.likePost(this.postId).subscribe(res => {
        this.currentPost.likes++;
        this.liked = true;
      }, err => {
        console.log(err.error.error);
        //Write to log
      });
    }
  }

  publishComment() {
    if (!this.comment) {
      alert('Fill the comment');
    }
    else {
      alert('Comment published successfuly');
    }
  }
}
