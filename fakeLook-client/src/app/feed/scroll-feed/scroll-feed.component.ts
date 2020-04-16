import { Component, OnInit, OnDestroy, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { postToShow } from '../models/postToShow';
import { FilterModel } from '../filters/filter/models/filterModel';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-scroll-feed',
  templateUrl: './scroll-feed.component.html',
  styleUrls: ['./scroll-feed.component.css']
})
export class ScrollFeedComponent implements OnInit, OnDestroy {
  posts: postToShow[] = []
  postsSubscription;
  filter: FilterModel
  amountOfPosts: number

  constructor(private postService: PostsService,
    private routeService: NavigatorService,
    private socket: Socket) {
  }

  ngOnInit() {
    this.postService.getAmountOfPosts().subscribe((data: any) => {
      this.amountOfPosts = data.amount
    })
    this.postsSubscription = this.postService.getPostsList().subscribe((res: postToShow[]) => {
      console.log(res)
      res.map(p => this.posts.push(p))
    })
    this.filter = new FilterModel()
    this.filter.from = 0
    if (this.amountOfPosts != 0)
      this.loadMore()
    this.socket.on('newPostData', (post) => {
      this.posts.push(post)
    })

  }

  showDetails(postId) {
    this.routeService.navigateToInfoWindow(postId);
  }

  loadMore() {
    this.postService.UpdatePosts(this.filter)
    this.filter.from += 10
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
  navToFeed() {
    this.routeService.navigateToFeed();
  }



}
