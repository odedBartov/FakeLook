import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { FeedComponent } from "./feed/feed.component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { PublishPostComponent } from "./feed/publish-post/publish-post.component"

const routes:  Routes = [
    { path: '', redirectTo: 'feed', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'feed', component: FeedComponent},
    { path: 'publishPost', component: PublishPostComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}