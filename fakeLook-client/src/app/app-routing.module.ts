import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { FeedComponent } from "./feed/feed.component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { PublishPostComponent } from "./feed/publish-post/publish-post.component"
import { FriendsComponent } from './friends/friends/friends.component';
import { ScrollFeedComponent } from './feed/scroll-feed/scroll-feed.component';
import { InfoWindowComponent } from './feed/map/info-window/info-window.component';

const routes:  Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'feed', component: FeedComponent},
    { path: 'publishPost', component: PublishPostComponent },
    { path: 'friends', component: FriendsComponent },
    { path: 'scrollFeed', component: ScrollFeedComponent },
    { path: 'infoWindow/:postId', component: InfoWindowComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}