import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module"
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { FeedComponent } from './feed/feed.component';
import { MapComponent } from './feed/map/map.component';
import { FiltersComponent } from './feed/filters/filters.component';
import { FriendsComponent } from './friends/friends/friends.component';
import { GroupsComponent } from './friends/groups/groups.component';
import { FilterComponent } from './feed/filters/filter/filter.component';
import { BarComponent } from './feed/filters/bar/bar.component';
import { PublishPostComponent } from './feed/publish-post/publish-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    FeedComponent,
    MapComponent,
    FiltersComponent,
    FriendsComponent,
    GroupsComponent,
    FilterComponent,
    BarComponent,
    PublishPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRU_ENlCIyblA3pyCHqoPoaAJhsaQGv98'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
