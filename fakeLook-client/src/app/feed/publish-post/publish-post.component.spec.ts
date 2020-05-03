import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostComponent } from './publish-post.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { NavigatorService } from 'src/app/shared/navigator.service';
import { SocketIoModule, Socket } from 'ngx-socket-io';
describe('PublishPostComponent', () => {
    let component: PublishPostComponent;
    let fixture: ComponentFixture<PublishPostComponent>;
    let postService: PostsService
    let navigatorService: NavigatorService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule,SocketIoModule.forRoot({url: ''})],
            declarations: [PublishPostComponent],
            providers: [PostsService, NavigatorService]
        })
        fixture = TestBed.createComponent(PublishPostComponent);
        component = fixture.componentInstance;
        postService = TestBed.get(PostsService)
        navigatorService = TestBed.get(NavigatorService)
    }));
});
