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
  posts: postToShow[]
  postsSubscription;
  constructor(private postService: PostsService, private routeService: NavigatorService) {

  }

  ngOnInit() {
    this.postsSubscription = this.postService.getPostsList().subscribe((res: postToShow[]) => {
      this.posts = res;
      console.log(this.posts)
    })
    this.postService.UpdatePosts(new FilterModel)
  }

  showDetails(postId) {
    this.routeService.navigateToInfoWindow(postId);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
  navToFeed(){
    this.routeService.navigateToFeed();
  }



}
