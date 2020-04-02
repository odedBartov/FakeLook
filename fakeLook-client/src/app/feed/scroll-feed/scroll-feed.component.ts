import { Component, OnInit, OnDestroy, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { postToShow } from '../models/postToShow';
import { FilterModel } from '../filters/filter/models/filterModel';
import { NavigatorService } from 'src/app/shared/navigator.service';
@Component({
  selector: 'app-scroll-feed',
  templateUrl: './scroll-feed.component.html',
  styleUrls: ['./scroll-feed.component.css']
})
export class ScrollFeedComponent implements OnInit, OnDestroy {
  posts: postToShow[] = []
  postsSubscription;
  filter: FilterModel

  constructor(private postService: PostsService, private routeService: NavigatorService) {
  }

  ngOnInit() {
    this.postsSubscription = this.postService.getPostsList().subscribe((res: postToShow[]) => {
      console.log(res)
      res.map(p => this.posts.push(p))
    })
    this.filter = new FilterModel()
    this.filter.from = 0
    this.postService.UpdatePosts(this.filter)
  }

  showDetails(postId) {
    this.routeService.navigateToInfoWindow(postId);
  }

  loadMore() {
    this.filter.from += 2
    this.postService.UpdatePosts(this.filter)
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
  navToFeed() {
    this.routeService.navigateToFeed();
  }



}
